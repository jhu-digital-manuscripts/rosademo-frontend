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

  _label(annotation) {
    if (annotation.label) {
      return (
        <div className="annotation-label">
          Label: {annotation.label}
        </div>
      );
    }

    return (<></>);
  }

  _creator(annotation) {
    let creator;
    if (annotation.creator) {
      if (typeof annotation.creator === 'string') {
        creator = (
          <div className="annotation-creator">
            <span>Creator: </span><a href={annotation.creator} target="_blank">{annotation.creator}</a>
          </div>
        );
      } else if (typeof annotation.creator === 'object') {
        creator = (
          <div className="annotation-creator">
            <a href={annotation.creator.id} target="_blank">{annotation.creator.name}</a>
          </div>
        );
      }
    } else {
      creator = (<></>);
    }

    return creator;
  }

  _bodies(annotation) {
    return annotation.body.map((body, index) => {
      let className = '';
      if (body.hasOwnProperty('language')) {
        if (body.language === 'en') {
          className = 'translation';
        } else {
          className = 'transcription';
        }
      }
      return (<AnnotationBody className={className} body={body} key={index} />);
    });
  }

  render() {
    const { annotation } = this.props;
    // The annotation has content if 'annotation.body' is an array with 1 or more elements,
    // or is not an array and exists
    const hasContent = Array.isArray(annotation.body) ? annotation.body.length > 0 : !!annotation.body;
    // If no content is detected, return early
    if (!hasContent) {
      return <></>;
    }

    return (
      <div className="annotation">
        {this._label(annotation)}
        <div className="annotation-bodies">
          {this._bodies(annotation)}
        </div>
        {this._creator(annotation)}
      </div>
    );
  }
}