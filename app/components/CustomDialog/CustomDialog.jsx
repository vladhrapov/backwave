import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

// Actions
import * as DialogActions from "../../actions/DialogActions";
import * as CanvasActions from "../../actions/CanvasActions";

// Services
import CanvasService from "../../services/CanvasService";
import SettingsService from "../../services/SettingsService";

// Styles
import "../Shared/assets/_styles.scss";


function mapStateToProps(state, ownProps) {
  console.log("STATE: ============= ", state, ownProps);
  return {
    dialog: state.dialog,
    canvas: state.canvas
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dialogActions: bindActionCreators(DialogActions, dispatch),
    canvasActions: bindActionCreators(CanvasActions, dispatch)
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
    this.setState({ canvasName: event.target.value });
  }

  handleLoadCollectionDialogSubmit = (event) => {
    let { dialog, dialogActions, canvasActions, settingsService } = this.props,
        isDialogOpened = !dialog.isDialogOpened,
        dialogType = dialog.dialogType;

    CanvasService.loadCanvas(this.state.selectedRadio, this.props.firebaseRef);
    settingsService.disableConnectionMode();
    settingsService.enableMigrationMode();
    dialogActions.toggleDialog({ isDialogOpened, dialogType });
  }

  handleRemoveCollectionDialogSubmit = () => {
    let { dialog, dialogActions, settingsService } = this.props,
        isDialogOpened = !dialog.isDialogOpened,
        dialogType = dialog.dialogType;

    CanvasService.removeCanvas(this.state.selectedRadio, this.props.firebaseRef);
    settingsService.disableConnectionMode();
    settingsService.enableMigrationMode();
    dialogActions.toggleDialog({ isDialogOpened, dialogType });
  }

  handleSaveCollectionDialogSubmit = () => {
    let { dialog, dialogActions } = this.props,
        isDialogOpened = !dialog.isDialogOpened,
        dialogType = dialog.dialogType;

    if (this.state.canvasName) {
      CanvasService.saveCanvas(this.state.canvasName, this.props.firebaseRef);
      this.setState({ errorMessage: "" });
      this.setState({ canvasName: "" });
      dialogActions.toggleDialog({ isDialogOpened, dialogType });
    }
    else {
      this.setState({ errorMessage: "This field is required" });
    }
  }

  handleDialogClose = (event) => {
    let { dialog, dialogActions } = this.props,
        isDialogOpened = !dialog.isDialogOpened;

    this.setState({ errorMessage: "" });
    this.setState({ canvasName: "" });
    dialogActions.toggleDialog({ isDialogOpened });
  }

  renderLoadOrRemoveDialogBody = () => {
    let { canvas } = this.props,
        radios;

    if (canvas) {
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
    let { dialogType } = this.props.dialog,
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
        case "line":
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
        title="Scrollable Dialog"
        actions={dialogControls || null}
        modal={false}
        open={this.props.dialog.isDialogOpened || false}
        onRequestClose={this.handleDialogClose}
        autoScrollBodyContent={true}
      >
        {dialogBody || null}
      </Dialog>
    );
  }
}
