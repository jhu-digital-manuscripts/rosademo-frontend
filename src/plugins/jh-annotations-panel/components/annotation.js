import React, { Component } from 'react';
import AnnotationBody from './annotationBody';

/**
 * Should display an annotation, possibly decorated by other annotations
 *
 * props: {
 *    annotation: { ... }, // The subject of this component
 *    targetedBy: [
 *      { ... }, // An annotation
 *    ]
 *  }
 */
export default class Annotation extends Component {
  render() {
    const { annotation } = this.props;

    // The annotation has content if 'annotation.body' is an array with 1 or more elements,
    // or is not an array and exists
    const hasContent = Array.isArray(annotation.body)
      ? annotation.body.length > 0
      : !!annotation.body;

    // If no content is detected, return early
    if (!hasContent) {
      return <></>;
    }

    const bodies = annotation.body.map((body, index) => (
      <AnnotationBody body={body} key={index} />
    ));

    let creator;
    if (annotation.creator) {
      if (typeof annotation.creator === 'string') {
        creator = (
          <>
            <span style={{ fontStyle: 'italic' }}>Creator: </span>
            <a href={annotation.creator} target='_blank'>
              {annotation.creator}
            </a>
          </>
        );
      } else if (typeof annotation.creator === 'object') {
        creator = (
          <a href={annotation.creator.id} target='_blank'>
            {annotation.creator.name}
          </a>
        );
      }
    } else {
      creator = <></>;
    }

    return (
      <div className='annotation'>
        <div className='annotation-label'>{annotation.label}</div>
        <div className='annotation-bodies'>{bodies}</div>
        <div className='annotation-creator'>{creator}</div>
      </div>
    );
  }
}
