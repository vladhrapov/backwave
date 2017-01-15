import React from "react";
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import Popover from 'material-ui/Popover/Popover';
import { Menu, MenuItem } from 'material-ui/Menu';

// Services
import CanvasService from "../../../services/CanvasService";
import SettingsService from "../../../services/SettingsService";
import TransformationService from "../../../services/TransformationService";
import WaveAlgorithmService from "../../../services/WaveAlgorithmService"

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.settingsService = new SettingsService();
  }

  state = {
    vertexFrom: null,
    vertexTo: null,
    vertexNamesCollection: [],
    popoverOpened: false,
    isAlgorithmsButtonDisabled: true,
    isRoutesButtonDisabled: true
  }

  toggleAlgorithmsButtons(vertexFrom, vertexTo) {
    if(vertexFrom && vertexTo) {
      this.setState({ isAlgorithmsButtonDisabled: false });
    }
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

  // handleGetTransformedMatrix = () => {
  //   let { vertexFrom, vertexTo } = this.state;
  //   console.log("getTransformedMatrixFromCanvas");
  //   new TransformationService().getTransformedMatrixFromCanvas();
  // }

  handleWaveAlgorithmClick = () => {
    // let wa = new WaveAlgorithmService(1, 5);
    let wa = new WaveAlgorithmService(this.state.vertexFrom - 1, this.state.vertexTo - 1);
    this.result = wa.invoke();
    console.clear();
    console.log(this.result);
    CanvasService.drawRoutes(this.result);
    this.routesInfo = this.settingsService.showRoutesInfo(this.result);
    this.setState({isRoutesButtonDisabled: false});
  }

  handleBackWaveAlgorithmClick = () => {

    this.setState({isRoutesButtonDisabled: false});
  }

  handleSelectVertexNameClick = (event, key, payload) => {
    this.setState({
      vertexNamesCollection: CanvasService.getVertexNames()
    });
  }

  handleSelectVertexFromNameChange = (event, key, payload) => {
    let { vertexFrom, vertexTo } = this.state;

    this.setState({ vertexFrom: payload });
    this.toggleAlgorithmsButtons(vertexFrom || payload, vertexTo);
  }

  handleSelectVertexToNameChange = (event, key, payload) => {
    let { vertexFrom, vertexTo } = this.state;

    this.setState({ vertexTo: payload });
    this.toggleAlgorithmsButtons(vertexFrom, vertexTo || payload);
  }

  handlePopoverClick = (event, key) => {
    let { popoverOpened } = this.state;

    if(popoverOpened) {
      this.setState({popoverOpened: false, anchorEl: event.currentTarget});
    }
    else {
      this.setState({popoverOpened: true, anchorEl: event.currentTarget});
    }

    return this.state.popoverOpened;  
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
        className="select-vertex"
        floatingLabelText={labelText}
        value={labelValue}
        onClick={this.handleSelectVertexNameClick}
        onChange={selectChangeHandler}
      >
        {menuCollection}
      </SelectField>
    );
  }

  renderPaths = () => {
    if(this.routesInfo) {
      return this.routesInfo.map((route, index) => {
        let { vertices, weight } = route;

        return <MenuItem key={index} primaryText={`${vertices} (${weight})`} />
      });
    }
  }

  render() {
    return (
      <div className="settings" >
        <div className="btn-add-remove-container">
          <FloatingActionButton onClick={this.handleAddButton}>
            <ContentAdd />
          </FloatingActionButton>
          <FloatingActionButton onClick={this.handleRemoveButton}>
            <ContentRemove />
          </FloatingActionButton>
        </div>

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

        {this.renderCanvasVerticeNames("From", this.state.vertexFrom, this.handleSelectVertexFromNameChange)}
        {this.renderCanvasVerticeNames("To", this.state.vertexTo, this.handleSelectVertexToNameChange)}

        {
        //   <RaisedButton
        //   label="Get Matrix"
        //   className="custom-btn-default"
        //   secondary={true}
        //   onClick={this.handleGetTransformedMatrix}
        // />
      }

        <RaisedButton
          label="Wave Algorithm"
          className="custom-btn-default"
          disabled={this.state.isAlgorithmsButtonDisabled}
          secondary={true}
          onClick={this.handleWaveAlgorithmClick}
        />

        <RaisedButton
          label="Back Wave Algorithm"
          className="custom-btn-default"
          disabled={this.state.isAlgorithmsButtonDisabled}
          secondary={true}
          onClick={this.handleBackWaveAlgorithmClick}
        />

        <RaisedButton
          onTouchTap={this.handlePopoverClick}
          className="custom-btn-default"
          disabled={this.state.isRoutesButtonDisabled}
          primary={true}
          label="Routes List"
        />
        <Popover
          open={this.state.popoverOpened}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{"horizontal":"middle","vertical":"top"}}
          targetOrigin={{"horizontal":"middle","vertical":"bottom"}}
          onRequestClose={this.handlePopoverClick}
        >
          <Menu>
            {this.renderPaths()}
          </Menu>
        </Popover>

      </div>
    );
  }
}

        // <div>

        // </div>
            // anchorEl={this.state.anchorEl}