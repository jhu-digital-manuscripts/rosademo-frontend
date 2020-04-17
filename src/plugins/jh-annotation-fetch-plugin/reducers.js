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
export const relatedAnnotationsReducer = (state = {}, action) => {
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

    let result = handleAnnotationPage(annotationJson, annotationMap);
    result = Object.assign((annotationMap || {}), result);

    return {
      ...state,
      annotationMap: result
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
 *    targetAnnotations: [], // ID of any IIIF annotations this annotation may target
 *    targetCanvas: ''  // ID of target IIIF Canvas
 *  }
 * 
 * Impl note:
 * For this iteration, we will pick out any IIIF Canvas this annotation targets.
 * We will also check to see if the annotation targets a CTS URN, if so, inspect
 * the annotation list for a match.
 * 
 * @param {object} annotation 
 * @param {object} annoMap annotation map, pulled from application state
 */
function processAnnotation(annotation, annoMap) {
  const { body, target } = annotation;
  const { targetAnnotations, targetCanvas } = findTargets(annotation, annoMap, true);

  return {
    json: annotation,
    targetCanvas,
    targetAnnotations,
    targets
  }
}

function findTargets(annotation, annoMap, checkAnnotations) {
  let targetCanvas;
  let targetAnnotations;

  if (Array.isArray(target)) {
    targetCanvas = target.find(t => t.type === 'SpecificResource' && t.source.type === 'Canvas')

    const cts = target.find(t => (typeof t === 'string') && t.startsWith('urn:cts'));
    if (checkAnnotations && cts && cts.includes('@')) {
      const word = cts.slice(cts.lastIndexOf('@') + 1);

      targetAnnotations.push(
        Object.values(annoMap).map(anno => anno.json)
          .filter((anno) => {
            const targets = findTargets(anno);
            const annoText = anno2text(anno);

            return targetCanvas.includes(targets.targetCanvas) && annoText.includes(word);
          }
        )
      );
    }
  } else if (typeof target === 'object') {
    if (target.type === 'SpecificResource' && target.source.type === 'Canvas') {
      targetCanvas = target;
    }
  }

  return {
    targetCanvas,
    targetAnnotations
  }
}

function anno2text(annotation) {
  const { body } = annotation;

  if (!Array.isArray(annotation)) {
    return anno2text([body]);
  }

  return body.filter(b => b.type === 'TextualBody')
    .map(b => b.value)
    .join(' ');
}






/**
 * Does the given annotation target another annotation as opposed to a canvas?
 * If so, return the target annotation ID
 * 
 * @param {object} annotation annotation JSON
 * @returns {string} the ID of the targeted annotation
 */
function annoTargetsAnno(annotation) {
  const { target } = annotation;
  return Array.isArray(target) ? target.some(t => _isAnnoTarget(t)) : _isAnnoTarget(target);
}

/**
 * Does this annotation target represent an annotation?
 * 
 * @param target an annotation target. Can be string or object
 */
function _isAnnoTarget(target) {
  if (typeof target === 'string') {
    return target.startsWith('urn:cts');
  }

  return false;
}

