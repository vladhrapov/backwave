import React from "react";
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import Popover from 'material-ui/Popover/Popover';
import { Menu, MenuItem } from 'material-ui/Menu';
import Chart from 'chart.js'

// Services
import CanvasService from "../../../services/CanvasService";
import SettingsService from "../../../services/SettingsService";
import TransformationService from "../../../services/TransformationService";
import WaveAlgorithmService from "../../../services/WaveAlgorithmService";
import BackwaveAlgorithmService from "../../../services/BackwaveAlgorithmService";

export default class Tools extends React.Component {
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
    if (vertexFrom && vertexTo) {
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
    let { vertexFrom, vertexTo } = this.state;
    // let wa = new WaveAlgorithmService(1, 5);
    let wa = new WaveAlgorithmService(this.state.vertexFrom - 1, this.state.vertexTo - 1);
    this.waResult = wa.invoke();
    console.clear();
    console.log(this.waResult);
    CanvasService.drawRoutes(this.waResult, vertexFrom, vertexTo);

    this.routesInfo = this.settingsService.showRoutesInfo(this.waResult);
    this.setState({ isRoutesButtonDisabled: false });
  }

  handleBackWaveAlgorithmClick = () => {
    let { vertexFrom, vertexTo } = this.state;
    let bwa = new BackwaveAlgorithmService(this.state.vertexFrom - 1, this.state.vertexTo - 1);
    this.bwaResult = bwa.invoke();
    // console.clear();
    console.log(this.bwaResult);
    CanvasService.drawRoutes(this.bwaResult, vertexFrom, vertexTo);

    this.routesInfo = this.settingsService.showRoutesInfo(this.bwaResult);
    this.setState({ isRoutesButtonDisabled: false });
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

    if (popoverOpened) {
      this.setState({ popoverOpened: false, anchorEl: event.currentTarget });
    }
    else {
      this.setState({ popoverOpened: true, anchorEl: event.currentTarget });
    }

    return this.state.popoverOpened;
  }

  handleReportsClick = () => {
    let win = window.open("", "Title", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1150, height=900, top=0, left=0");
    win.document.body.innerHTML = "<h1 align='center'>Звіт</h1>";
    win.document.body.innerHTML += "<h2 align='center'>Знайдені маршрути</h2>";
    this.routesInfo.forEach((route, index) => {
      win.document.body.innerHTML += `<br /> ${index + 1})  ${route.vertices} (${route.weight}) [${route.reliability}]<br />`;
    });

    win.document.body.innerHTML += `<div><img src="${CanvasService.getCanvas().toDataURL("image/png")}" width="950" height="650" /></div> <br />`;
    win.document.body.innerHTML += `<div align='center'><img src="${this.myLineChart.toBase64Image()}" width="400" height="400" /></div>`;
    win.window.print();
    // win.window.close();    
  }

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
        />


        <div>{this.renderChart()}</div>

      </div>
    );
  }
}