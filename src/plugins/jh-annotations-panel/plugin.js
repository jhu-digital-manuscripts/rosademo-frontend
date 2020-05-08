import JHAnnotationsPanel from './jh-annotations-panel';
import { mapStateToProps, mapDispatchToProps } from './container';

/**
 * Plugin definition used by Mirador
 */
export default {
  name: 'JHAnnotationsPanelPlugin',
  target: 'WindowSideBarAnnotationPanel',
  mode: 'wrap',
  component: JHAnnotationsPanel,
  mapStateToProps,
  mapDispatchToProps,
};
