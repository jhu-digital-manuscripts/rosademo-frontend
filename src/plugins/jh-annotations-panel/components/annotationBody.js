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
        <>
          <div style={{ fontStyle: 'italic' }}>Tag: </div>
          <div style={{ textIndent: '8px' }}>{body.value}</div>
        </>
      );
    } else if (body.purpose === 'commenting') {
      content = (
        <>
          <div style={{ fontStyle: 'italic' }}>Comment: </div>
          <div style={{ textIndent: '8px' }}>{body.value}</div>
        </>
      );
    } else if (body.purpose === 'identifying') {
      content = (
        <div>
          <a href={body.source} target='_blank'>
            {body.source}
          </a>
        </div>
      );
    } else {
    }

    return <div className='annotation-body'>{content}</div>;
  }
}
