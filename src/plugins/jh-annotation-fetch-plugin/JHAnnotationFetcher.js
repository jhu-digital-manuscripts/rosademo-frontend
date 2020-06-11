import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import { getRosaWebAnnotations } from './JHAnnotationService';
import { getEldarionAnnotations } from './EldarionAnnotationService';

export default class JHAnnotationFetcher extends Component {
  constructor(props) {
    super(props);
    this.fetchAnnotations = this.fetchAnnotations.bind(this);
  }

  fetchAnnotations() {
    const { canvases, manifest, receiveAnnotation } = this.props;
    getRosaWebAnnotations(canvases, receiveAnnotation);
    getEldarionAnnotations(canvases, receiveAnnotation, manifest);
  }

  componentDidMount() {
    this.fetchAnnotations();
  }

  componentDidUpdate(prevProps) {
    const { canvases } = this.props;

    const currentCanvasIds = canvases.map((canvas) => canvas.id);
    const prevCanvasIds = prevProps.canvases.map((canvas) => canvas.id);

    if (!isEqual(currentCanvasIds, prevCanvasIds)) {
      this.fetchAnnotations();
    }
  }

  render() {
    debugger
    const { TargetComponent, targetProps } = this.props;
    return <TargetComponent {...targetProps}></TargetComponent>;
  }
}
