import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RaisedButton from "material-ui/RaisedButton";

import Schema from "./Schema";
import Traffic from "./Traffic";

// Actions
import * as SettingsActions from "../../../actions/SettingsActions";

import "./assets/_styles.scss";


@connect(
  ({ settings }) => ({ settings }),
  (dispatch) => ({
    settingsActions: bindActionCreators(SettingsActions, dispatch)
  })
)
export default class Global extends Component {
  constructor(props) {
    super(props);
  }


  handleStateChange = (event, prop, value) => {
    this.setState({ [prop]: value });
  }

  save = () => {
    let { vertexName, vertexShape, isBindToRange, lineMinValue, lineMaxValue, isDistributionAutomatic, algorithmType, simulationIterationsCount } = this.props.settings;

    if (this.state.vertexName) {
      vertexName = this.state.vertexName.toUpperCase().slice(0, 1);
    }

    console.log("saved!!");
    console.log(this.state);
    this.props.settingsActions.saveSettings({
      vertexShape,
      isBindToRange,
      lineMinValue,
      lineMaxValue,
      isDistributionAutomatic,
      algorithmType,
      simulationIterationsCount,
      ...this.state,
      vertexName
    });
  }

  componentWillMount() {
    this.props.settingsActions.loadSettings();
  }

  render() {
    console.log(this.state);
    return (
      <div className="global-container">
        Global settings
        1) Vertex naming+
        2) Vertex shape (optional)+
        3) Trafic distribution (step by step or in time)+
        4) Algorithm type+
        5) Bind canvas vertices to first/last+
        6) Random value for line (from - to)+

        <Schema
          {...this.state}
          settings={this.props.settings}
          handleStateChange={this.handleStateChange}
        />

        <Traffic
          {...this.state}
          settings={this.props.settings}
          handleStateChange={this.handleStateChange}
        />

        <RaisedButton
          label="Save"
          className="save"
          primary={true}
          onTouchTap={this.save}
        />

      </div>
    );
  }
} 