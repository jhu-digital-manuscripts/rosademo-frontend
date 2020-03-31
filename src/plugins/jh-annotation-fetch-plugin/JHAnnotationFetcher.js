import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import { getRosaWebAnnotations } from './webAnnotationUtils';

export default class JHAnnotationFetcher extends Component {
  constructor(props) {
    super(props);
    this.fetchAnnotations = this.fetchAnnotations.bind(this);
  }

  fetchAnnotations() {
    const { canvases, receiveAnnotation } = this.props;
    getRosaWebAnnotations(canvases, receiveAnnotation);
  }

  componentDidMount() {
    this.fetchAnnotations();
  }

  componentDidUpdate(prevProps) {
    const { canvases } = this.props;

    const currentCanvasIds = canvases.map(canvas => canvas.id);
    const prevCanvasIds = prevProps.canvases.map(canvas => canvas.id);

    if (!isEqual(currentCanvasIds, prevCanvasIds)) {
      this.fetchAnnotations();
    }
  }

  render() {
    const { TargetComponent, targetProps } = this.props;
    return (
      <TargetComponent {...targetProps}></TargetComponent>
    );
  }
}
