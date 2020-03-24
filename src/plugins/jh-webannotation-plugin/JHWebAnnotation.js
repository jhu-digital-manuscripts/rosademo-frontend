import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';

export default class JHWebAnnotation extends Component {

  constructor(props) {
    super(props);
    this.fetchAnnotations = this.fetchAnnotations.bind(this);
  }

  fetchAnnotations() {
    console.log('%cWill fetch annotations now', 'color:green;');
  }

  componentDidMount() {
    const { canvases } = this.props;
    this.fetchAnnotations(canvases);
  }

  componentDidUpdate(prevProps) {
    const { canvases } = this.props;

    const currentCanvasIds = canvases.map(canvas => canvas.id);
    const prevCanvasIds = prevProps.canvases.map(canvas => canvas.id);

    if (!isEqual(currentCanvasIds, prevCanvasIds)) {
      this.fetchAnnotations(canvases);
    }
  }

  render() {
    const { TargetComponent, targetProps } = this.props;
    return (
      <TargetComponent {...targetProps}></TargetComponent>
    );
  }
}
