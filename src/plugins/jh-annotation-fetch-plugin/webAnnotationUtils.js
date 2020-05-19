export function getUnprocessedRosaWebAnnotations(canvases, receiveAnnotation) {
  if (!canvases) {
    return;
  }

  // TODO: bad hack to check if canvases are from Homer MS
  if (
    canvases.map((canvas) => canvas.id).some((id) => id.includes('/homer/'))
  ) {
    _getEldarionAnnotations(canvases, receiveAnnotation);
  }

  canvases.forEach((canvas) => {
    const iiifUrl = canvas.id;
    let annoUrl = iiifUrl.replace(/\/iiif\/|\/iiif3\//, '/wa/');

    _fetchAnnotationPage(annoUrl).then((results) => {
      if (!results) {
        // Do nothing if there are no results
        return;
      }

      if (!Array.isArray(results)) {
        // TODO: Here we can select our TEI XML fragments to be processed
        /*
         * As far as TEI XML processing, XSLT is still probably the simplest solution.
         * Once the XML string is parsed into a Document, you should be able to apply an XSL
         * stylesheet to it to transform it into HTML. We should probably then change the
         * annotation's format to 'text/html'?
         *
         * XSLT processing in browser (WARNING: non-standard browser feature, check compatibility tables)
         *    https://developer.mozilla.org/en-US/docs/Web/API/XSLTProcessor
         *
         * TEI Stylesheets
         *    https://github.com/TEIC/Stylesheets
         *    https://github.com/jhellingman/tei2html
         *
         * Otherwise, we can look at using this tool again
         *    https://github.com/TEIC/CETEIcean
         *
         * Or this random tool
         *    https://github.com/TEI-Boilerplate/TEI-Boilerplate
         *
         */
        // if (Array.isArray(results.body) && results.body.some(b => b.format === 'application/xml')) {
        //   const xmlBody = results.body.find(b => b.format === 'application/xml'); // Assumes only 1 body has XML format
        //   const xml = xmlBody.value;
        //   _parseXml(xml);
        // }
        results = [results];
      }

      const annoPage = {
        id: annoUrl,
        type: 'AnnotationPage',
        canvas: iiifUrl,
        items: results,
      };

      // console.log(`%cMoo! iiifUrl: ${iiifUrl}, annoUrl: ${annoUrl}`, 'color:blue;');
      // console.log(annoPage);
      receiveAnnotation(iiifUrl, annoUrl, annoPage);
    });
  });
}

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

    _fetchAnnotationPage(annoUrl).then((results) => {
      // Create AnnotationPage
      const annoPage = {
        id: annoUrl,
        type: 'AnnotationPage',
        items: _process_annotations(results),
      };

      // console.log(`%cMoo! iiifUrl: ${iiifUrl}, annoUrl: ${annoUrl}`, 'color:green;');
      // console.log(annoPage);
      // Provide the annotation page to Mirador
      receiveAnnotation(iiifUrl, annoUrl, annoPage);
    });
  });
}

/**
 * Inteded to be used in development only.
 *
 * @param {array} canvases - array of Canvas objects
 * @param {function} receiveAnnotation - callback function to stuff the fetched annotations into
 */
export function _getEldarionAnnotations(canvases, receiveAnnotation) {
  if (!canvases) {
    return;
  }

  if (!Array.isArray(canvases)) {
    canvases = [canvases];
  }

  canvases.forEach((canvas) => {
    const canvasId = canvas.id;
    // const label = canvas.__jsonld.label;

    // const url = deriveCtsEndpoint(label, 'translation-alignment');
    // if (!url) {
    //   return;
    // }

    // fetch(url, { method: 'GET' })
    //   .then((result) => result.json())
    //   .then((data) => {
    //     // console.log(`%cEldarion annotation collection: ${url}`, 'color: orange;');
    //     // console.log(data);
    //     handleAnnotationCollection(data, canvasId, receiveAnnotation);
    //   })
    //   .catch((error) => {
    //     console.log(
    //       '%cError fetching Homer translation annotations',
    //       'color: red;'
    //     );
    //     console.log(error);
    //   });

    /**
     * New section will try a known URL to reach the trial discovery service in order to
     * get annotation endpoints
     */
    const discoveryUrl = 'https://explorehomer-feature-wa-jm1koi.herokuapp.com/wa/discovery/';
    const target = `${discoveryUrl}?canvas_id=${canvasId}`;

    fetch(target, { method: 'GET' })
      .then(result => result.json())
      .then((data) => {
        console.assert(!!data, `No response was found: ${target}`);
        console.assert(Array.isArray(data.collections), 'data.collections was not found or was not an array')

        if (!Array.isArray(data.collections)) {
          return;
        }
        // Should be an array of collections
        data.collections.forEach((collectionId) => {
          // For now and simplicity, let's only take translation and named entity annotations 
          if (!collectionId.includes('translation')) {
            return;
          }

          // This is nasty...
          fetch(collectionId, { method: 'GET' })
            .then(result => result.json())
            .then(collection => handleAnnotationCollection(collection, canvasId, receiveAnnotation));
        });
      });
  });
}

/**
 * Process an AnnotationCollection so Mirador knows how to handle it.
 * Basically iterate through the collection to retrieve the AnnotationPages and shove them
 * into Mirador's application state
 *
 * @param {object} collection JSON object representing an AnnotationCollection
 * @param {string} parentUri which Canvas does this come from
 * @param {function} receiveAnnotation callback function to stuff the fetched annotations into
 */
async function handleAnnotationCollection(
  collection,
  parentUri,
  receiveAnnotation
) {
  // Do we need to keep any info from the AnnotationCollection itself?
  // const label = collection.label;

  let nextPage = collection.first;
  do {
    // For each annotation page URL, resolve it, send it to the Redux store and return the
    // URL of the next page, or 'undefined' if it does not exist
    nextPage = await _fetchAnnotationPage(nextPage)
      .then((data) => {
        // console.log(`%cEldanrion annotation page: ${data.id}`, 'color: purple;');
        // console.log(data);
        if (data) {
          receiveAnnotation(parentUri, nextPage, data);
          return data.next;
        } else {
          return false;
        }
      })
      .catch(() => {
        nextPage = false;
      });
  } while (nextPage);
}

/**
 *
 * @param {string} url target URL for the annotation page
 * @returns {Promise} with the resulting JSON data pre-parsed
 */
function _fetchAnnotationPage(url) {
  return fetch(url, { method: 'GET' })
    .then((result) => result.json())
    .catch((error) => console.log(`Error getting ${url}: ${error}`));
}

/**
 * Do some processing on what we know to be data formatted as Web Annotation.
 * In some cases, we may need to adjust the annotation target(s) a bit to make
 * Mirador understand.
 *
 * @param {array} annotations list of raw web annotations
 * @returns {array} processed list of annotations
 */
function _process_annotations(annotations) {
  // Sometimes 'annotations' will actually be a single Annotation object
  if (!Array.isArray(annotations)) {
    annotations = [annotations];
  }
  /*
   * Keep only those annotations that have a single body object, or a non-empty array
   * of body objects
   */
  return annotations
    .filter(
      (anno) => anno.body && Array.isArray(anno.body) && anno.body.length > 0
    )
    .map((anno) => {
      let diff = {};

      if (anno.label && anno.label.includes('Georeference')) {
        // Really damn hacky
        Object.assign(diff, {
          motivation: 'commenting',
          body: [_merge_georef_bodies(anno.body)],
          target: _process_georef_targets(anno.target),
        });
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
  const comment = bodies
    .filter((b) => b.purpose === 'commenting')
    .map((b) => b.value)[0];
  const id = bodies
    .filter((b) => b.purpose === 'identifying')
    .map((b) => b.source)[0];
  const tag = bodies
    .filter((b) => b.purpose === 'tagging')
    .map((b) => b.value)[0];

  let value = '<div class="annotation georef">';

  if (id) {
    value += `<a href="${id}">`;
  }
  if (tag) {
    value += tag;
  }
  if (comment) {
    value += ` (${comment})`;
  }
  if (!tag && !comment) {
    value += id;
  }
  if (id) {
    value += '</a>';
  }

  value += '</div>';

  return {
    type: 'TextualBody',
    format: 'text/html',
    value,
    // value: `<div class="annotation georef"><a href="${id}">${tag} (${comment})</a></div>`
  };
}

/**
 * Pick the SpecificResource target that points to our Canvas
 *
 * @param {array} targets array of annotation targets
 * @returns {object} the 'SpecificResource' target pointing to our Canvas
 */
function _process_georef_targets(targets) {
  const canvas = targets.filter(
    (t) => typeof t !== 'string' && t.source.type && t.source.type === 'Canvas'
  );

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

// TODO: Eldarion endpoints must be configurable!
/**
 *
 * @param {object} canvas a canvas JSON data
 * @param {string} endpoint should take value (translation-alignment|named-entities)
 */
export function deriveCtsEndpoint(label, endpoint) {
  if (!label) {
    console.log(
      "%cCan't derive CTS URN from Canvas. Couldn't find a label.",
      'color: red;'
    );
    return;
  }

  // This relies on a canvas label structured like: 'folio 3r'
  // This means that any front matter or misc pages will not work
  if (
    label.includes('cover') ||
    label.includes('matter') ||
    label.includes('misc')
  ) {
    console.log(
      `%cRefused to try to derive CTS URN for canvas: ${label}`,
      'color: red;'
    );
    return;
  }

  const truncatedLabel = label.slice(label.lastIndexOf(' ') + 1);

  switch (endpoint) {
    case 'translation-alignment':
      return `https://aniop-atlas-staging.eldarion.com/wa/urn:cite2:hmt:msA.v1:${truncatedLabel}/translation-alignment/collection/`;
    case 'named-entities':
      return `https://explorehomer-feature-na-4qbljt.herokuapp.com/wa/urn:cite2:hmt:msA.v1:${truncatedLabel}/named-entities/collection/compound/`;
    default:
      return;
  }
}
