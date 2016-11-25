import React from "react";
import { fabric } from "fabric";
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';

// Services
import CanvasService from "../../services/CanvasService";
import SettingsService from "../../services/SettingsService";

// Styles
import "./assets/_styles.scss";
import "../Shared/assets/_styles.scss";


export default class Canvas extends React.Component {
  constructor() {
    super();
    console.log("Fabric: ", fabric);
    window.ondblclick = this.handleDblClick;
    this.settingsService = new SettingsService();
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

  render() {
    return (
      <div>
        <canvas id="canvas" width="1480" height="750"></canvas>
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
