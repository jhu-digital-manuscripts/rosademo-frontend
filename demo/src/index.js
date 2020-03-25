import Mirador from 'mirador';
import { jhWebAnnotationPlugin } from '../../src';

const config = {
  id: 'demo',
  windows: [
    {
      loadedManifest: 'https://rosetest.library.jhu.edu/rosademo/iiif/homer/VA/manifest',
      canvasId: 'https://rosetest.library.jhu.edu/rosademo/iiif/homer/VA/VA035RN-0036/canvas'
    },
    {
      loadedManifest: 'https://rosetest.library.jhu.edu/rosademo/iiif/rose/SeldenSupra57/manifest'
    }
  ],
  window: {
    defaultView: 'single',
    sideBarOpenByDefault: true,
  },
  manifests: {
    'https://rosetest.library.jhu.edu/rosademo/iiif/rose/CoxMacro/manifest': {},
    'https://rosetest.library.jhu.edu/rosademo/iiif/rose/Douce195/manifest': {},
    'https://rosetest.library.jhu.edu/rosademo/iiif/rose/Douce332/manifest': {},
    'https://rosetest.library.jhu.edu/rosademo/iiif/rose/LudwigXV7/manifest': {},
    'https://rosetest.library.jhu.edu/rosademo/iiif/rose/Morgan948/manifest': {},
    'https://rosetest.library.jhu.edu/rosademo/iiif/rose/SeldenSupra57/manifest': {},
    'https://rosetest.library.jhu.edu/rosademo/iiif/rose/Walters143/manifest': {},
    'https://rosetest.library.jhu.edu/rosademo/iiif/homer/VA/manifest': {}
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
  jhWebAnnotationPlugin
];

const miradorInstance = Mirador.viewer(config, plugins);
