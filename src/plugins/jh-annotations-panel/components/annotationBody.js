import React, { Component } from 'react';

/**
 * Render an annotation body. Specifics of how it is rendered may
 * depend on the properties of the annotation body, such as type,
 * format, etc
 * 
 * We could break out different annotation 'purposes' into separate
 * components if we think it would help.
 * 
 * props: {
 *    body: { ... }
 *  }
 */
export default class AnnotationBody extends Component {
  render() {
    const { body } = this.props;

    let content;

    if (body.purpose === 'tagging') {
      content = (
        <div>Tag: {body.value}</div>
      );
    } else if (body.purpose === 'commenting') {
      content = (
        <div>(comment: {body.value})</div>
      );
    } else if (body.purpose === 'identifying') {
      content = (
        <div>
          <a href={body.source} target="_blank">{body.source}</a>
        </div>
      );
    } else if (body.type === 'TextualBody') {
      if (body.language === 'en') {
        content = (<div className="translation">{body.value}</div>);
      } else if (body.language) {
        content = (<div className="transcription">{body.value}</div>);
      }
    }

    return (
      <div className="annotation-body">
        {content}
      </div>
    );
  }
}