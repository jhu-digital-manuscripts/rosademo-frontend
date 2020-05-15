import React, { Component } from 'react';
import StyledExpansionPanel from './styledExpansionPanel';
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
          <div>
            <span style={{ fontStyle: 'italic' }}>Tag: </span>
            <span>{body.value}</span>
          </div>
        </>
      );
    } else if (body.purpose === 'commenting') {
      content = (
        <>
          <div>
            <span style={{ fontStyle: 'italic' }}>Comment: </span>
            <span>{body.value}</span>
          </div>
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
    } else if (body.type === 'TextualBody') {
      if (body.language === 'en') {
        content = (
          <StyledExpansionPanel
            title='Translation'
            annotation={body.value}
          ></StyledExpansionPanel>
        );
      } else if (body.language) {
        content = (
          <div className='transcription' style={{ paddingTop: '8px' }}>
            {body.value}
          </div>
        );
      }
    }

    return <div className='annotation-body'>{content}</div>;
  }
}
