import {
  fetchAnnotationCollection,
  fetchAnnotationPage,
  jsonify
} from './webAnnotationUtils';

/**
 * Inteded to be used in development only.
 *
 * @param {array} canvases - array of Canvas objects
 * @param {function} receiveAnnotation - callback function to stuff the fetched annotations into
 */
export function getEldarionAnnotations(canvases, receiveAnnotation) {
  if (!canvases) {
    return;
  }

  if (!Array.isArray(canvases)) {
    canvases = [canvases];
  }

  canvases.forEach((canvas) => {
    const canvasId = canvas.id;

    /**
     * New section will try a known URL to reach the trial discovery service in order to
     * get annotation endpoints
     */
    const discoveryUrl = 'https://aniop-atlas-staging.eldarion.com/wa/discovery/';
    const target = `${discoveryUrl}?canvas_id=${canvasId}`;

    fetch(target, { method: 'GET' })
      .then(result => jsonify(result))
      .then((data) => {
        console.assert(!!data, `No response was found: ${target}`);
        console.assert(Array.isArray(data.collections), 'data.collections was not found or was not an array')

        if (!Array.isArray(data.collections)) {
          return;
        }
        // Should be an array of collections
        data.collections.forEach((collectionId) => {
          // For now and simplicity, let's only take translation and named entity annotations 
          if (!collectionId.includes('translation') && !collectionId.includes('named-entities')) {
            return;
          }

          fetchAnnotationCollection(collectionId)
            .then(collection => handleAnnotationCollection(collection, canvasId, receiveAnnotation));
        });
      })
      .catch(error => console.log(`${target} : ${error}`));
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
async function handleAnnotationCollection(collection, parentUri, receiveAnnotation) {
  // Do we need to keep any info from the AnnotationCollection itself?
  // const label = collection.label;
  // console.log(`%cCollection: ${collection.label}`, 'color:green;');
  // console.log(collection);
  let nextPage = collection.first;
  do {
    // For each annotation page URL, resolve it, send it to the Redux store and return the
    // URL of the next page, or 'undefined' if it does not exist
    nextPage = await fetchAnnotationPage(nextPage)
      .then((data) => {
        console.log(`%cEldanrion annotation page: ${data.id}`, 'color: purple;');
        console.log(data);
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
