import Mirador from 'mirador';
import { jhWebAnnotationPlugin, testPlugin } from '../../src';

const config = {
  id: 'demo',
  windows: [
    {
      loadedManifest: 'https://rosetest.library.jhu.edu/rosademo/iiif/homer/VA/manifest',
      canvasId: 'https://rosetest.library.jhu.edu/rosademo/iiif/homer/VA/VA035RN-0036/canvas'
    }
  ],
  window: {
    defaultView: 'single',
    sideBarOpenByDefault: true,
  },
  thumbnailNavigation: {
    defaultPosition: 'far-bottom'
  },
  theme: {
    palette: {
      primary: {
        main: '#1967d2'
      }
    }
  }
};

const plugins = [
  // testPlugin,
  jhWebAnnotationPlugin
];

const miradorInstance = Mirador.viewer(config, plugins);
