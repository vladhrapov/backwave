import React from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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

// Actions
import * as DrawerActions from "../../actions/DrawerActions";
import * as CanvasActions from "../../actions/CanvasActions";

// Services
import CanvasService from "../../services/CanvasService";


function mapStateToProps(state, ownProps) {
  return {
    drawer: state.drawer,
    canvas: state.canvas
  };
}

function mapDispatchToProps(dispatch) {
  return {
    drawerActions: bindActionCreators(DrawerActions, dispatch),
    canvasActions: bindActionCreators(CanvasActions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class LeftDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  handleToggle = () => {
    let { drawer, drawerActions } = this.props,
        isDrawerOpened = !drawer.isDrawerOpened;

    drawerActions.toggleDrawer({ isDrawerOpened });
  }

  navigateTo = (location) => {
    let { drawer, drawerActions, canvasInfo, canvasActions } = this.props;

    drawerActions.toggleDrawer({ isDrawerOpened: false });
    if(location == "/charts/") {
      canvasActions.saveCanvasReportInfo({
        routes: ["A1 -A2-A3....", "A1 - A5 - A7....."],
        image: CanvasService.getCanvas().toDataURL("image/png")
      });
    }
    else if (location == "/reports/") {
      canvasActions.saveCanvasReportInfo({
        routes: ["A1 -A2-A3....", "A1 - A5 - A7....."],
        image: CanvasService.getCanvas().toDataURL("image/png")
      });
    }
    browserHistory.push(location);
  }

  render() {
    return (
      <Drawer
        open={this.props.drawer.isDrawerOpened}
        docked={false}
        onRequestChange={this.handleToggle}
        width={370}>
        <AppBar
          title="Title"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          onLeftIconButtonTouchTap={this.handleToggle}/>
        <MenuItem
          onClick={() => this.navigateTo("/")}
        >
          Home
        </MenuItem>
        <MenuItem
          onClick={() => this.navigateTo("/charts/")}
        >
          Charts
        </MenuItem>
        <MenuItem
          onClick={() => this.navigateTo("/reports/")}
        >
          Reports
        </MenuItem>
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
  }
}
