import JHWebAnnotationPlugin from './JHWebAnnotation';
import { mapStateToProps, mapDispatchToProps } from './container';

export default {
  name: 'JHWebAnnotationPlugin',
  target: "WindowCanvasNavigationControls",
  mode: 'wrap',
  component: JHWebAnnotationPlugin,
  mapStateToProps,
  mapDispatchToProps
};
