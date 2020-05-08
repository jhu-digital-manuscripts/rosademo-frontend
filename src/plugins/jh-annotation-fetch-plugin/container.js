// import mirador from 'mirador';
import { getVisibleCanvases } from 'mirador/dist/es/src/state/selectors/canvases';
import { receiveAnnotation } from 'mirador/dist/es/src/state/actions/annotation';

/*
 * Note about these imports:
 * As much as I hate these import statements specifying files from 'dist', calling functions
 * from 'mirador' didn't seem to work. I had tried:
 *
 * import mirador from 'mirador';
 *
 * canvases: mirador.selectors.getVisibleCanvases
 */
export function mapStateToProps(state, props) {
  return {
    canvases: getVisibleCanvases(state, {
      windowId: props.targetProps.windowId,
    }),
    config: state.config,
  };
}

export const mapDispatchToProps = {
  receiveAnnotation,
};

// TODO: need custom reducer to save annotation target data for custom
// Annotation Panel plugin
