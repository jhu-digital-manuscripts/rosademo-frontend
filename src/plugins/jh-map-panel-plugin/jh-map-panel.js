import React, { Component } from 'react';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import ns from 'mirador/dist/es/src/config/css-ns';
import { Typography } from '@material-ui/core';

export default class JHMapPanel extends Component {
  render() {
    const { classes, windowId, id } = this.props;

    return (
      <CompanionWindow
        title='Locations'
        paperClassName={ns('window-sidebar-map-panel')}
        windowId={windowId}
        id={id}
      >
        <div>
          <Typography variant='p'>Test</Typography>
        </div>
      </CompanionWindow>
    );
  }
}
