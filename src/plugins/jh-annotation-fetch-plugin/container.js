import { getVisibleCanvases } from 'mirador/dist/es/src/state/selectors/canvases';
import { getManifest } from 'mirador/dist/es/src/state/selectors/manifests';
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
  const { windowId } = props.targetProps;

  return {
    canvases: getVisibleCanvases(state, { windowId }),
    config: state.config,
    manifest: getManifest(state, { windowId })?.json
  };
}

export const mapDispatchToProps = {
  receiveAnnotation,
};
