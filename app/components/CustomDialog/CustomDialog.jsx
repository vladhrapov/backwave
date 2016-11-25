import React from "react";

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as DialogActions from "../../actions/DialogActions";
import * as CanvasActions from "../../actions/CanvasActions";


import CanvasService from "../../services/CanvasService";
import SettingsService from "../../services/SettingsService";

let styles = {};

class CustomDialog extends React.Component {
  constructor(props) {
    super(props);
    // this.settingsService = new SettingsService();
  }

  state = {
    // dialogOpened: false
    selectedRadio: null,
    canvasName: "",
    errorMessage: ""
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
    // console.log("submit");
    let { dialog, dialogActions, canvasActions } = this.props,
        isDialogOpened = !dialog.isDialogOpened;



    //ToDo: uncomment these
    CanvasService.loadCanvas(this.state.selectedRadio, this.props.firebaseRef);
    this.props.settingsService.disableConnectionMode();
    this.props.settingsService.enableMigrationMode();
    // this.setState({ dialogOpened: false });
    dialogActions.toggleDialog({ isDialogOpened: false });
  }

  handleRemoveCollectionDialogSubmit = () => {
    let { dialog, dialogActions } = this.props,
        isDialogOpened = !dialog.isDialogOpened;

    CanvasService.removeCanvas(this.state.selectedRadio, this.props.firebaseRef);
    this.props.settingsService.disableConnectionMode();
    this.props.settingsService.enableMigrationMode();
    // this.setState({ dialogOpened: false });
    dialogActions.toggleDialog({ isDialogOpened: false });
  }

  handleSaveCollectionDialogSubmit = () => {
    let { dialog, dialogActions } = this.props,
        isDialogOpened = !dialog.isDialogOpened;

    if (this.state.canvasName) {

      CanvasService.saveCanvas(this.state.canvasName, this.props.firebaseRef);
      this.setState({ errorMessage: "" });
      dialogActions.toggleDialog({ isDialogOpened: false });
      // this.setState({ dialogOpened: false });
    }
    else {
      this.setState({ errorMessage: "This field is required" });
      dialogActions.toggleDialog({ isDialogOpened: true });
    }
  }

  handleDialogClose = (event) => {
    let { dialog, dialogActions } = this.props,
        isDialogOpened = !dialog.isDialogOpened;

    // this.setState({ dialogOpened: false});
    this.setState({ errorMessage: "" });
    this.setState({ canvasName: "" });
    dialogActions.toggleDialog({ isDialogOpened: false });
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

  renderLoadOrRemoveDialogBody = () => {
    console.log("PROPS IN RENDER RADIO: ", this.props);
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

    // this.dialogType = this.dialogType || this.props.dialog.dialogType;
    console.log("DIALOG TYPE: --- ", this.props.dialog.dialogType);

    if (this.props.dialog.dialogType) {
      switch (this.props.dialog.dialogType) {
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
        open={this.props.dialog.isDialogOpened || false}
        onRequestClose={this.handleDialogClose}
        autoScrollBodyContent={true}
      >
        {dialogBody || null}
      </Dialog>
    );
  }

  componentWillMount() {
    this.props.canvasActions.loadCanvasList(this.props.firebaseRef);
    // this.setState({dialogType: this.props.dialog.dialogType});
    // this.setState({isDialogOpened: this.props.dialog.isDialogOpened});
  }

  render() {
    return (
      this.renderDialogByType()
    );
  }
}


function mapStateToProps(state, ownProps) {
  console.log("STATE: ============= ", state, ownProps);
  return {
    dialog: state.dialog,
    canvas: state.canvasList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(CourseActions.createCourse(course))
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomDialog);
