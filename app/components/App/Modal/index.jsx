import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Dialog from 'material-ui/Dialog';

import { renderDialogControls } from "./Controls";
import { renderRadioGroupBody, renderTextBody } from "./Body";

// Actions
import * as CanvasActions from "../../../actions/CanvasActions";
import * as SettingsActions from "../../../actions/SettingsActions";

// Styles
import "../../Shared/assets/_styles.scss";


@connect(
  ({ canvas, settings }) => ({ canvas, settings }),
  (dispatch) => ({
    canvasActions: bindActionCreators(CanvasActions, dispatch),
    settingsActions: bindActionCreators(SettingsActions, dispatch)
  })
)
export default class Modal extends Component {
  constructor(props) {
    super(props);
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

  get inputProperties() {
    const { canvas, canvasActions, settings, settingsActions, canvasSrv } = this.props;
    const { selectedRadio, lineWeight } = this.state;
    const isDialogOpened = !settings.isDialogOpened;
    const dialogType = settings.dialogType;

    return { canvas, canvasActions, settings, settingsActions, canvasSrv, selectedRadio, lineWeight, isDialogOpened, dialogType };
  }

  handleLoadCollectionDialogSubmit = (event) => {
    const { canvas, canvasSrv, settingsActions, selectedRadio, isDialogOpened, dialogType } = this.inputProperties;

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
    const { canvasActions, canvasSrv, settings, settingsActions, selectedRadio, isDialogOpened, dialogType } = this.inputProperties;

    canvasActions.removeCanvasFromList({ name: selectedRadio });
    canvasSrv.disableConnectionMode(canvasSrv.canvas);
    canvasSrv.enableMigrationMode(canvasSrv.canvas);
    settingsActions.toggleDialog({ isDialogOpened, dialogType });
  }

  handleSaveCollectionDialogSubmit = () => {
    const { canvasActions, canvasSrv, settings, settingsActions, isDialogOpened, dialogType } = this.inputProperties;

    if (this.state.canvasName) {
      let canvasObjects = canvasSrv.getSerializedCanvasObjectsCollection();

      canvasActions.saveCanvasToList({ name: this.state.canvasName, canvasObjects });
      this.setState({ errorMessage: "", canvasName: "" });
      settingsActions.toggleDialog({ isDialogOpened, dialogType });
    }
    else {
      this.setState({ errorMessage: "This field is required" });
    }
  }

  handleSaveWeightDialogSubmit = (event) => {
    let { canvasSrv, settings, settingsActions, isDialogOpened, dialogType, lineWeight } = this.inputProperties;

    isDialogOpened = !isDialogOpened;

    if (/^\d+$/.test(lineWeight)) {
      let activeLabel = canvasSrv.canvas.getActiveObject();

      activeLabel.text = activeLabel.customProps.weight = this.state.lineWeight;
      canvasSrv.renderAll();
      isDialogOpened = !settings.isDialogOpened;
      this.setState({ errorMessage: "", lineWeight: "" });
      settingsActions.toggleDialog({ isDialogOpened, dialogType });

      return;
    }

    this.setState({ errorMessage: "Please enter a valid number weight!" });
    settingsActions.toggleDialog({ isDialogOpened, dialogType });
  }

  handleDialogClose = (event) => {
    let { settings, settingsActions, isDialogOpened } = this.inputProperties;

    this.setState({ errorMessage: "", canvasName: "" });
    settingsActions.toggleDialog({ isDialogOpened });
  }

  getDialogRadioGroupContent(handler) {
    const { canvas } = this.props;
    const { handleDialogClose, handleCheckRadio } = this;

    return {
      body: renderRadioGroupBody({ handleCheckRadio, canvas }),
      controls: renderDialogControls({ handler, submitText: "Submit", handleDialogClose })
    };
  }

  getDialogTextContent(handler, defaultValue) {
    const { errorMessage } = this.state;
    const { handleDialogClose, handleInputChange } = this;

    return {
      body: renderTextBody({ defaultValue, handleInputChange, errorMessage }),
      controls: renderDialogControls({ handler, submitText: "Save", handleDialogClose })
    };
  }

  renderDialogByType(dialogType) {
    const { lineWeight, canvasName } = this.state;

    switch (dialogType) {
      case "load":
        return this.getDialogRadioGroupContent(this.handleLoadCollectionDialogSubmit);
      case "save":
        return this.getDialogTextContent(this.handleSaveCollectionDialogSubmit, canvasName);
      case "remove":
        return this.getDialogRadioGroupContent(this.handleRemoveCollectionDialogSubmit);
      case "label":
        return this.getDialogTextContent(this.handleSaveWeightDialogSubmit, lineWeight);
      default:
        throw new Error("Not supported type of the dialog window");
    }
  }

  render() {
    const { dialogType } = this.inputProperties;

    if (dialogType) {
      var { controls, body } = this.renderDialogByType(dialogType);
    }

    return (
      <Dialog
        title="Please fill the form"
        actions={controls || null}
        modal={false}
        open={this.props.settings.isDialogOpened || false}
        onRequestClose={this.handleDialogClose}
        autoScrollBodyContent={true}
      >
        {body || null}
      </Dialog>
    );
  }
}
