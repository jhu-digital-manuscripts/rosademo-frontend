import Mirador from 'mirador';
import {
  jhAnnotationFetchPlugin,
  jhAnnotationsSidebar,
  jhAnnotationsSidebarButton
} from '../../src';

const config = {
  id: 'demo',
  windows: [
    {
      loadedManifest: 'https://rosetest.library.jhu.edu/rosademo/iiif/homer/VA/manifest',
      canvasId: 'https://rosetest.library.jhu.edu/rosademo/iiif/homer/VA/VA035RN-0036/canvas',
      view: 'single'
    },
    {
      loadedManifest: 'https://rosetest.library.jhu.edu/rosademo/iiif/homer/VA/manifest',
      canvasId: 'https://rosetest.library.jhu.edu/rosademo/iiif/homer/VA/VA012RN-0013/canvas',
      view: 'single'
    }
  ],
  window: {
    defaultView: 'single',
    sideBarOpenByDefault: true,
  },
  catalog: [
    { manifestId: 'https://rosetest.library.jhu.edu/rosademo/iiif/rose/CoxMacro/manifest', provider: 'JHU' },
    { manifestId: 'https://rosetest.library.jhu.edu/rosademo/iiif/rose/Douce195/manifest', provider: 'JHU' },
    { manifestId: 'https://rosetest.library.jhu.edu/rosademo/iiif/rose/Douce332/manifest', provider: 'JHU' },
    { manifestId: 'https://rosetest.library.jhu.edu/rosademo/iiif/rose/LudwigXV7/manifest', provider: 'JHU' },
    { manifestId: 'https://rosetest.library.jhu.edu/rosademo/iiif/rose/Morgan948/manifest', provider: 'JHU' },
    { manifestId: 'https://rosetest.library.jhu.edu/rosademo/iiif/rose/SeldenSupra57/manifest', provider: 'JHU' },
    { manifestId: 'https://rosetest.library.jhu.edu/rosademo/iiif/rose/Walters143/manifest', provider: 'JHU' },
    { manifestId: 'https://rosetest.library.jhu.edu/rosademo/iiif/homer/VA/manifest', provider: 'Eldarion(??)' }
  ],
  thumbnailNavigation: {
    defaultPosition: 'far-bottom',
  },
  themes: {
    dark: {
      palette: {
        type: 'dark',
        primary: {
          main: '#3F51B5',
        },
        secondary: {
          main: '#536dfe',
        },
      },
    },
    light: {
      palette: {
        type: 'light',
        primary: {
          main: '#3F51B5',
        },
        secondary: {
          main: '#536dfe',
        },
      },
    },
  },
};

const plugins = [
  jhAnnotationFetchPlugin,
  jhAnnotationsSidebar,
  jhAnnotationsSidebarButton
];

const miradorInstance = Mirador.viewer(config, plugins);
