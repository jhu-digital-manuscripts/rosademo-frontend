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
    // debugger
    const bodies = annotation.body.map((body, index) => (
      <AnnotationBody body={body} key={index} />
    ));
    
    return (
      <div>
        <p>Label: {annotation.label}</p>
        {bodies}
        <p>Creator: {annotation.creator}</p>
      </div>
    );
  }
}