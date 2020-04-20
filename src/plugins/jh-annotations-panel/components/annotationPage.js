import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Annotation from './annotation';
import Box from '@material-ui/core/Box';

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
        <Box pl="8px" pb="16px">
          <Typography className={classes.sectionHeading} variant="overline">
            {canvasLabel}
          </Typography>
        </Box>

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
