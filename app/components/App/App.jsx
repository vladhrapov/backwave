import React from 'react';
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
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Canvas from "../Canvas/Canvas.jsx";

import "./assets/_styles.scss";
import "../Shared/assets/_reset-default.scss";

let styles = {};

export default class DrawerSimpleExample extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    open: false
  }

  handleToggle = () => {
    this.setState({open: !this.state.open});
  }

  handleRequestChange = (open) => {
    this.setState({open});
  }

  renderHeader = () => {
    return (
      <AppBar
        title="Title"
        iconElementRight={
          <IconMenu

            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
          <MenuItem primaryText="Refresh" />
          <MenuItem primaryText="Help" />
          <MenuItem primaryText="Sign out" />
        </IconMenu>
        }
        onLeftIconButtonTouchTap={this.handleToggle}/>
    );
  }

  renderLeftMenu = () => {
    return (
      <Drawer
        open={this.state.open}
        docked={false}
        onRequestChange={this.handleRequestChange}
        width={350}>
        <AppBar
          title="Title"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          onLeftIconButtonTouchTap={this.handleToggle}/>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem
          primaryText="Case Tools"
          rightIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem primaryText="UPPERCASE" />,
            <MenuItem primaryText="lowercase" />,
            <MenuItem primaryText="CamelCase" />,
            <MenuItem primaryText="Propercase" />,
          ]}/>
        <Divider />
        <Checkbox
          label="Simple"
          className="checkbox"
          style={styles.checkbox}
          />
        <Checkbox
          checkedIcon={<Visibility />}
          uncheckedIcon={<VisibilityOff />}
          label="Custom icon of different shapes"
          className="checkbox"
          style={styles.checkbox}
          />
        <Checkbox
          label="Label on the left"
          labelPosition="left"
          className="checkbox"
          style={styles.checkbox}
          />
        <Divider />
        <p>Some text</p>
        <p>Some text</p>
        <Divider />
        <Toggle
          label="Simple"
          className="toggle"
          style={styles.toggle}/>
        <Toggle
          label="Toggled by default"
          defaultToggled={true}
          className="toggle"
          style={styles.toggle}/>
      </Drawer>
    );
  }

  render() {
        // console.log(styles);
    return (
      <div>
        {this.renderHeader()}
        <Canvas />
        {this.renderLeftMenu()}
      </div>
    );
  }
}

// iconElementLeft={<IconButton><NavigationClose /></IconButton>}
