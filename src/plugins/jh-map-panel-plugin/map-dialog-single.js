import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from '@material-ui/core';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';

// This dialog will show one location with details
export default function MapDialogSingle(props) {
  const { onClose, open, location } = props;

  const handleClose = () => {
    onClose();
  };

  console.log(location);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={open}
      maxWidth='lg'
      fullWidth={true}
    >
      <DialogTitle id='simple-dialog-title'>
        <div style={{ fontSize: '20px' }}>{location.title}</div>
      </DialogTitle>
      <DialogContent style={{ display: 'flex', flexDirection: 'row' }}>
        <Map
          scrollWheelZoom={false}
          center={location.coords}
          zoom={8}
          touchZoom={false}
          style={{ height: '750px', width: '75%' }}
        >
          <TileLayer
            //attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={location.coords}>
            <Popup autoPan={true}>{location.title}</Popup>
          </Marker>
        </Map>
        <div
          style={{ width: '25%', paddingLeft: '16px', paddingRight: '16px' }}
        >
          <div id='dialogLocationDetails'>
            <Typography variant='subtitle2'>
              <span>Description: </span>
            </Typography>
            <Typography>
              <SanitizedHtml
                ruleSet='mirador2'
                htmlString={location.details}
                className='transcription'
              />
            </Typography>
          </div>
          <div style={{ marginTop: '16px' }}>
            <Typography variant='subtitle2'>
              <span>Names: </span>
            </Typography>
            {location.names?.map((name) => (
              <Typography>
                <div key={location.pleiadesId}>{name.attested}</div>
              </Typography>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

MapDialogSingle.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};
