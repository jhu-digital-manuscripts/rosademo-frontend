import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';
import React, { Component } from 'react';
import StyledAccordion from './styledAccordion';

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
  constructor(props) {
    super(props);
  }

  render() {
    const { body } = this.props;

    let content;

    if (body.purpose === 'tagging') {
      // content = (
      //   <div style={{ marginTop: '8px', marginBottom: '8px' }}>
      //     <Chip
      //       size='small'
      //       icon={<TagIcon />}
      //       label={body.value}
      //       color='secondary'
      //     />
      //   </div>
      // );
    } else if (body.purpose === 'commenting') {
      // content = (
      //   <>
      //     <div>
      //       <span style={{ fontStyle: 'italic' }}>Comment: </span>
      //       <span>{body.value}</span>
      //     </div>
      //   </>
      // );
    } else if (body.type === 'TextualBody') {
      if (body.language === 'en') {
        content = (
          <StyledAccordion
            title='Translation'
            annotation={body.value}
          ></StyledAccordion>
        );
      } else if (body.language) {
        content = (
          <SanitizedHtml
            ruleSet='mirador2'
            htmlString={body.value}
            className='transcription'
          />
        );
      }
    }

    return <div className='annotation-body'>{content}</div>;
  }
}
