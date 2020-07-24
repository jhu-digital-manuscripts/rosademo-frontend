import React from 'react';
import MapIcon from '@material-ui/icons/Map';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';

const MapSidebarButton = () => <MapIcon />;
MapSidebarButton.value = 'JH_MAP_PANEL';

export default {
  target: 'WindowSideBarButtons',
  mode: 'add',
  component: MapSidebarButton,
};
