import JHWebAnnotationPlugin from './JHWebAnnotation';
import { mapStateToProps, mapDispatchToProps } from './props';

export default {
  name: 'JHWebAnnotationPlugin',
  target: "WindowCanvasNavigationControls",
  mode: 'wrap',
  component: JHWebAnnotationPlugin,
  mapStateToProps,
  mapDispatchToProps
};
