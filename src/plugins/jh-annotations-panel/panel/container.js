import { getAnnotationResourcesByMotivation } from 'mirador/dist/es/src/state/selectors/annotations';
import { getVisibleCanvases } from 'mirador/dist/es/src/state/selectors/canvases';
import {
  getAnnotationsForVisibleCanvases,
  mapAnnotationPageToCanvasLabel,
  mapAnnoOfAnno,
} from './selectors';

export const mapStateToProps = (state, props) => {
  const { windowId } = props;
  const selectedCanvases = getVisibleCanvases(state, { windowId });

  const presentAnnotations = getAnnotationsForVisibleCanvases(
    state,
    selectedCanvases
  );

  const canvasLabels = mapAnnotationPageToCanvasLabel(
    state,
    selectedCanvases,
    presentAnnotations
  );

  const annoOfAnno = mapAnnoOfAnno(state, presentAnnotations);

  return {
    annotationCount: getAnnotationResourcesByMotivation(state, {
      motivations: ['oa:commenting', 'sc:painting', 'commenting'],
      windowId
    }).length,
    selectedCanvases,
    presentAnnotations,
    canvasLabels,
    annoOfAnno,
  };
};

export const mapDispatchToProps = {};
