import { getAnnotationResourcesByMotivation } from 'mirador/dist/es/src/state/selectors/annotations';
import { getVisibleCanvases } from 'mirador/dist/es/src/state/selectors/canvases';
import {
  getAnnotationsForVisibleCanvases,
  mapAnnotationPageToCanvasLabel
} from './selectors';

export const mapStateToProps = (state, props) => {
  const selectedCanvases = getVisibleCanvases(state, { windowId: props.targetProps.windowId });
  const presentAnnotations = getAnnotationsForVisibleCanvases(state, selectedCanvases);
  const canvasLabels = mapAnnotationPageToCanvasLabel(state, selectedCanvases, presentAnnotations);

  return ({
    annotationCount: getAnnotationResourcesByMotivation(state, { motivations: ['oa:commenting', 'sc:painting', 'commenting'], windowId: props.targetProps.windowId }).length,
    selectedCanvases,
    presentAnnotations,
    canvasLabels
  });
};

export const mapDispatchToProps = {};
// const styles = theme => ({
//   section: {
//     borderBottom: `.5px solid ${theme.palette.section_divider}`,
//     paddingBottom: theme.spacing(1),
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//     paddingTop: theme.spacing(2),
//   },
// });

