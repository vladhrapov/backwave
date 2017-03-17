import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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

// Actions
import * as CanvasActions from "../../../actions/CanvasActions";
import * as SettingsActions from "../../../actions/SettingsActions";

// Services
import CanvasService, { refreshCanvas } from "../../../services/CanvasService";

import { store } from "../../../store/Store";


function mapStateToProps(state, ownProps) {
  return {
    canvas: state.canvas,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    canvasActions: bindActionCreators(CanvasActions, dispatch),
    settingsActions: bindActionCreators(SettingsActions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  handleToggle = () => {
    let { settings, settingsActions } = this.props,
      isDrawerOpened = !settings.isDrawerOpened;

    settingsActions.toggleDrawer({ isDrawerOpened });
  }

  handleRefreshClick = (event) => {
    let { dialog, dialogActions, canvasActions, firebaseRef } = this.props;
    refreshCanvas();
  }

  handleLoadClick = (event) => {
    let { settings, settingsActions, canvasActions, firebaseRef } = this.props,
      isDialogOpened = !settings.isDialogOpened;

    canvasActions.loadCanvasList();
    // canvasActions.loadCanvasList(firebaseRef);
    settingsActions.toggleDialog({ isDialogOpened, dialogType: "load" });
  }

  handleSaveClick = (event) => {
    let { settings, settingsActions, canvasActions } = this.props,
      isDialogOpened = !settings.isDialogOpened;

    settingsActions.toggleDialog({ isDialogOpened, dialogType: "save" });
  }

  handleRemoveClick = (event) => {
    let { settings, settingsActions, canvasActions, firebaseRef } = this.props,
      isDialogOpened = !settings.isDialogOpened;

    canvasActions.loadCanvasList(firebaseRef);
    settingsActions.toggleDialog({ isDialogOpened, dialogType: "remove" });
  }

  render() {
    return (
      <AppBar
        showMenuIconButton={true}
        title="Title"
        iconElementRight={
          <IconMenu

            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem primaryText="Refresh" onClick={this.handleRefreshClick} />
            <MenuItem primaryText="Load" onClick={this.handleLoadClick} />
            <MenuItem primaryText="Save" onClick={this.handleSaveClick} />
            <MenuItem primaryText="Remove" onClick={this.handleRemoveClick} />
          </IconMenu>
        }
        onLeftIconButtonTouchTap={this.handleToggle} />
    );
  }
}
