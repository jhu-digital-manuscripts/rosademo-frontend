/**
 * Loops through all given canvases, constructs and calls a new URL that points
 * to our Web Annotation endpoint. If there are no annotations for a given canvas,
 * we display a message saying so.
 * 
 * @param {array} canvases - array of Canvas objects
 * @param {function} receiveAnnotation - callback function to stuff the fetched annotations into
 */
export function getRosaWebAnnotations(canvases, receiveAnnotation) {
  if (!canvases) {
    return;
  }

  canvases.forEach((canvas) => {
    const iiifUrl = canvas.id;
    let annoUrl = iiifUrl.replace(/\/iiif\/|\/iiif3\//, '/wa/');

    fetch(annoUrl, { method: 'GET' })
      .then(res => res.json())
      .then((results) => {
        // Create AnnotationPage
        const annoPage = {
          id: annoUrl,
          type: 'AnnotationPage',
          items: _process_annotations(results)
        };

        console.log(`%cMoo! iiifUrl: ${iiifUrl}, annoUrl: ${annoUrl}`, 'color:green;');
        console.log(annoPage);
        // Provide the annotation page to Mirador
        receiveAnnotation(iiifUrl, annoUrl, annoPage);
      })
      .catch(error => console.log(error));
  });
}

function _process_annotations(annotations) {
  // Sometimes 'annotations' will actually be a single Annotation object
  if (!Array.isArray(annotations)) {
    annotations = [ annotations ];
  }
  /*
   * Keep only those annotations that have a single body object, or a non-empty array
   * of body objects 
   */
  return annotations
    .filter(anno => anno.body && (Array.isArray(anno.body) && anno.body.length > 0))
    .map((anno) => {
      let diff = {};
      
      if (anno.label && anno.label.includes('Georeference')) { // Really damn hacky
        Object.assign(diff, {
          motivation: 'commenting',
          body: [ _merge_georef_bodies(anno.body) ],
          target: _process_georef_targets(anno.target)
        })
      }

      return Object.assign({}, anno, diff);
    });
}

/**
 * We need to merge the multi-part bodies of our georeference annotations into one
 * to allow Mirador to do something. We should be fine creating an HTML string to
 * be displayed
 * 
 * @param {array} bodies array of annotation bodies
 * @returns {object} merged 'body' object
 */
function _merge_georef_bodies(bodies) {
  const comment = bodies.filter(b => b.purpose === 'commenting').map(b => b.value)[0];
  const id = bodies.filter(b => b.purpose === 'identifying').map(b => b.source)[0];
  const tag = bodies.filter(b => b.purpose === 'tagging').map(b => b.value)[0];

  return {
    type: 'TextualBody',
    format: 'text/html',
    value: `<div class="annotation georef"><a href="${id}">${tag} (${comment})</a></div>`
  };
}

/**
 * Pick the SpecificResource target that points to our Canvas
 * 
 * @param {array} targets array of annotation targets
 * @returns {object} the 'SpecificResource' target pointing to our Canvas
 */
function _process_georef_targets(targets) {
  const canvas = targets
    .filter(t => typeof t !== 'string' && t.source.type && t.source.type === 'Canvas');

  // Pick first or only canvas
  if (!canvas || !canvas.length) {
    return;
  }

  // TODO: this will have to change once the Canvas IDs are fixed ---------------------------------
  let target = canvas[0];
  const origId = target.source.id;

  // Bad hack to check whether this ID ends with a '/<index_number>'
  if (origId.match(/\/\d+$/)) {
    target.source.id = origId.slice(0, origId.lastIndexOf('/'));
  }
  // -----------------------------------------------------------------------------------------------

  return target;
}
