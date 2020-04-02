import { getAnnotationResourcesByMotivation } from 'mirador/dist/es/src/state/selectors/annotations';
import { getVisibleCanvases } from 'mirador/dist/es/src/state/selectors/canvases';
import flatten from 'lodash/flatten';

/**
 * This is mostly a trial for a custom selector to get a feel for how they work and interact with this plugin.
 * This particular function will return all AnnotationPages or Annotationlists for the currently visible
 * canvases.
 * 
 * @param {object} state Mirador's application state
 * @param {array} canvases array of Canvas JSON objs
 */
function getAnnotationsForVisibleCanvases(state, canvases) {
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
  debugger
  return annoPages;
}

export const mapStateToProps = (state, props) => {
  const selectedCanvases = getVisibleCanvases(state, { windowId: props.targetProps.windowId });
  const presentAnnotations = getAnnotationsForVisibleCanvases(state, selectedCanvases);

  return ({
    annotationCount: getAnnotationResourcesByMotivation(state, { motivations: ['oa:commenting', 'sc:painting', 'commenting'], windowId: props.targetProps.windowId }).length,
    selectedCanvases,
    presentAnnotations
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

