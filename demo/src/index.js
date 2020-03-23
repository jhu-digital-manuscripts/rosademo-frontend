import Mirador from 'mirador';
import { testPlugin } from '../../src';

const config = {
  id: 'demo',
  windows: [
    {
      loadedManifest: 'https://rosetest.library.jhu.edu/rosademo/iiif/homer/VA/manifest',
      canvasId: 'https://rosetest.library.jhu.edu/rosademo/iiif/homer/VA/VA012RN-0013/canvas'
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

const miradorInstance = Mirador.viewer(config, [ testPlugin ]);
