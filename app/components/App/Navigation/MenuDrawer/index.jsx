import React from "react";
import AppBar from 'material-ui/AppBar';
import Checkbox from 'material-ui/Checkbox';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

import { MenuLinks } from "./constants";


const renderMenu = ({ navigateTo }) => {
  return MenuLinks.map((link, index) => {
    return (
      <MenuItem
        key={index}
        onClick={() => navigateTo(link.href)}
      >
        {link.name}
      </MenuItem>
    );
  });
};

export default function MenuDrawer({ 
  navigateTo,
  onToggle,
  settings,
  ...props
}) {

  return (
    <Drawer
      open={settings.isDrawerOpened}
      docked={false}
      onRequestChange={onToggle}
      width={370}>
      <AppBar
        title="Title"
        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
        onLeftIconButtonTouchTap={onToggle} />

      {renderMenu({ navigateTo })}

      <MenuItem
        primaryText="Case Tools"
        rightIcon={<ArrowDropRight />}
        menuItems={[
          <MenuItem primaryText="UPPERCASE" />,
          <MenuItem primaryText="lowercase" />,
          <MenuItem primaryText="CamelCase" />,
          <MenuItem primaryText="Propercase" />,
        ]} />
      <Divider />
      <Checkbox
        label="Simple"
        className="checkbox"
      />
      <Checkbox
        checkedIcon={<Visibility />}
        uncheckedIcon={<VisibilityOff />}
        label="Custom icon of different shapes"
        className="checkbox"
      />
      <Checkbox
        label="Label on the left"
        labelPosition="left"
        className="checkbox"
      />
      <Divider />
      <p>Some text</p>
      <p>Some text</p>
      <Divider />
      <Toggle
        label="Simple"
        className="toggle"
      />
      <Toggle
        label="Toggled by default"
        defaultToggled={true}
        className="toggle"
      />
    </Drawer>
  );
};