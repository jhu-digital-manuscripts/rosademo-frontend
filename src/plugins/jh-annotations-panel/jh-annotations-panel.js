import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import AnnotationSettings from 'mirador/dist/es/src/containers/AnnotationSettings';
import CanvasAnnotations from 'mirador/dist/es/src/containers/CanvasAnnotations';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import ns from 'mirador/dist/es/src/config/css-ns';
import AnnotationPage from './components/annotationPage';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const panelTheme = createMuiTheme({
  typography: {
    fontFamily: [
      'Roboto',
    ],
  },
});

/**
 * WindowSideBarAnnotationsPanel ~
*/
export default class JHAnnotationsPanel extends Component {
  /**
   * Returns the rendered component
  */
  render() {
    const { classes, t, windowId, id } = this.props.targetProps;
    const { annotationCount, selectedCanvases, presentAnnotations, canvasLabels } = this.props;

    const annoPages = presentAnnotations.map((annoPage, index) => {
      if (annoPage.json['@type'] === 'sc:AnnotationList') {
        // Ignore old-style annotation lists for now
        return <div className="hidden" key={annoPage.id}></div>;
      }

      return (
        <AnnotationPage
          annotationPage={annoPage}
          canvasLabel={canvasLabels[annoPage.id]}
          classes={classes}
          key={annoPage.id}
        />
      );
    });

    // This sticks around from Mirador's built-in Annotations panel because these components
    // will basically do nothing if the canvas has no IIIF2 AnnotationList associated with it
    const miradorAnnos = selectedCanvases.map((canvas, index) => (
      <CanvasAnnotations
        canvasId={canvas.id}
        key={canvas.id}
        index={index}
        totalSize={selectedCanvases.length}
        windowId={windowId}
      />
    ));

    return (
      <ThemeProvider>
        <CssBaseline>
          {<CompanionWindow
            title={t('annotations')}
            paperClassName={ns('window-sidebar-annotation-panel')}
            windowId={windowId}
            id={id}
            titleControls={<AnnotationSettings windowId={windowId} />}
          >
            <div className={classes.section}>
              <Typography component="p" variant="subtitle2">{t('showingNumAnnotations', { number: annotationCount })}</Typography>
            </div>

            <div>
              {miradorAnnos}
            </div>

            <Box pl="8px" pr="8px">
              <div>
                {annoPages}
              </div>
            </Box>

          </CompanionWindow>}
        </CssBaseline>
      </ThemeProvider>
    );
  }
}

