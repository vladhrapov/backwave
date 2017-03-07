import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fabric } from "fabric";
import { Tabs, Tab } from 'material-ui/Tabs';

// Actions
import * as DialogActions from "../../../actions/DialogActions";

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
  }

  isActiveObjectHasCustomProps = (activeObject) => {
    return activeObject &&
      activeObject.customProps;
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
