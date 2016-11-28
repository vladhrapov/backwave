import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fabric } from "fabric";
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';

// Actions
import * as DialogActions from "../../actions/DialogActions";

// Services
import CanvasService from "../../services/CanvasService";
import SettingsService from "../../services/SettingsService";

// Styles
import "./assets/_styles.scss";
import "../Shared/assets/_styles.scss";


function mapStateToProps(state, ownProps) {
  console.log("STATE: ============= ", state, ownProps);
  return {
    dialog: state.dialog
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dialogActions: bindActionCreators(DialogActions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Canvas extends React.Component {
  constructor() {
    super();
    console.log("Fabric: ", fabric);
    window.ondblclick = this.handleDblClick;
    this.settingsService = new SettingsService();
  }

  isActiveObjectHasCustomProps = (activeObject) => {
    return activeObject &&
      activeObject.customProps;
  }

  handleAddButton = () => {
    this.settingsService.addNewVertex();
  }

  handleRemoveButton = () => {
    this.settingsService.removeVertex();
  }

  handleMigrationMode = () => {
    console.log("handleMigrationMode");
    this.settingsService.disableConnectionMode();
    this.settingsService.enableMigrationMode();
  }

  handleConnectionMode = () => {
    console.log("handleConnectionMode");
    this.settingsService.disableMigrationMode();
    this.settingsService.enableConnectionMode();
  }

  handleDblClick = (event) => {
    let { dialog, dialogActions } = this.props,
        isDialogOpened = !dialog.isDialogOpened,
        activeObject = CanvasService.getCanvas().getActiveObject();

    if (this.isActiveObjectHasCustomProps(activeObject) && activeObject.customProps.type == "label") {
      dialogActions.toggleDialog({ isDialogOpened, dialogType: "label" });
    }
  }

  render() {
    return (
      <div>
        <canvas id="canvas" width="1480" height="750" onDoubleClick={this.handleDblClick}></canvas>
        <div className="settings">
          <FloatingActionButton style={{}} onClick={this.handleAddButton}>
            <ContentAdd />
          </FloatingActionButton>

          <FloatingActionButton style={{}} onClick={this.handleRemoveButton}>
            <ContentRemove />
          </FloatingActionButton>

          <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
            <RadioButton
              className="radio-btn"
              value="not_light"
              label="Moving mode"
              onClick={this.handleMigrationMode}
              />
            <RadioButton
              className="radio-btn"
              value="light"
              label="Linking mode"
              onClick={this.handleConnectionMode}
            />
          </RadioButtonGroup>
        </div>
      </div>
    );
  }
}
