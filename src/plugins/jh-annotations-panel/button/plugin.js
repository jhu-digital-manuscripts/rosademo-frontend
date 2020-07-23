import React from 'react';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const CustomButton = () => <MenuBookIcon />;
CustomButton.value = 'JH_ANNO_PANEL';

export default {
  target: 'WindowSideBarButtons',
  mode: 'add',
  component: CustomButton,
};
