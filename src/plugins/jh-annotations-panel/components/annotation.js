import React, { Component } from 'react';
import AnnotationBody from './annotationBody';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
      return <div className='annotation-label'>{annotation.label}</div>;
    }

    return <></>;
  }

  _creator(annotation) {
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
      return <AnnotationBody className={className} body={body} key={index} />;
    });
  }

  render() {
    const { annotation, targetedBy } = this.props;

    // The annotation has content if 'annotation.body' is an array with 1 or more elements,
    // or is not an array and exists
    const hasContent = Array.isArray(annotation.body)
      ? annotation.body.length > 0
      : !!annotation.body;
    // If no content is detected, return early
    if (!hasContent) {
      return <></>;
    }

    let targetedAnnotations;
    const isTargeted = Array.isArray(targetedBy) && targetedBy.length > 0;
    if (isTargeted) {
      targetedAnnotations = (
        <ExpansionPanel
          square={true}
          style={{
            WebkitBoxShadow: 'none',
            MozBoxShadow: 'none',
            boxShadow: 'none',
          }}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant='body2'>Georeference</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className='targeted-annotations-container'>
              {targetedBy.map((anno) => (
                <Annotation annotation={anno.json} key={anno.json.id} />
              ))}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    } else {
      targetedAnnotations = <></>;
    }

    return (
      <div className='annotation'>
        {this._label(annotation)}
        <div className='annotation-bodies'>{this._bodies(annotation)}</div>
        {this._creator(annotation)}
        {targetedAnnotations}
      </div>
    );
  }
}
