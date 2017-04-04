import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tabs, Tab } from 'material-ui/Tabs';

// Actions
import * as CanvasActions from "../../../actions/CanvasActions";
import * as SettingsActions from "../../../actions/SettingsActions";
import * as LoggerActions from "../../../actions/LoggerActions";

// Components
import Tools from "../Tools/Tools.jsx";

// Services
// import CanvasService from "../../../services/CanvasService";

// Styles
import "./assets/_styles.scss";
import "../../Shared/assets/_styles.scss";


function mapStateToProps(state, ownProps) {
  return {
    canvas: state.canvas,
    settings: state.settings,
    logger: state.logger
  };
}

function mapDispatchToProps(dispatch) {
  return {
    canvasActions: bindActionCreators(CanvasActions, dispatch),
    settingsActions: bindActionCreators(SettingsActions, dispatch),
    loggerActions: bindActionCreators(LoggerActions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Canvas extends React.Component {
  constructor() {
    super();
    window.ondblclick = this.handleDblClick;
  }

  isActiveObjectHasCustomProps = (activeObject) => {
    return activeObject &&
      activeObject.customProps;
  }

  handleDblClick = (event) => {
    let { settings, settingsActions, canvasSrv } = this.props,
      isDialogOpened = !settings.isDialogOpened,
      activeObject = canvasSrv.canvas.getActiveObject();

    if (this.isActiveObjectHasCustomProps(activeObject) && activeObject.customProps.type == "label") {
      settingsActions.toggleDialog({ isDialogOpened, dialogType: "label" });
    }
  }

  componentDidMount() {
    let { canvas, canvasSrv, settings, logger } = this.props,
      { canvas: canvas2 } = canvasSrv;

    canvas2.on('mouse:over', function (e) {
      if (e.target && e.target.setFill) {
        //e.target.setFill('red');
        //canvas.renderAll();
        // console.log("HoVER####");
      }
    });

    canvas2.on('mouse:out', function (e) {
      if (e.target && e.target.setFill) {
        //e.target.setFill('white');
        //canvas.renderAll();
        // console.log("OUT----------##");
      }
    });

    const canvasLoadedSchema = canvas.filter(item => item.key == settings.canvasLoadedSchema)[0];

    if (!!canvasLoadedSchema) {
      canvasSrv.restoreCanvas(canvasLoadedSchema.canvasObjects);
      if (logger && logger.routesInfo && logger.routesInfo.routes) {
        const { routes, vertexFrom, vertexTo } = logger.routesInfo;

        canvasSrv.drawRoutes(routes, vertexFrom, vertexTo);
        // canvasSrv.showRoutesInfo(this.waResult);
      }
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
            <Tools canvasSrv={this.props.canvasSrv} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
