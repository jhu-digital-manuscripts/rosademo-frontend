import { getVisibleCanvases } from 'mirador/dist/es/src/state/selectors/canvases';

/**
 * Define custom action names. Namespaced to prevent collision with other events
 */
export const ActionTypes = {
  GEOREF_ANNOTATION_SELECTED: 'annoiop/GEOREF_ANNOTATION_SELECTED'
};

/**
 * Mapping Mirador's state onto our plugin's 'props'
 */
export const mapStateToProps = (state, props) => {
  const { windowId } = props;

  const selectedCanvases = getVisibleCanvases(state, { windowId });

  return ({
    annotations: getGeoreferenceAnnotations(state, selectedCanvases),
    selectedAnnotation: getSelectedGeorefAnnotation(state, windowId),
  });
};

/**
 * Map actions to our plugin's 'props'
 * 
 * georefAnnotationSelected action takes one 'annotationId' argument and packages it
 * with the 'windowId' prop provided by Mirador. Our plugin can then call
 * 'georefAnnotationSelected' and specify the ID of a selected annotation to invoke
 * this action.
 */
export const mapDispatchToProps = (dispatch, {windowId}) => ({
  selectGeorefAnnotation: (annotationId) => dispatch(georefAnnotationSelectedAction(annotationId, windowId))
});

/**
 * Provide the plugin's custom reducer to Mirador's redux store
 */
export function georefAnnotationSelectedReducer(state = {}, action) {
  if (action.type === ActionTypes.GEOREF_ANNOTATION_SELECTED) {
    return {
      ...state,
      [action.windowId]: {
        selectedAnnotation: action.annotationId
      }
    }
  }

  return state;
}

// ------------------------------------------------------------------------

/**
 * Is this annotation one of our "georeference" annotations?
 * @param {object} annotation JSON data of an annotation
 */
function isGeoref(annotation) {
  return annotation.label?.toLowerCase().includes('georeference');
}

function getGeoreferenceAnnotations(state, canvases) {
  const canvasIds = canvases.map(canvas => canvas.id);
  const annotations = state.annotationsMapReducer?.annotationMap;
  if (!annotations) {
    return [];
  }

  return Object.values(annotations)
    .filter(annotation => canvasIds.includes(annotation.targetCanvas) && isGeoref(annotation.json))
    .map(annotation => annotation.json);
}

function getSelectedGeorefAnnotation(state, windowId) {
  return state.jhMapPanel[windowId]?.selectedAnnotation;
}

const georefAnnotationSelectedAction = (annotationId, windowId) => {
  return {
    annotationId,
    windowId,
    type: ActionTypes.GEOREF_ANNOTATION_SELECTED
  };
}
