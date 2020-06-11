import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Annotation from './annotation';
import { Box } from '@material-ui/core';

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
  _targetsAnnotation(target) {
    if (!Array.isArray(target)) {
      return this._targetsAnnotation([target]);
    }

    return target.some(
      (t) => typeof t === 'string' && t.startsWith('urn:cts') && t.includes('@')
    );
  }

  render() {
    const { annotationMap, annotationPage, canvasLabel, classes } = this.props;

    const annotationElements = annotationPage.json.items
      .filter((anno) => !this._targetsAnnotation(anno.target))
      .map((anno) => {
        const { id } = anno;
        const targetedBy = annotationMap[id];

        return (
          <Annotation annotation={anno} targetedBy={targetedBy} key={id} />
        );
      });

    if (annotationElements.length === 0) {
      return <></>;
    }

    return (
      <>
        <Box pl='8px' pb='16px'>
          <Typography className={classes.sectionHeading} variant='overline'>
            {canvasLabel}
          </Typography>
        </Box>

        <div>{annotationElements}</div>
      </>
    );
  }
}
