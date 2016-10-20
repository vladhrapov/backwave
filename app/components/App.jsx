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

import "./Shared/assets/_reset-default.scss";

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    margin: 15,
    width: "97%"
  },
  checkboxLeft: {
    marginLeft: 5
  },
  block: {
    maxWidth: 250,
  },
  toggle: {
    margin: 15,
    width: "92%"
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  }
};


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
    this.setState({open})
  }

  render() {
    return (
      <div>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onTouchTap={this.handleToggle}
        />
      <Drawer
        open={this.state.open}
        docked={false}
        onRequestChange={this.handleRequestChange}
        width={350}>
          <AppBar
            title="Title"
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            onTouchTap={this.handleToggle}
          />
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
            ]}
          />
          <Divider />
          <Checkbox
            label="Simple"
            style={styles.checkbox}
          />
          <Checkbox
            checkedIcon={<Visibility />}
            uncheckedIcon={<VisibilityOff />}
            label="Custom icon of different shapes"
            style={styles.checkbox}
          />
          <Checkbox
            label="Label on the left"
            labelPosition="left"
            style={styles.checkbox}
          />
          <Divider />
          <p>Some text</p>
          <p>Some text</p>
          <Divider />
          <Toggle
            label="Simple"
            style={styles.toggle}
          />
          <Toggle
            label="Toggled by default"
            defaultToggled={true}
            style={styles.toggle}
          />
        </Drawer>
      </div>
    );
  }
}

// iconElementLeft={<IconButton><NavigationClose /></IconButton>}
