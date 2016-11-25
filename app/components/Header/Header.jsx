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


import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as DrawerActions from "../../actions/DrawerActions";
import * as DialogActions from "../../actions/DialogActions";
import * as CanvasActions from "../../actions/CanvasActions";

import CanvasService from "../../services/CanvasService";


class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  handleToggle = () => {
    let { drawer, drawerActions } = this.props,
        isDrawerOpened = !drawer.isDrawerOpened;

    drawerActions.toggleDrawer({ isDrawerOpened });
  }

  handleRefreshClick = (event) => {
    CanvasService.refreshCanvas();
  }

  handleLoadClick = (event) => {
    let { dialog, dialogActions, canvasActions, firebaseRef } = this.props,
        isDialogOpened = !dialog.isDialogOpened;
    // this.setState({ dialogType: "load"});
    // this.dialogType = "load";
    let dialogType = "load";
    // this.setState({ dialogOpened: true });
    canvasActions.loadCanvasList(firebaseRef);
    dialogActions.toggleDialog({ isDialogOpened, dialogType });
    // let canvasList = CanvasService
    //   .loadCanvasList(this.firebaseRef)
    //   .then((array) => {
    //     console.log(array);
    //     this.setState({radiosCollection: array});
    //   });

  }

  handleSaveClick = (event) => {
    let { dialog, dialogActions, canvasActions } = this.props,
        isDialogOpened = !dialog.isDialogOpened;
    // this.setState({ dialogType: "save"});
    // this.dialogType = "save";
    let dialogType = "save";
    // this.setState({ dialogOpened: true });
    dialogActions.toggleDialog({ isDialogOpened, dialogType });
  }

  handleRemoveClick = (event) => {
    let { dialog, dialogActions, canvasActions, firebaseRef } = this.props,
        isDialogOpened = !dialog.isDialogOpened;

    // this.dialogType = "remove";
    let dialogType = "remove";
    // this.setState({ dialogOpened: true });
    canvasActions.loadCanvasList(firebaseRef);
    dialogActions.toggleDialog({ isDialogOpened, dialogType });

    // let canvasList = CanvasService
    //   .loadCanvasList(this.firebaseRef)
    //   .then((array) => {
    //     console.log(array);
    //     this.setState({radiosCollection: array});
    //   });
  }

  render() {
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

function mapStateToProps(state, ownProps) {
  return {
    drawer: state.drawer,
    dialog: state.dialog,
    canvas: state.canvasList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(CourseActions.createCourse(course))
    drawerActions: bindActionCreators(DrawerActions, dispatch),
    dialogActions: bindActionCreators(DialogActions, dispatch),
    canvasActions: bindActionCreators(CanvasActions, dispatch)
  }
}

// Courses.propTypes = {
//   //dispatch: PropTypes.func.isRequired,
//   // createCourse: PropTypes.func.isRequired,
//   // actions: PropTypes.object.isRequired,
//   courses: PropTypes.array.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
