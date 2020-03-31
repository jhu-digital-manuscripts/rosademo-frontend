import JHAnnotationFetcher from './JHAnnotationFetcher';
import { mapStateToProps, mapDispatchToProps } from './container';

export default {
  name: 'JHAnnotationFetchPlugin',
  target: "WindowCanvasNavigationControls",
  mode: 'wrap',
  component: JHAnnotationFetcher,
  mapStateToProps,
  mapDispatchToProps
};
