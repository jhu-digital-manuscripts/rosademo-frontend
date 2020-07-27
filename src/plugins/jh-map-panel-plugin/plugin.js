import JHMapPanel from './jh-map-panel';
import {
  mapDispatchToProps,
  mapStateToProps,
  georefAnnotationSelectedReducer
} from './container';

export default {
  target: 'CompanionWindow',
  companionWindowKey: 'JH_MAP_PANEL',
  mode: 'add',
  component: JHMapPanel,
  name: 'JHMapPanelPlugin',
  mapStateToProps,
  mapDispatchToProps,
  reducers: {
    jhMapPanel: georefAnnotationSelectedReducer
  }
};
