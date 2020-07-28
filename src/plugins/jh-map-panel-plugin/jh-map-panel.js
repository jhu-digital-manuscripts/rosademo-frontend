import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import ns from 'mirador/dist/es/src/config/css-ns';
import { Button, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { property } from 'lodash';

function MapDialog(props) {
  const { onClose, open } = props;

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
          touchZoom={false}
          style={{ height: '750px' }}
        >
          <TileLayer
            //attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
        </Map>
      </DialogContent>
    </Dialog>
  );
}

MapDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

function getGeorefMapData(annotation) {
  const body = annotation.body.filter((body) => body.purpose === 'identifying');
  let georefUrl;
  if (body[0]?.source?.includes('pleiades')) {
    georefUrl = body[0]?.source + '/json';
    return fetch(georefUrl, { method: 'GET' })
      .then((result) => result.json())
      .then((data) => {
        return {
          coords: data.reprPoint?.reverse(),
          features: data.features,
          title: data.title,
          details: data.details,
        };
      })
      .catch((error) => {
        console.log('Error fetching map data', error);
      });
  }
}

/**
 * - annotations: (array) a list of annotation JSON objects
 * - selectedAnnotation: (string) ID of a georeference annotation that has been selected
 *      by the user to be highlighted on the map
 * - selectGeorefAnnotation: (function) an action that can be invoked if a user selects a
 *      georeference annotation from this component to be highlighted on the map
 *      Takes one string argument, the ID of the selected annotation
 *      Can be called with zero arguments to "deselect" the currently selected annotation
 *
 * @param {object} props
 */
export default function JHMapPanel(props) {
  const [open, setOpen] = React.useState(false);
  const [locations, setLocations] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    annotations,
    selectedAnnotation,
    selectGeorefAnnotation,
    windowId,
    id,
  } = props;

  annotations.forEach(async (annotation) => {
    if (!locations[annotation.id]) {
      const locationData = await getGeorefMapData(annotation);
      setLocations({
        ...locations,
        [annotation.id]: locationData,
      });
      debugger;
    }
    //return locationData;
  });

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
      <div
        id='mapPanelExpandButton'
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '8px',
        }}
      >
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={handleClickOpen}
        >
          Enlarge Map
        </Button>
        <MapDialog open={open} onClose={handleClose} />
      </div>
    </CompanionWindow>
  );
}

JHMapPanel.propTypes = {
  annotations: PropTypes.array.isRequired,
  selectedAnnotation: PropTypes.string,
  selectGeorefAnnotation: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
