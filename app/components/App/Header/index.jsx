import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose, withHandlers } from 'recompose'
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

import Strip from "./Strip";

// Actions
import * as CanvasActions from "../../../actions/CanvasActions";
import * as SettingsActions from "../../../actions/SettingsActions";


@connect(
  ({ canvas, settings }) => ({ canvas, settings }),
  (dispatch) => ({
    canvasActions: bindActionCreators(CanvasActions, dispatch),
    settingsActions: bindActionCreators(SettingsActions, dispatch)
  })
)
export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMenuItemClick = (event, dialogType, needsReload) => {
    const { settings, settingsActions, canvasActions, canvasSrv } = this.props;
    const isDialogOpened = !settings.isDialogOpened;

    if (!dialogType) {
      canvasSrv.refreshCanvas();
      return;
    }

    if (needsReload) {
      canvasActions.loadCanvasList();
    }

    settingsActions.toggleDialog({ isDialogOpened, dialogType });
  }

  render() {
    return (
      <Strip
        {...this.props}
        handleMenuItemClick={this.handleMenuItemClick}
      />
    );
  }
}
