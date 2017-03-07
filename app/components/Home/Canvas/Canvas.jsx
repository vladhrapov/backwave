import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fabric } from "fabric";
import { Tabs, Tab } from 'material-ui/Tabs';

// Actions
// import * as DialogActions from "../../../actions/DialogActions";
import * as SettingsActions from "../../../actions/SettingsActions";

// Components
import Settings from "../Settings/Settings.jsx";

// Services
import CanvasService from "../../../services/CanvasService";

// Styles
import "./assets/_styles.scss";
import "../../Shared/assets/_styles.scss";


function mapStateToProps(state, ownProps) {
  console.log("STATE: ============= ", state, ownProps);
  return {
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    settingsActions: bindActionCreators(SettingsActions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Canvas extends React.Component {
  constructor() {
    super();
    console.log("Fabric: ", fabric);
    window.ondblclick = this.handleDblClick;
  }

  isActiveObjectHasCustomProps = (activeObject) => {
    return activeObject &&
      activeObject.customProps;
  }

  handleDblClick = (event) => {
    let { settings, settingsActions } = this.props,
        isDialogOpened = !settings.isDialogOpened,
        activeObject = CanvasService.getCanvas().getActiveObject();

    if (this.isActiveObjectHasCustomProps(activeObject) && activeObject.customProps.type == "label") {
      settingsActions.toggleDialog({ isDialogOpened, dialogType: "label" });
    }
  }

  render() {
    return (
      <div>
        <Tabs className="tab-canvas" value={"canvas"}>
          <Tab label="Canvas" value="canvas">
            <div>
              <canvas id="canvas" onDoubleClick={this.handleDblClick}></canvas>
            </div>
          </Tab>
        </Tabs>
        <Tabs className="tab-settings" value={"settings"}>
          <Tab label="Settings" value="settings">
            <Settings />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
