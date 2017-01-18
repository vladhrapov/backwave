import React from 'react';
import ReactFire from "reactfire";
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import * as DrawerActions from "../../actions/DrawerActions";
import * as CanvasActions from "../../actions/CanvasActions";

// // Components
// import CustomDialog from "../CustomDialog/CustomDialog.jsx";
// import LeftDrawer from "../LeftDrawer/LeftDrawer.jsx";
// import Header from "../Header/Header.jsx";

// // Services
// import FirebaseService from "../../services/FirebaseService";
// import CanvasService from "../../services/CanvasService";
// import SettingsService from "../../services/SettingsService";


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
export default class Reports extends React.Component {
  constructor(props) {
    super(props);
  }

  showReportInfo = () => {
    return JSON.stringify(this.props.canvas);
  }

  render() {
    return (
      <div>
        This is Reports
        {this.showReportInfo()}
      </div>
    );
  }
}
        // <Header
        //   handleRefreshClick={this.handleRefreshClick}
        //   handleLoadClick={this.handleLoadClick}
        //   handleSaveClick={this.handleSaveClick}
        //   handleRemoveClick={this.handleRemoveClick}
        //   firebaseRef={this.firebaseRef}
        // />

        // <CustomDialog
        //   firebaseRef={this.firebaseRef}
        //   settingsService={this.settingsService}
        // />