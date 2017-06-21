import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as SettingsActions from "../../../actions/SettingsActions";

import "./assets/_styles.scss";

@connect(
  ({ settings, logger }) => ({ settings, logger }),
  (dispatch) => ({
    settingsActions: bindActionCreators(SettingsActions, dispatch)
  })
)
export default class Spinner extends Component {
  constructor() {
    super();
  }

  state = {
    iteration: 0
  }

  render() {
    const { isSpinnerOpened, simulationIterationsCount, lastIteration } = this.props.settings;
    const { packetsInfo } = this.props.logger;
    let [packet] = packetsInfo.pending.slice(-1);

    return (
      <div className={"spinner " + (!!isSpinnerOpened ? "spinner-show" : "spinner-hidden")}>
        <h2>Simulation in progress</h2>
        <p>{(packet && packet.iteration) ? (packet.iteration - lastIteration) : this.state.iteration} of {simulationIterationsCount}</p>
      </div>
    );
  }
}