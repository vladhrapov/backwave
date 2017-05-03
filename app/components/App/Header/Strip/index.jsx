import React from "react";
import AppBar from 'material-ui/AppBar';
import Checkbox from 'material-ui/Checkbox';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { MenuItems } from "./constants";


const renderIconButton = () => {
  return (
    <IconButton>
      <MoreVertIcon />
    </IconButton>
  );
};

const renderMenuItems = ({ handleMenuItemClick }) => {
  return MenuItems.map((item, index) => {
    let { primaryText, dialogType, needsReload } = item;

    return (
      <MenuItem
        key={index}
        primaryText={primaryText} 
        onClick={(e) => handleMenuItemClick(e, dialogType, needsReload)}
      />
    );
  });
};

const renderIconMenu = ({ handleMenuItemClick }) => {
  return (
    <IconMenu
      iconButtonElement={renderIconButton()}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      {renderMenuItems({ handleMenuItemClick })}
    </IconMenu>
  );
};

export default function Strip({
  handleMenuItemClick,
  onToggle,
  ...props
}) {

  return (
    <AppBar
      showMenuIconButton={true}
      title="Title"
      iconElementRight={renderIconMenu({ handleMenuItemClick })}
      onLeftIconButtonTouchTap={onToggle}
    />
  );
}