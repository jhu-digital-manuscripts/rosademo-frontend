import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

// This dialog will show all locations in one large mapo
export default function MapDialogAll(props) {
  const { onClose, open, locations } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={open}
      maxWidth='lg'
      fullWidth={true}
    >
      <DialogTitle id='simple-dialog-title'>Locations</DialogTitle>
      <DialogContent>
        <Map
          scrollWheelZoom={false}
          center={Object.values(locations)[0]?.coords}
          zoom={8}
          touchZoom={false}
          style={{ height: '750px' }}
        >
          <TileLayer
            //attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {Object.values(locations)
            .filter((location) => location.coords !== undefined)
            .map((element) => {
              return (
                <Marker position={element.coords} key={element.annotationId}>
                  <Popup autoPan={true}>{element.title}</Popup>
                </Marker>
              );
            })}
        </Map>
      </DialogContent>
    </Dialog>
  );
}

MapDialogAll.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
