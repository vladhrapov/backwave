import React from "react";
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
import CanvasService from "../../../services/CanvasService";
import SettingsService from "../../../services/SettingsService";

// Styles
import "../../Shared/assets/_styles.scss";


function mapStateToProps(state, ownProps) {
  console.log("STATE: ============= ", state, ownProps);
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
export default class CustomDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    selectedRadio: null,
    canvasName: "",
    errorMessage: ""
  }

  handleCheckRadio = (event) => {
    this.setState({selectedRadio: event.target.value});
  }

  handleInputChange = (event) => {
    let { dialogType } = this.props.dialog;

    if (dialogType == "label") {
      this.setState({ lineWeight: event.target.value });
    }
    else if (dialogType == "save") {
      this.setState({ canvasName: event.target.value });
    }
  }

  handleLoadCollectionDialogSubmit = (event) => {
    let { canvasActions, settingsActions, settings, settingsService } = this.props,
        isDialogOpened = !settings.isDialogOpened,
        dialogType = settings.dialogType;

    CanvasService.loadCanvas(this.state.selectedRadio, this.props.firebaseRef);
    settingsService.disableConnectionMode();
    settingsService.enableMigrationMode();

    settingsActions.toggleDialog({ isDialogOpened, dialogType });
  }

  handleRemoveCollectionDialogSubmit = () => {
    let { canvas, canvasActions, settings, settingsActions, settingsService } = this.props,
        isDialogOpened = !settings.isDialogOpened,
        dialogType = settings.dialogType;

    // CanvasService.removeCanvas(this.state.selectedRadio, this.props.firebaseRef);
    canvasActions.removeCanvasFromList({ canvasName: this.state.selectedRadio });
    settingsService.disableConnectionMode();
    settingsService.enableMigrationMode();

    settingsActions.toggleDialog({ isDialogOpened, dialogType });
  }

  handleSaveCollectionDialogSubmit = () => {
    let { canvas, canvasActions, settings, settingsActions } = this.props,
        isDialogOpened = !settings.isDialogOpened,
        dialogType = settings.dialogType;

    if (this.state.canvasName) {
      canvasActions.saveCanvasToList({ canvasName: this.state.canvasName });
      // CanvasService.saveCanvas(this.state.canvasName, this.props.firebaseRef);
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
        { settings, settingsActions } = this.props,
        isDialogOpened = settings.isDialogOpened,
        dialogType = settings.dialogType;

    if (/^\d+$/.test(lineWeight)) {
      let canvas = CanvasService.getCanvas(),
          activeLabel = canvas.getActiveObject();

      activeLabel.text = activeLabel.customProps.weight = this.state.lineWeight;
      canvas.renderAll();
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

  render() {
    let { dialogType } = this.props.settings,
        dialogBody, dialogControls;

    if (dialogType) {
      switch (dialogType) {
        case "load":
          dialogBody = this.renderLoadOrRemoveDialogBody();
          dialogControls = this.renderDialogControls(this.handleLoadCollectionDialogSubmit, "Submit");
        break;
        case "save":
          dialogBody = this.renderSaveDialogBody(this.state.canvasName);
          dialogControls = this.renderDialogControls(this.handleSaveCollectionDialogSubmit, "Save");
        break;
        case "remove":
          dialogBody = this.renderLoadOrRemoveDialogBody();
          dialogControls = this.renderDialogControls(this.handleRemoveCollectionDialogSubmit, "Submit");
          break;
        case "label":
          dialogBody = this.renderSaveDialogBody(this.state.lineWeight);
          dialogControls = this.renderDialogControls(this.handleSaveWeightDialogSubmit, "Save");
          break;
        default:
          throw new Error("Not supported type of the dialog window");
          break;
      }
    }

    return (
      <Dialog
        title="Please fill the form"
        actions={dialogControls || null}
        modal={false}
        open={this.props.settings.isDialogOpened || false}
        onRequestClose={this.handleDialogClose}
        autoScrollBodyContent={true}
      >
        {dialogBody || null}
      </Dialog>
    );
  }
}
