import JHAnnotationsPanel from './jh-annotations-panel';
import { mapStateToProps, mapDispatchToProps } from './container';

/**
 * Plugin definition used by Mirador
 */
export default {
  target: 'CustomPanel',
  companionWindowKey: 'JH_ANNO_PANEL',
  mode: 'add',
  component: JHAnnotationsPanel,
  name: 'JHAnnotationsPanelPlugin',
  mapStateToProps,
  mapDispatchToProps
};
