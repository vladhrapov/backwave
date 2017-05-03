import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

// Actions
import * as CanvasActions from "../../../actions/CanvasActions";
import * as SettingsActions from "../../../actions/SettingsActions";

// Services
import FirebaseService from "../../../services/FirebaseService";

// Styles
import "../../Shared/assets/_styles.scss";


@connect(
  ({ canvas, settings }) => ({ canvas, settings }),
  (dispatch) => ({
    canvasActions: bindActionCreators(CanvasActions, dispatch),
    settingsActions: bindActionCreators(SettingsActions, dispatch)
  })
)
export default class CustomDialog extends Component {
  constructor(props) {
    super(props);
    this.firebaseService = new FirebaseService();
  }

  state = {
    selectedRadio: null,
    canvasName: "",
    errorMessage: ""
  }

  handleCheckRadio = (event) => {
    this.setState({ selectedRadio: event.target.value });
  }

  handleInputChange = (event) => {
    let { dialogType } = this.props.settings;

    if (dialogType == "label") {
      this.setState({ lineWeight: event.target.value });
    }
    else if (dialogType == "save") {
      this.setState({ canvasName: event.target.value });
    }
  }

  handleLoadCollectionDialogSubmit = (event) => {
    let { canvas, canvasActions, settingsActions, settings, canvasSrv } = this.props,
      { selectedRadio } = this.state,
      isDialogOpened = !settings.isDialogOpened,
      dialogType = settings.dialogType;

    canvasSrv.restoreCanvas(canvas.filter(item => item.key == selectedRadio)[0].canvasObjects);
    canvasSrv.disableConnectionMode(canvasSrv.canvas);
    canvasSrv.enableMigrationMode(canvasSrv.canvas);

    settingsActions.toggleDialog({
      isDialogOpened,
      dialogType,
      canvasLoadedSchema: selectedRadio
    });
  }

  handleRemoveCollectionDialogSubmit = () => {
    let { canvas, canvasActions, settings, settingsActions, canvasSrv } = this.props,
      isDialogOpened = !settings.isDialogOpened,
      dialogType = settings.dialogType;

    canvasActions.removeCanvasFromList({ name: this.state.selectedRadio });
    canvasSrv.disableConnectionMode(canvasSrv.canvas);
    canvasSrv.enableMigrationMode(canvasSrv.canvas);

    settingsActions.toggleDialog({ isDialogOpened, dialogType });
  }

  handleSaveCollectionDialogSubmit = () => {
    let { canvas, canvasActions, settings, settingsActions, canvasSrv } = this.props,
      isDialogOpened = !settings.isDialogOpened,
      dialogType = settings.dialogType;

    if (this.state.canvasName) {
      let canvasObjects = this.firebaseService.getSerializedCanvasObjectsCollection(canvasSrv.canvas);

      canvasActions.saveCanvasToList({ name: this.state.canvasName, canvasObjects: canvasObjects });
      this.setState({ errorMessage: "" });
      this.setState({ canvasName: "" });
      settingsActions.toggleDialog({ isDialogOpened, dialogType });
    }
    else {
      this.setState({ errorMessage: "This field is required" });
    }
  }

  handleSaveWeightDialogSubmit = (event) => {
    let { lineWeight } = this.state,
      { settings, settingsActions, canvasSrv } = this.props,
      { canvas } = canvasSrv.canvas,
      isDialogOpened = settings.isDialogOpened,
      dialogType = settings.dialogType;

    if (/^\d+$/.test(lineWeight)) {
      let activeLabel = canvas.getActiveObject();

      activeLabel.text = activeLabel.customProps.weight = this.state.lineWeight;
      canvasSrv.renderAll();
      isDialogOpened = !settings.isDialogOpened;
      this.setState({ errorMessage: "" });
      this.setState({ lineWeight: "" });

      settingsActions.toggleDialog({ isDialogOpened, dialogType });
      return;
    }

    this.setState({ errorMessage: "Please enter a valid number weight!" });

    settingsActions.toggleDialog({ isDialogOpened, dialogType });
  }

  handleDialogClose = (event) => {
    let { settings, settingsActions } = this.props,
      isDialogOpened = !settings.isDialogOpened;

    this.setState({ errorMessage: "" });
    this.setState({ canvasName: "" });

    settingsActions.toggleDialog({ isDialogOpened });
  }

  renderLoadOrRemoveDialogBody = () => {
    let { canvas } = this.props,
      radios;

    if (canvas && canvas.length) {
      radios = canvas.map((item, index) => {
        return (
          <RadioButton
            className="radio-btn"
            key={index}
            value={item.key}
            label={item.name}
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

  renderSaveDialogBody = (defaultValue) => {
    return (
      <TextField
        hintText="Hint Text"
        floatingLabelText="Floating Label Text"
        defaultValue={defaultValue}
        errorText={this.state.errorMessage}
        onChange={this.handleInputChange}
      />
    );
  }

  renderDialogControls = (handler, submitText) => {
    return [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label={submitText}
        primary={true}
        keyboardFocused={true}
        onTouchTap={handler}
      />,
    ];
  }

  renderDialogByType(dialogType) {
    let body, controls;

      switch (dialogType) {
        case "load":
          body = this.renderLoadOrRemoveDialogBody();
          controls = this.renderDialogControls(this.handleLoadCollectionDialogSubmit, "Submit");
          break;
        case "save":
          body = this.renderSaveDialogBody(this.state.canvasName);
          controls = this.renderDialogControls(this.handleSaveCollectionDialogSubmit, "Save");
          break;
        case "remove":
          body = this.renderLoadOrRemoveDialogBody();
          controls = this.renderDialogControls(this.handleRemoveCollectionDialogSubmit, "Submit");
          break;
        case "label":
          body = this.renderSaveDialogBody(this.state.lineWeight);
          controls = this.renderDialogControls(this.handleSaveWeightDialogSubmit, "Save");
          break;
        default:
          throw new Error("Not supported type of the dialog window");
          break;
      }

    return { body, controls };
  }

  render() {
    let { dialogType } = this.props.settings;
    let dlg;

    if (dialogType) {
      dlg = this.renderDialogByType(dialogType);
    }

    return (
      <Dialog
        title="Please fill the form"
        actions={(dlg && dlg.controls) || null}
        modal={false}
        open={this.props.settings.isDialogOpened || false}
        onRequestClose={this.handleDialogClose}
        autoScrollBodyContent={true}
      >
        {(dlg && dlg.body) || null}
      </Dialog>
    );
  }
}
