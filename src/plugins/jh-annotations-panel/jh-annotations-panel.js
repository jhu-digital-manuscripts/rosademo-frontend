import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import AnnotationSettings from 'mirador/dist/es/src/containers/AnnotationSettings';
import CanvasAnnotations from 'mirador/dist/es/src/containers/CanvasAnnotations';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import ns from 'mirador/dist/es/src/config/css-ns';

/**
 * WindowSideBarAnnotationsPanel ~
*/
export default class JHAnnotationsPanel extends Component {
  /**
   * Returns the rendered component
  */
  render() {
    const {
      annotationCount, classes, selectedCanvases, t, windowId, id,
    } = this.props.targetProps;

    return (
      <CompanionWindow
        title={t('annotations')}
        paperClassName={ns('window-sidebar-annotation-panel')}
        windowId={windowId}
        id={id}
        titleControls={<AnnotationSettings windowId={windowId} />}
      >
        <div className={classes.section}>
          <h1>Custom Annotations Sidebar Panel!</h1>
          <Typography component="p" variant="subtitle2">{t('showingNumAnnotations', { number: annotationCount })}</Typography>
        </div>

        {selectedCanvases.map((canvas, index) => (
          <CanvasAnnotations
            canvasId={canvas.id}
            key={canvas.id}
            index={index}
            totalSize={selectedCanvases.length}
            windowId={windowId}
          />
        ))}
      </CompanionWindow>
    );
  }
}

