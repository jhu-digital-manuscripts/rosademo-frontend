import JHAnnotationFetcher from './JHAnnotationFetcher';
import { mapStateToProps, mapDispatchToProps } from './container';
import { annotationsMapReducer } from './reducers';

export default {
  name: 'JHAnnotationFetchPlugin',
  target: "WindowCanvasNavigationControls",
  mode: 'wrap',
  component: JHAnnotationFetcher,
  mapStateToProps,
  mapDispatchToProps,
  reducers: {
    annotationsMapReducer
  }
};
