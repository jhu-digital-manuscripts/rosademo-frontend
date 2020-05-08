import ActionTypes from 'mirador/dist/es/src/state/actions/action-types';

/**
 * When an annotation page is received, save it in a central in application state
 * for easy reference
 *
 * New state added: {
 *    'annotationId': {
 *      json: { ... }, // the annotation JSON data
 *      targets: [], // list of processed targets
 *    }
 *  }
 *
 * @param {object} state Mirador application/redux state
 * @param {object} action Mirador action
 */
export const annotationsMapReducer = (state = {}, action) => {
  /**
   * action: {
   *    annotationId: '',
   *    annotationJson: {}, // Actually an AnnotationPage or AnnotationList
   *    targetId: ''
   *  }
   */
  if (action.type === ActionTypes.RECEIVE_ANNOTATION) {
    const { annotationJson } = action;
    const { annotationMap } = state;

    if (!annotationJson) {
      return state;
    }

    let result = handleAnnotationPage(annotationJson, annotationMap);
    result = Object.assign(annotationMap || {}, result);

    return {
      ...state,
      annotationMap: result,
    };
  }

  return state;
};

// ==================================================================================================

function handleAnnotationPage(annotationPage, annotationMap) {
  const { items, type } = annotationPage;
  // Just ignore non-Annotation Pages for now
  if (type !== 'AnnotationPage') {
    return;
  }

  const result = {};

  items.forEach((anno) => {
    const { body, id } = anno;

    if (!body || (Array.isArray(body) && body.length === 0)) {
      return;
    }

    if (result[id]) {
      console.log(`%cFound duplicate annotation, ${id}`);
    } else {
      result[id] = processAnnotation(anno, annotationMap);
    }
  });

  return result;
}

/**
 * Generate application state part for this annotation. Should look similar to:
 *
 *  {
 *    json: { ... }, // annotation JSON data
 *    targetCanvas: '',  // ID of target IIIF Canvas
 *    targetText: '', // The actual text this annotation should select
 *  }
 *
 * Impl note:
 * For this iteration, we will pick out any IIIF Canvas this annotation targets.
 * We will also check to see if the annotation targets a CTS URN.
 * We can use these pieces of information to create a selector that should be able
 * to query the annotation map for related annotations
 *
 * @param {object} annotation
 * @param {object} annoMap annotation map, pulled from application state
 */
function processAnnotation(annotation, annoMap) {
  const { targetCanvas, targetText } = findTargets(annotation);

  return {
    json: annotation,
    targetCanvas,
    targetText,
  };
}

function findTargets(annotation) {
  const { target } = annotation;

  let targetCanvas;
  let targetText;

  if (Array.isArray(target)) {
    targetCanvas = target.find(
      (t) => t.type === 'SpecificResource' && t.source.type === 'Canvas'
    );

    if (targetCanvas) {
      targetCanvas = targetCanvas.source.id;

      // TODO: nasty custom normalization
      targetCanvas = targetCanvas.replace(/iiif3/, 'iiif');
    }

    const cts = target.find(
      (t) => typeof t === 'string' && t.startsWith('urn:cts')
    );
    if (cts && cts.includes('@')) {
      targetText = cts.slice(cts.lastIndexOf('@') + 1);
    }
  } else if (typeof target === 'object') {
    if (target.type === 'SpecificResource' && target.source.type === 'Canvas') {
      targetCanvas = target;
    }
  }

  return {
    targetCanvas,
    targetText,
  };
}
