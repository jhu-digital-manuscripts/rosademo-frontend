import JHAnnotationsPanel from './jh-annotations-panel';
import { mapStateToProps, mapDispatchToProps } from './container';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';

/**
 * Plugin definition used by Mirador
 */
export default {
  target: 'CustomPanel',
  companionWindowKey: 'JH_ANNO_PANEL',
  mode: 'add',
  component: compose(withTranslation())(JHAnnotationsPanel),
  name: 'JHAnnotationsPanelPlugin',
  mapStateToProps,
  mapDispatchToProps
};
