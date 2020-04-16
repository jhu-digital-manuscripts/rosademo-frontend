import flatten from 'lodash/flatten';

/**
 * This is mostly a trial for a custom selector to get a feel for how they work and interact with this plugin.
 * This particular function will return all AnnotationPages for the currently visible canvases.
 * 
 * @param {object} state Mirador's application state
 * @param {array} canvases array of Canvas JSON objs
 * 
 */
export function getAnnotationsForVisibleCanvases(state, canvases) {
  const { annotations } = state;
  // Fail fast if no canvases were provided
  if (!canvases || !(Array.isArray(canvases) && canvases.length > 0)) {
    return [];
  }
  // Fail fast if no annotations are found in the application state
  if (!annotations) {
    return [];
  }

  /*
   * This part takes a bit more explanation (for me, at least)
   * 'annotations' is essentially a map of Canvas IDs to ... another map. The 2nd map indexes annotation page
   * IDs to AnnotationPage objects. Here is a simplified example to illustrate:
   * 
   *  annotations: {
   *    'canvas-1': {
   *      'annoPage1': { id: 'annoPage1', json: { ... } },
   *      'annoPage2': { id: 'annoPage2', json: { ... } }
   *    },
   *    'canvas-2': {
   *      'annoPage3': { id: 'annoPage3', json: { ... } }
   *    }
   *  }
   * 
   * So this part will resolve the first level map (the 'canvas-1' level objects above) with the given canvas IDs from 
   * the 'canvases' param (Object.values). The canvas objects in the 'canvases' param are mapped to the resolved first 
   * level map. So now you have an array of the values of the first level map. This is finally flattened to give a 
   * single tier array of the "annotation page" objects.
   */
  const annoPages = flatten(
    canvases.map(canvas => Object.values(annotations[canvas.id]))
  );

  /*
   * Not quite done pre-processing. For OUR Canvases, for some reason, there is a IIIF 2 AnnotationList already attached.
   * Have this selector strip those out, as they are useless and contain no annotations, leaving us with only the
   * Web Annotation compliant AnnotationPage.
   */
  // return annoPages.filter(page => page.json && !page.json.resources && page.json.items);
  return annoPages;
}

/**
 * 
 * @param {object} state application state
 * @param {array} canvases list of Canvas objects that are currently selected in a window
 * @param {array} presentAnnotations list of annotation pages currently present on the canvases
 * @returns {object} {
 *    "annotationPageId": "canvas-label"
 *  }
 */
export function mapAnnotationPageToCanvasLabel(state, canvases, presentAnnotations) {
  return {};
  const { annotations } = state;

  if (!canvases || !(Array.isArray(canvases) && canvases.length > 0)) {
    return {};
  }

  let result = {};
  
  const currentCanvasIds = canvases.map(canvas => canvas.id);
  // TODO: good lord the structure of the application state is confusing as hell

  presentAnnotations.forEach((annoPage) => {
    let match;
    if (annoPage.json.canvas) {
      match = annoPage.json.canvas;
    } else {
      match = Object.keys(annotations)
        .filter(canvasId => Object.keys(annotations[canvasId]).includes(annoPage.id)) // Get canvasIds where there is a matching annotationId
        .find(canvasId => currentCanvasIds.includes(canvasId)) // Get the first canvasId that is also present in the 'canvases' parameter
    }
    
    // TODO: Canvas.getLabel() is a function, but it returns an I18N label (which is actually a good thing)
    // BUT to simplify things, for now I will directly get the label as a string
    const matchingCanvas = canvases.find(canvas => canvas.id === match);
    // debugger
    if (matchingCanvas && matchingCanvas.__jsonld) {
      Object.assign(result, {
        [annoPage.id]: matchingCanvas.__jsonld.label
      })
    }
  });

  return result;
}