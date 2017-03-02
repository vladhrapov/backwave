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
import * as DrawerActions from "../../actions/DrawerActions";
import * as DialogActions from "../../actions/DialogActions";
import * as CanvasActions from "../../actions/CanvasActions";

// Services
import CanvasService from "../../services/CanvasService";

import { store } from "../../store/Store";


function mapStateToProps(state, ownProps) {
  return {
    drawer: state.drawer,
    dialog: state.dialog,
    canvas: state.canvas
  };
}

function mapDispatchToProps(dispatch) {
  return {
    drawerActions: bindActionCreators(DrawerActions, dispatch),
    dialogActions: bindActionCreators(DialogActions, dispatch),
    canvasActions: bindActionCreators(CanvasActions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  handleToggle = () => {
    let { drawer, drawerActions } = this.props,
        isDrawerOpened = !drawer.isDrawerOpened;

    drawerActions.toggleDrawer({ isDrawerOpened });
  }

  handleRefreshClick = (event) => {
    let { dialog, dialogActions, canvasActions, firebaseRef } = this.props;
    // CanvasService.refreshCanvas();
    canvasActions.loadCanvasList();
    console.log("Props in refresh: ", this.props);
  }

  handleLoadClick = (event) => {
    let { dialog, dialogActions, canvasActions, firebaseRef } = this.props,
        isDialogOpened = !dialog.isDialogOpened;

    canvasActions.loadCanvasList(firebaseRef);
    dialogActions.toggleDialog({ isDialogOpened, dialogType: "load" });
  }

  handleSaveClick = (event) => {
    let { dialog, dialogActions, canvasActions } = this.props,
        isDialogOpened = !dialog.isDialogOpened;

    dialogActions.toggleDialog({ isDialogOpened, dialogType: "save" });
  }

  handleRemoveClick = (event) => {
    let { dialog, dialogActions, canvasActions, firebaseRef } = this.props,
        isDialogOpened = !dialog.isDialogOpened;

    canvasActions.loadCanvasList(firebaseRef);
    dialogActions.toggleDialog({ isDialogOpened, dialogType: "remove" });
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
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
          <MenuItem primaryText="Refresh" onClick={this.handleRefreshClick} />
          <MenuItem primaryText="Load" onClick={this.handleLoadClick} />
          <MenuItem primaryText="Save" onClick={this.handleSaveClick} />
          <MenuItem primaryText="Remove" onClick={this.handleRemoveClick}/>
        </IconMenu>
        }
        onLeftIconButtonTouchTap={this.handleToggle}/>
    );
  }
}
