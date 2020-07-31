import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CompanionWindow from 'mirador/dist/es/src/containers/CompanionWindow';
import ns from 'mirador/dist/es/src/config/css-ns';
import SanitizedHtml from 'mirador/dist/es/src/containers/SanitizedHtml';
import { Button, Typography } from '@material-ui/core';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import MapDialogAll from './map-dialog-all';
import MapDialogSingle from './map-dialog-single';

function getGeorefMapData(annotation) {
  const body = annotation.body.filter((body) => body.purpose === 'identifying');
  let georefUrl;
  if (body[0]?.source?.includes('pleiades')) {
    georefUrl = body[0]?.source + '/json';
    return fetch(georefUrl, { method: 'GET' })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        return {
          pleiadesId: data.url,
          annotationId: annotation.id,
          coords: data.reprPoint?.reverse(),
          features: data.features,
          title: data.title,
          details: data.details,
          names: data.names,
        };
      })
      .catch((error) => {
        console.log('Error fetching map data', error);
      });
  }

  return {
    annotationId: annotation.id,
  };
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
  const [openAll, setOpenAll] = useState(false);
  const [openSingle, setOpenSingle] = useState(false);
  const [locations, setLocations] = useState({});
  const [locationForSingleDialog, setSingleLocation] = useState({});
  const [pending, setPending] = useState(false);

  const handleOpenAll = () => {
    setOpenAll(true);
  };

  const handleCloseAll = () => {
    setOpenAll(false);
  };

  const handleOpenSingle = (loc) => {
    setOpenSingle(true);
    setSingleLocation(loc);
  };

  const handleCloseSingle = () => {
    setOpenSingle(false);
  };

  const {
    annotations,
    selectedAnnotation,
    selectGeorefAnnotation,
    windowId,
    id,
  } = props;

  // console.log('locations: ', locations);

  useEffect(() => {
    if (pending) {
      return;
    }

    // console.log('Annotations resolved: ', annotations.filter(annotation => locations[annotation.id]));
    // console.log('Annotations NOT resolved: ', annotations.filter(annotation => !locations[annotation.id]));
    Promise.all(
      annotations
        .filter((annotation) => !locations[annotation.id])
        .map(async (annotation) => {
          if (!locations[annotation.id]) {
            return getGeorefMapData(annotation);
          }
        })
    ).then((data) => {
      // console.log('Pleiades data: ', data);
      const mapData = {};
      data
        .filter((result) => !!result)
        .forEach((pleiadesData) =>
          Object.assign(mapData, {
            [pleiadesData.annotationId]: pleiadesData,
          })
        );

      setPending(false);
      setLocations(Object.assign({}, locations, mapData));
    });

    setPending(true);
  }, [annotations]);

  return (
    <CompanionWindow
      title='Locations'
      paperClassName={ns('window-sidebar-map-panel')}
      windowId={windowId}
      id={id}
    >
      {annotations.length > 0 ? (
        <div>
          <Map
            scrollWheelZoom={false}
            center={Object.values(locations)[0]?.coords}
            zoom={6}
            touchZoom={false}
            style={{ height: '250px' }}
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
              onClick={handleOpenAll}
            >
              Enlarge Map
            </Button>
            <MapDialogAll
              open={openAll}
              onClose={handleCloseAll}
              locations={locations}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div style={{ padding: '8px' }}>
        <Typography>{Object.values(locations).length} locations:</Typography>
      </div>
      <div style={{ padding: '8px' }}>
        {Object.values(locations)
          .filter((loc) => loc.details !== undefined)
          .map((location) => {
            {
              /* console.log(location); */
            }
            return (
              <div
                key={location.annotationId}
                id='location'
                onClick={() => handleOpenSingle(location)}
              >
                <div
                  style={{
                    fontStyle: 'italic',
                    fontSize: '18px',
                    marginTop: '16px',
                  }}
                >
                  <Typography>{location.title}</Typography>
                </div>
                <div id='locationDetailsContent'>
                  <Typography component='span' variant='subtitle2'>
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
              </div>
            );
          })}
      </div>
      <MapDialogSingle
        open={openSingle}
        onClose={handleCloseSingle}
        location={locationForSingleDialog}
      />
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
