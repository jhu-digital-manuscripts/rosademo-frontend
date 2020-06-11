import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import AnnotationSettings from 'mirador/dist/es/src/containers/AnnotationSettings';
import CanvasAnnotations from 'mirador/dist/es/src/containers/CanvasAnnotations';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import ns from 'mirador/dist/es/src/config/css-ns';
import AnnotationPage from './components/annotationPage';
import { CssBaseline, Box } from '@material-ui/core';
import 'typeface-roboto';

require('typeface-roboto');

/**
 * WindowSideBarAnnotationsPanel ~
 */
export default class JHAnnotationsPanel extends Component {
  /**
   * Returns the rendered component
   */
  render() {
    const { classes, t, windowId, id } = this.props;
debugger
    const {
      selectedCanvases,
      presentAnnotations,
      canvasLabels,
      annoOfAnno,
    } = this.props;

    const annoPages = presentAnnotations.map((annoPage) => {
      if (!annoPage || !annoPage.json) {
        return;
      }

      if (annoPage.json['@type'] === 'sc:AnnotationList') {
        // Ignore old-style annotation lists for now
        return <div className='hidden' key={annoPage.id}></div>;
      }

      return (
        <AnnotationPage
          annotationPage={annoPage}
          canvasLabel={canvasLabels[annoPage.id]}
          classes={classes}
          annotationMap={annoOfAnno}
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
      <CssBaseline>
        {
          <CompanionWindow
            title={t('annotations')}
            paperClassName={ns('window-sidebar-annotation-panel')}
            windowId={windowId}
            id={id}
            titleControls={<AnnotationSettings windowId={windowId} />}
          >
            <div className={classes.section}>
              <Typography component='p' variant='subtitle2'>
                {t('showingNumAnnotations', {
                  number: Object.values(annoOfAnno).length,
                })}
              </Typography>
            </div>

            <div>{miradorAnnos}</div>

            <Box pl='8px' pr='8px'>
              <div>{annoPages}</div>
            </Box>
          </CompanionWindow>
        }
      </CssBaseline>
    );
  }
}
