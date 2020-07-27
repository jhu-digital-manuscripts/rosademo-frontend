import { getVisibleCanvases } from 'mirador/dist/es/src/state/selectors/canvases';

export const mapStateToProps = (state, props) => {
  const { windowId } = props;

  const selectedCanvases = getVisibleCanvases(state, { windowId });

  return ({
    annotations: getGeoreferenceAnnotations(state, selectedCanvases)
  });
};

export const mapDispatchToProps = {};

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
