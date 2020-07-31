import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

// This dialog will show one location with details
export default function MapDialogSingle(props) {
  const { onClose, open, location } = props;

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
      <DialogTitle id='simple-dialog-title'>{location.title}</DialogTitle>
      <DialogContent>
        <Map
          scrollWheelZoom={false}
          center={location.coords}
          zoom={8}
          touchZoom={false}
          style={{ height: '750px' }}
        >
          <TileLayer
            //attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={location.coords}>
            <Popup autoPan={true}>{location.title}</Popup>
          </Marker>
        </Map>
      </DialogContent>
    </Dialog>
  );
}

MapDialogSingle.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};
