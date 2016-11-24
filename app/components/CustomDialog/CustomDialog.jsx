import React from "react";

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';


import CanvasService from "../../services/CanvasService";
import SettingsService from "../../services/SettingsService";

let styles = {};

export default class CustomDialog extends React.Component {
  constructor(props) {
    super(props);
    // this.settingsService = new SettingsService();
  }

  state = {
    selectedRadio: null,
    canvasName: "",
    errorMessage: "",
    dialogOpened: false
  }

  handleCheckRadio = (event) => {
    //console.log("val: ", event.target.value);
    this.setState({selectedRadio: event.target.value});
  }

  handleCanvasNameInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({ canvasName: event.target.value });
  }

  handleLoadCollectionDialogSubmit = (event) => {
    console.log("submit");

    //ToDo: uncomment these
    CanvasService.loadCanvas(this.state.selectedRadio, this.props.firebaseRef);
    this.props.settingsService.disableConnectionMode();
    this.props.settingsService.enableMigrationMode();
    this.setState({ dialogOpened: false });
  }

  handleRemoveCollectionDialogSubmit = () => {
    CanvasService.removeCanvas(this.state.selectedRadio, this.props.firebaseRef);
    this.props.settingsService.disableConnectionMode();
    this.props.settingsService.enableMigrationMode();
    this.setState({ dialogOpened: false });
  }

  handleSaveCollectionDialogSubmit = () => {
    if (this.state.canvasName) {
      CanvasService.saveCanvas(this.state.canvasName, this.props.firebaseRef);
      this.setState({ errorMessage: "" });
      this.setState({ dialogOpened: false });
    }
    else {
      this.setState({ errorMessage: "This field is required" });
    }
  }

  handleDialogClose = (event) => {
    this.setState({ dialogOpened: false});
    this.setState({ errorMessage: "" });
    this.setState({ canvasName: "" });
  }



  renderDialogControls = (handler, submitText) => {
    return [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleDialogClose}
      />,
      <FlatButton
        label={submitText}
        primary={true}
        keyboardFocused={true}
        onTouchTap={handler}
      />,
    ];
  }

  renderLoadOrRemoveDialogBody = () => {
    let { radiosCollection } = this.props,
        radios;

    if (radiosCollection) {
      radios = radiosCollection.map((item, index) => {
        return (
          <RadioButton
            key={index}
            value={item.key}
            label={item.name}
            style={styles.radioButton}
            onClick={this.handleCheckRadio}
          />
        );
      });
    }

    return (
      <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
        {radios}
      </RadioButtonGroup>
    );
  }

  renderSaveDialogBody = () => {
    return (
      <TextField
        hintText="Hint Text"
        floatingLabelText="Floating Label Text"
        defaultValue={this.state.canvasName}
        errorText={this.state.errorMessage}
        onChange={this.handleCanvasNameInputChange}
      />
    );
  }

  renderDialogByType = () => {
    let dialogBody, dialogControls;
    console.log(this.props);

    if (this.props.dialogType) {
      switch (this.props.dialogType) {
        case "load":
          dialogBody = this.renderLoadOrRemoveDialogBody();
          dialogControls = this.renderDialogControls(this.handleLoadCollectionDialogSubmit, "Submit");
        break;
        case "save":
          dialogBody = this.renderSaveDialogBody();
          dialogControls = this.renderDialogControls(this.handleSaveCollectionDialogSubmit, "Save");
        break;
        case "remove":
          dialogBody = this.renderLoadOrRemoveDialogBody();
          dialogControls = this.renderDialogControls(this.handleRemoveCollectionDialogSubmit, "Submit");
          break;
        case "line":

        break;
        default:
        throw new Error("Not supported type of dialog");
        break;
      }

    }

    return (
      <Dialog
        title="Scrollable Dialog"
        actions={dialogControls || null}
        modal={false}
        open={this.state.dialogOpened || this.props.dialogOpened}
        onRequestClose={this.handleDialogClose}
        autoScrollBodyContent={true}
      >
        {dialogBody || null}
      </Dialog>
    );
  }

  render() {
    return (
      this.renderDialogByType()
    );
  }
}
