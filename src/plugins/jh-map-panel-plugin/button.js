import React from 'react';
import Icon from '@mdi/react';
import { mdiMapMarkerMultiple } from '@mdi/js';

const MapSidebarButton = () => (
  <Icon path={mdiMapMarkerMultiple} size={1}></Icon>
);
MapSidebarButton.value = 'JH_MAP_PANEL';

export default {
  target: 'WindowSideBarButtons',
  mode: 'add',
  component: MapSidebarButton,
};
