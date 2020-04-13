import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Annotation from './annotation';

/**
 * Render a single AnnotationPage, compliant with Web Annotation, not strictly limited
 * to the IIIF 3 spec
 * 
 * props: {
 *    canvasLabel: '',
 *    annotationPage: { ... } 
 *  }
 */
export default class AnnotationPage extends Component {
  render() {
    const { annotationPage, canvasLabel, classes } = this.props;

    return (
      <>
        <Typography className={classes.sectionHeading} variant="overline">
          {canvasLabel}
        </Typography>

        <div>
          {
            annotationPage.json.items.map((anno, index) => (
              <Annotation
                annotation={anno}
                key={anno.id}
              />
            ))
          }
        </div>
      </>
    );
  }
}
