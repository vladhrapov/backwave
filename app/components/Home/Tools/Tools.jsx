import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import Popover from 'material-ui/Popover/Popover';
import { Menu, MenuItem } from 'material-ui/Menu';
import DropDownMenu from 'material-ui/DropDownMenu';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLessIcon from 'material-ui/svg-icons/navigation/expand-less';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import Chart from 'chart.js'

// Components
import Sections from "./Sections";

// Services
// import CanvasService from "../../../services/CanvasService";
// import TransformationService from "../../../services/TransformationService";
import WaveAlgorithmService from "../../../services/WaveAlgorithmService";
import BackwaveAlgorithmService from "../../../services/BackwaveAlgorithmService";

// Actions
import * as LoggerActions from "../../../actions/LoggerActions";
import * as SettingsActions from "../../../actions/SettingsActions";

// Styles
import "./assets/_styles.scss";



@connect(
  ({ logger, settings, dataTypes }) => ({ logger, settings, dataTypes }),
  (dispatch) => ({
    loggerActions: bindActionCreators(LoggerActions, dispatch),
    settingsActions: bindActionCreators(SettingsActions, dispatch)
  })
)
export default class Tools extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    vertexFrom: null,
    vertexTo: null,
    vertexNamesCollection: [],
    popoverOpened: false,
    isAlgorithmsButtonDisabled: true,
    isRoutesButtonDisabled: true,
    isBottomDrawerOpened: false,
    canvasMode: 1,
    trafficSimulationAlgorithm: "default"
  }

  componentWillMount() {
    this.props.settingsActions.loadSettings();
  }

  componentDidUpdate() {
    this.initCanvasMode();
  }

  initCanvasMode() {
    const { canvasSrv } = this.props;
    const { canvasMode } = this.state;

    switch (canvasMode) {
      case 1:
        canvasSrv.disableConnectionMode(canvasSrv.canvas);
        canvasSrv.disableMigrationMode(canvasSrv.canvas);
        break;
      case 2:
        canvasSrv.disableConnectionMode(canvasSrv.canvas);
        canvasSrv.enableMigrationMode(canvasSrv.canvas);
        break;
      case 3:
        canvasSrv.disableMigrationMode(canvasSrv.canvas);
        canvasSrv.enableConnectionMode(canvasSrv.canvas);
        break;
    }
  }

  toggleAlgorithmsButtons(vertexFrom, vertexTo) {
    if (vertexFrom && vertexTo) {
      this.setState({ isAlgorithmsButtonDisabled: false });
    }
  }

  handleAddButton = () => {
    let { canvasSrv } = this.props;

    canvasSrv.addNewVertex(canvasSrv.canvas);
  }

  handleRemoveButton = () => {
    let { canvasSrv } = this.props;

    canvasSrv.removeVertex(canvasSrv.canvas);
  }

  handleNextStepClick = () => {
    let { settings, logger, loggerActions, dataTypes, canvasSrv } = this.props;
    let { vertexFrom, vertexTo, trafficSimulationAlgorithm } = this.state;

    // Prepare algorithm
    if (!logger.routesInfo.algorithm) {
      canvasSrv.initRouting({ vertexFrom, vertexTo, settings, loggerActions });
      return;
    }

    // Prepare traffic queue: Update traffic queue
    const trafficQueue = canvasSrv.updateTrafficQueue(dataTypes, logger.queueInfo);
    const packetColor = trafficQueue[0].color;

    // Step 1: Get all packets from redux like []
    // [{ name, currentVertex, nextVertex, path, iterationIndex, isFinishVertex }, ...]

    // Step 2: Put packets [] here
    let { packets, updatedRoutes } = canvasSrv.doNextIteration(logger.packetsInfo.pending, logger.routesInfo, packetColor, trafficSimulationAlgorithm);//window.alg || "default");
    console.log("Tools.jsx - handleNextStepClick: ", packets);
    canvasSrv.drawRoutes(updatedRoutes.routes, vertexFrom, vertexTo);

    // Step 3: Log packets in the redux and queue
    loggerActions.logUpdatedRoutesInfo(updatedRoutes);
    loggerActions.logPacketsInfo(packets);
    loggerActions.logQueueInfo(trafficQueue);
  }


  // handleGetTransformedMatrix = () => {
  //   let { vertexFrom, vertexTo } = this.state;
  //   console.log("getTransformedMatrixFromCanvas");
  //   new TransformationService().getTransformedMatrixFromCanvas();
  // }

  /*handleWaveAlgorithmClick = () => {
    let { vertexFrom, vertexTo } = this.state,
      { canvasSrv, logger, loggerActions } = this.props;
    // let wa = new WaveAlgorithmService(1, 5);
    let wa = new WaveAlgorithmService(this.state.vertexFrom - 1, this.state.vertexTo - 1);
    this.waResult = wa.invoke(canvasSrv);
    canvasSrv.drawRoutes(this.waResult, vertexFrom, vertexTo);

    this.routesInfo = canvasSrv.showRoutesInfo(this.waResult);
    this.setState({ isRoutesButtonDisabled: false });

    loggerActions.logRoutesInfo({
      algorithm: "wave",
      vertexFrom: this.state.vertexFrom,
      vertexTo: this.state.vertexTo,
      routes: this.waResult
    });
  }*/

  /*handleBackWaveAlgorithmClick = () => {
    let { vertexFrom, vertexTo } = this.state,
      { canvasSrv, logger, loggerActions } = this.props;
    let bwa = new BackwaveAlgorithmService(this.state.vertexFrom - 1, this.state.vertexTo - 1);
    this.bwaResult = bwa.invoke(canvasSrv);
    canvasSrv.drawRoutes(this.bwaResult, vertexFrom, vertexTo);

    this.routesInfo = canvasSrv.showRoutesInfo(this.bwaResult);
    this.setState({ isRoutesButtonDisabled: false });

    loggerActions.logRoutesInfo({
      algorithm: "backwave",
      vertexFrom: this.state.vertexFrom,
      vertexTo: this.state.vertexTo,
      routes: this.bwaResult
    });
  }*/

  handleSelectVertexNameClick = (event, key, payload) => {
    let { canvasSrv } = this.props;

    this.setState({
      vertexNamesCollection: canvasSrv.getVertexNames()
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

    if (popoverOpened) {
      this.setState({ popoverOpened: false, anchorEl: event.currentTarget });
    }
    else {
      this.setState({ popoverOpened: true, anchorEl: event.currentTarget });
    }

    return this.state.popoverOpened;
  }

  /*handleReportsClick = () => {
    let win = window.open("", "Title", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1150, height=900, top=0, left=0"),
      { canvasSrv } = this.props;
    win.document.body.innerHTML = "<h1 align='center'>Звіт</h1>";
    win.document.body.innerHTML += "<h2 align='center'>Знайдені маршрути</h2>";
    this.routesInfo.forEach((route, index) => {
      win.document.body.innerHTML += `<br /> ${index + 1})  ${route.vertices} (${route.weight}) [${route.reliability}]<br />`;
    });

    win.document.body.innerHTML += `<div><img src="${canvasSrv.canvas.toDataURL("image/png")}" width="950" height="650" /></div> <br />`;
    win.document.body.innerHTML += `<div align='center'><img src="${this.myLineChart.toBase64Image()}" width="400" height="400" /></div>`;
    win.window.print();
    // win.window.close();
  }*/

  getIterations() {
    let waIterations = [],
      bwaIterations = [];

    waIterations.push(
      this.waResult
        .map(route => route.length - 1)
        .reduce((sum, current) => {
          waIterations.push(sum);
          return sum + current;
        }, 0)
    );

    bwaIterations.push(
      Math.ceil(this.bwaResult
        .map(route => route.length - 1)
        .reduce((sum, current) => {
          bwaIterations.push(Math.ceil(sum / 2));
          return sum + current;
        }, 0) / 2)
    );

    return { waIterations, bwaIterations };
    //Object.keys(routes).filter(vertex => !!+vertex);
  }

  getRoutesCount() {
    let routesCount = this.waResult.length > this.bwaResult.length
      ? this.waResult
      : this.bwaResult;

    return Object.keys(routesCount);
  }

  handleChartClick = () => {
    let routesArray = this.getRoutesCount();
    routesArray.push(routesArray.length + "");

    let iterations = this.getIterations();
    console.log(routesArray, iterations);

    console.log(routesArray);
    var lineChartData = {
      labels: routesArray,//["0", "1", "2", "3", "4"],
      datasets: [{
        label: "MWA",
        fillColor: "rgba(215, 40, 40, 0.9)",
        strokeColor: "rgba(215, 40, 40, 0.9)",
        pointColor: "rgba(220,180,0,1)",
        data: iterations.waIterations,//[0, 336, 567, 753],
        borderColor: "rgba(156, 22, 44, 0.9)",
        backgroundColor: "rgba(0, 0, 0, 0)"
      }, {
        label: "BWA",
        fillColor: "rgba(151,187,205,0)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        data: iterations.bwaIterations,//[0, 224, 352, 573],
        borderColor: "rgba(79, 228, 233, 0.9)",
        backgroundColor: "rgba(0, 0, 0, 0)"
      }]

    }

    Chart.defaults.global.animationSteps = 50;
    Chart.defaults.global.tooltipYPadding = 16;
    Chart.defaults.global.tooltipCornerRadius = 0;
    Chart.defaults.global.tooltipTitleFontStyle = "normal";
    Chart.defaults.global.tooltipFillColor = "rgba(0,160,0,0.8)";
    Chart.defaults.global.animationEasing = "easeOutBounce";
    Chart.defaults.global.responsive = true;
    // Chart.defaults.global.scaleLineColor = "black";
    Chart.defaults.global.scaleFontSize = 16;

    let { chartPopoverOpened } = this.state;

    // if(chartPopoverOpened) {
    //   this.setState({chartPopoverOpened: false, anchorEl2: event.currentTarget});
    // }
    // else {
    //   this.setState({chartPopoverOpened: true, anchorEl2: event.currentTarget});
    // }

    let ctx = document.getElementById("chart");

    if (ctx) {
      ctx = ctx.getContext("2d");
      this.myLineChart = new Chart(ctx, {
        type: 'line',
        data: lineChartData,
        options: {
          legend: {
            display: true,
            labels: {
              // fontColor: 'rgb(255, 99, 132)'
            }
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Iterations'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Routes'
              }
            }]
          }
        }
      });

    }


    // return this.state.chartPopoverOpened;  
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
      <DropDownMenu
        className="select-vertex"
        floatingLabelText={labelText}
        value={labelValue}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        iconStyle={{ fill: "#666" }}
        onClick={this.handleSelectVertexNameClick}
        onChange={selectChangeHandler}
      >
        {menuCollection}
      </DropDownMenu>
    );
  }

  renderPaths = () => {
    if (this.routesInfo) {
      return this.routesInfo.map((route, index) => {
        let { vertices, weight } = route;

        return <MenuItem key={index} primaryText={`${vertices} (${weight}) [${route.reliability}]`} />
      });
    }
  }

  renderChart = () => {
    return <canvas id="chart" width="200" height="200"></canvas>;
  }

  render() {
    const { vertexFrom, vertexTo } = this.props.logger.routesInfo;
    const { isBottomDrawerOpened, canvasMode, trafficSimulationAlgorithm } = this.state;

    return (
      <div className={"tools tools-wrapper " + (this.state.isBottomDrawerOpened ? "tools-wrapper-opened" : "")}>
        <div className="tools-panel">
          <Toolbar>

            <ToolbarGroup firstChild={true}>
              <DropDownMenu
                value={canvasMode}
                iconStyle={{ fill: "#666" }}
                onChange={(event, index, value) => this.setState({ canvasMode: value })}
              >
                <MenuItem value={1} primaryText="Simulation mode" />
                <MenuItem value={2} primaryText="Moving mode" />
                <MenuItem value={3} primaryText="Linking mode" />
              </DropDownMenu>
              {this.renderCanvasVerticeNames("From", this.state.vertexFrom || vertexFrom, this.handleSelectVertexFromNameChange)}
              {this.renderCanvasVerticeNames("To", this.state.vertexTo || vertexTo, this.handleSelectVertexToNameChange)}
              <DropDownMenu
                value={trafficSimulationAlgorithm}
                iconStyle={{ fill: "#666" }}
                onChange={(event, index, value) => this.setState({ trafficSimulationAlgorithm: value })}
              >
                <MenuItem value={"default"} primaryText="Default algorithm" />
                <MenuItem value={"custom"} primaryText="Custom algorithm" />
              </DropDownMenu>
            </ToolbarGroup>

            <ToolbarGroup>
              <FloatingActionButton
                mini={true}
                onClick={this.handleAddButton}
              >
                <ContentAdd />
              </FloatingActionButton>
              <FloatingActionButton
                mini={true}
                style={{ marginLeft: 10 }}
                onClick={this.handleRemoveButton}
              >
                <ContentRemove />
              </FloatingActionButton>
              <ToolbarSeparator />
              <RaisedButton
                onTouchTap={this.handleNextStepClick}
                style={{ marginRight: 10 }}
                className="custom-btn-default"
                primary={true}
                label="Next step"
              />
              <RaisedButton
                onTouchTap={() => ({})}
                style={{ margin: 20 }}
                className="custom-btn-default"
                primary={true}
                label="Simulate"
              />
              <IconButton
                touch={true}
                onClick={() => this.setState({ isBottomDrawerOpened: !isBottomDrawerOpened })}
              >
                {
                  isBottomDrawerOpened ? <NavigationExpandMoreIcon /> : <NavigationExpandLessIcon />
                }
              </IconButton>
            </ToolbarGroup>
          </Toolbar>


          <Sections {...this.props.logger} />
          <div className="settings">
            <div className="btn-add-remove-container">

            </div>



            {
              //   <RaisedButton
              //   label="Get Matrix"
              //   className="custom-btn-default"
              //   secondary={true}
              //   onClick={this.handleGetTransformedMatrix}
              // />
            }


            {/*<RaisedButton
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
              anchorOrigin={{ "horizontal": "middle", "vertical": "top" }}
              targetOrigin={{ "horizontal": "middle", "vertical": "bottom" }}
              onRequestClose={this.handlePopoverClick}
            >
              <Menu>
                {this.renderPaths()}
              </Menu>
            </Popover>

            <RaisedButton
              onTouchTap={this.handleReportsClick}
              className="custom-btn-default"
              disabled={this.state.isRoutesButtonDisabled}
              primary={true}
              label="Render Report"
            />


            <RaisedButton
              onTouchTap={this.handleChartClick}
              className="custom-btn-default"
              disabled={this.state.isRoutesButtonDisabled}
              primary={true}
              label="Show Chart"
            />*/}




            {/*<div>{this.renderChart()}</div>*/}
          </div>



        </div>
      </div>
    );
  }
}