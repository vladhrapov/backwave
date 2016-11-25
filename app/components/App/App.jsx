import React from 'react';

import ReactFire from "reactfire";

import ReactMixin from "react-mixin";


// import FlatButton from 'material-ui/FlatButton';
// import Dialog from 'material-ui/Dialog';
// import TextField from 'material-ui/TextField';
// import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Canvas from "../Canvas/Canvas.jsx";
import CustomDialog from "../CustomDialog/CustomDialog.jsx";
import LeftDrawer from "../LeftDrawer/LeftDrawer.jsx";
import Header from "../Header/Header.jsx";

import FirebaseService from "../../services/FirebaseService";
import CanvasService from "../../services/CanvasService";
import SettingsService from "../../services/SettingsService";

import "./assets/_styles.scss";
import "../Shared/assets/_reset-default.scss";

let styles = {};
const ROOT_URL = "https://diploma-dd819.firebaseio.com/";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.firebaseService = new FirebaseService();
    this.settingsService = new SettingsService();
  }

  state = {
    // open: false,
    // dialogOpened: false,
    // radiosCollection: []
  }





  componentWillMount() {
    this.firebaseRef = this.props.firebase.database();
    this.bindAsArray(this.firebaseRef.ref("canvasCollection"), "canvasCollection");

    // console.log(this.firebaseRef.val());
    //this.firebaseRef.on('value', this.handleDataLoaded.bind(this));
    // this.fb = new Firebase(ROOT_URL + "items/");
    // bindAsObject is a method from ReactFire that sets: this.state.items = {...}
    // this.bindAsObject(this.fb, "items");
    // this.fb.on('value', this.handleDataLoaded.bind(this));
  }




  //
  //
  // renderHeader = () => {
  //
  // }
  //
  // renderLeftMenu = () => {
  //
  // }

  render() {
        // console.log(styles);
    return (
      <div>
        <Header
          handleRefreshClick={this.handleRefreshClick}
          handleLoadClick={this.handleLoadClick}
          handleSaveClick={this.handleSaveClick}
          handleRemoveClick={this.handleRemoveClick}
          firebaseRef={this.firebaseRef}
        />
        <Canvas />
        <LeftDrawer
        />
        <CustomDialog
          firebaseRef={this.firebaseRef}
          settingsService={this.settingsService}
        />
      </div>
      // handleDialogClose={this.handleDialogClose}

      // dialogType={this.dialogType}
      // dialogOpened={this.state.dialogOpened}
      // radiosCollection={this.state.radiosCollection}

      // open={this.state.open}
      // {this.renderHeader()}
      // {this.renderLeftMenu()}
      // errorMessage={this.state.errorMessage}
      // handleLoadCollectionDialogSubmit={this.handleLoadCollectionDialogSubmit}
      // handleRemoveCollectionDialogSubmit={this.handleRemoveCollectionDialogSubmit}
      // handleSaveCollectionDialogSubmit={this.handleSaveCollectionDialogSubmit}
      // {this.renderDialogByType()}
    );
  }
}

ReactMixin(App.prototype, ReactFire);

export default App;

// iconElementLeft={<IconButton><NavigationClose /></IconButton>}
