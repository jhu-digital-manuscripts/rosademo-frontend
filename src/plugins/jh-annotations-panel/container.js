import { getAnnotationResourcesByMotivation } from 'mirador/dist/es/src/state/selectors/annotations';
import { getVisibleCanvases } from 'mirador/dist/es/src/state/selectors/canvases';

export const mapStateToProps = (state, props) => {
  return ({
    annotationCount: getAnnotationResourcesByMotivation(state, { motivations: ['oa:commenting', 'sc:painting', 'commenting'], windowId: props.targetProps.windowId }).length,
    selectedCanvases: getVisibleCanvases(state, { windowId: props.targetProps.windowId }),
  })
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

