import React, { Component } from 'react';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import ns from 'mirador/dist/es/src/config/css-ns';
import { Typography } from '@material-ui/core';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

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
          <Map
            scrollWheelZoom={false}
            touchZoom={false}
            style={{ height: '250px' }}
          >
            <TileLayer
              //attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
          </Map>
        </div>
      </CompanionWindow>
    );
  }
}
