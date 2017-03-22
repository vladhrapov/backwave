import React from 'react';
import ReactFire from "reactfire";
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Actions
import * as CanvasActions from "../../actions/CanvasActions";

// // Components
// import CustomDialog from "../CustomDialog/CustomDialog.jsx";
// import LeftDrawer from "../LeftDrawer/LeftDrawer.jsx";
// import Header from "../Header/Header.jsx";

// // Services
// import FirebaseService from "../../services/FirebaseService";


function mapStateToProps(state, ownProps) {
  return {
    canvas: state.canvas
  };
}

function mapDispatchToProps(dispatch) {
  return {
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
        // />