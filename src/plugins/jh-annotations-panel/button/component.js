import React, { Component } from 'react';

export default class JHAnnotationPanelButton extends Component {
  render() {
    const { TabButton, PluginComponents, dispatch, ...otherProps } = this.props;
    // TODO: Need to change the aria-label && title
    return (
      <TabButton
        {...otherProps}
        id="jh-annotation-panel-companion-window-button"
        label="😀"
        value="JH_ANNO_PANEL"
      />
    );
  }
}