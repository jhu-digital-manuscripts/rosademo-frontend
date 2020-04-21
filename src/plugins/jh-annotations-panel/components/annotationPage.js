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
 *    annotationPage: { ... },
 *    annotationMap: {} // Map annotation IDs to annotations that may target them
 *  }
 */
export default class AnnotationPage extends Component {
  render() {
    const {
      annotationMap,
      annotationPage,
      canvasLabel,
      classes
    } = this.props;

    const annotationElements = annotationPage.json.items.map((anno) => {
      const { id } = anno;
      const targetedBy = annotationMap[id];

      return (
        <Annotation annotation={anno} targetedBy={targetedBy} key={id} />
      );
    });

    return (
      <>
        <Box pl="8px" pb="16px">
          <Typography className={classes.sectionHeading} variant="overline">
            {canvasLabel}
          </Typography>
        </Box>

        <div>
          {annotationElements}
        </div>
      </>
    );
  }
}
