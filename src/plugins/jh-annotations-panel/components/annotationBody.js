import React, { Component } from 'react';

/**
 * Render an annotation body. Specifics of how it is rendered may
 * depend on the properties of the annotation body, such as type,
 * format, etc
 * 
 * props: {
 *    body: { ... }
 *  }
 */
export default class AnnotationBody extends Component {
  render() {
    const { body } = this.props;

    if (body.type === 'TextualBody') {
      return <p>{body.value}</p>;
    } else if (body.purpose === 'identifying') {
      return <p><a href={body.source} target="_blank">{body.source}</a></p>;
    }

    return <></>;
  }
}