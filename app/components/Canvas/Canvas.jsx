import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fabric } from "fabric";
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

// Actions
import * as DialogActions from "../../actions/DialogActions";

// Services
import CanvasService from "../../services/CanvasService";
import SettingsService from "../../services/SettingsService";
import TransformationService from "../../services/TransformationService";

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

  state = {
    vertexFrom: null,
    vertexTo: null,
    vertexNamesCollection: []
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

  handleGetTransformedMatrix = () => {
    console.log("getTransformedMatrixFromCanvas");
    new TransformationService().getTransformedMatrixFromCanvas();
  }

  handleSelectVertexNameClick = (event, key, payload) => {
    this.setState({
      vertexNamesCollection: CanvasService.getVertexNames()
    });
  }

  handleSelectVertexFromNameChange = (event, key, payload) => {
    console.log("changed: ", payload);
    this.setState({ vertexFrom: payload });
  }

  handleSelectVertexToNameChange = (event, key, payload) => {
    console.log("changed: ", payload);
    this.setState({ vertexTo: payload });
  }

  renderCanvasVerticeNames = (labelText, labelValue, selectChangeHandler) => {
    let { vertexNamesCollection } = this.state,
        menuCollection;

    if (vertexNamesCollection && vertexNamesCollection.length) {
      menuCollection = vertexNamesCollection.map((name, index) => {
        index += 1;
        return (
          <MenuItem key={index} value={index} primaryText={name} />
        );
      });
    }

    return (
      <SelectField
        id={labelText}
        floatingLabelText={labelText}
        value={labelValue}
        onClick={this.handleSelectVertexNameClick}
        onChange={selectChangeHandler}
      >
        {menuCollection}
      </SelectField>
    );
  }

  render() {
    return (
      <div>
        <Tabs
          className="tab-canvas"
          value={"a"}
          onChange={this.handleChange}
        >
          <Tab
            label="Tab Canvas"
            value="a"
          >
            <div >
              <canvas id="canvas" onDoubleClick={this.handleDblClick}></canvas>
            </div>
          </Tab>
        </Tabs>
        <Tabs
          className="tab-settings"
          value={"b"}
          onChange={this.handleChange}
        >
          <Tab
            label="Tab Settings"
            value="b"
          >
            <div className="settings" >
              <FloatingActionButton onClick={this.handleAddButton}>
                <ContentAdd />
              </FloatingActionButton>

              <FloatingActionButton onClick={this.handleRemoveButton}>
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
              <RaisedButton
                label="Get transformed Matrix"
                onClick={this.handleGetTransformedMatrix}
              />
              {this.renderCanvasVerticeNames("From", this.state.vertexFrom, this.handleSelectVertexFromNameChange)}
              {this.renderCanvasVerticeNames("To", this.state.vertexTo, this.handleSelectVertexToNameChange)}
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

// style={{margin: 12}}


// <SelectField
// floatingLabelText="From"
// value={this.state.vertexFrom}
// onChange={this.handleChange}
// >
// {this.renderCanvasVerticeNames}
// </SelectField>
//
// <SelectField
// floatingLabelText="To"
// value={this.state.vertexTo}
// onChange={this.handleChange}
// >
// {this.renderCanvasVerticeNames}
// </SelectField>
