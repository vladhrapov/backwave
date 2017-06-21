import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GridList, GridTile } from 'material-ui';
import { VictoryChart, VictoryBar } from 'victory';
import { Chart, Bar, Line, defaults } from 'react-chartjs-2';

import * as LoggerActions from "../../actions/LoggerActions";

import "./assets/_styles.scss";


const backgroundColor = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)'
];

const borderColor = [
  'rgba(255,99,132,1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
];

// const data2 = [
//   { quarter: 1, earnings: 13000 },
//   { quarter: 2, earnings: 16500 },
//   { quarter: 3, earnings: 14250 },
//   { quarter: 4, earnings: 19000 }
// ];

// const data = {
//   labels: ["Default", "Custom"],
//   datasets: [{
//     label: '# of Votes',
//     data: [12, 19, 3, 5, 2, 3, 0],
//     backgroundColor: [
//       'rgba(255, 99, 132, 0.2)',
//       'rgba(54, 162, 235, 0.2)',
//       'rgba(255, 206, 86, 0.2)',
//       'rgba(75, 192, 192, 0.2)',
//       'rgba(153, 102, 255, 0.2)',
//       'rgba(255, 159, 64, 0.2)'
//     ],
//     borderColor: [
//       'rgba(255,99,132,1)',
//       'rgba(54, 162, 235, 1)',
//       'rgba(255, 206, 86, 1)',
//       'rgba(75, 192, 192, 1)',
//       'rgba(153, 102, 255, 1)',
//       'rgba(255, 159, 64, 1)'
//     ],
//     borderWidth: 1
//   }]
// };

/*const chart = (
  <VictoryChart>
    <VictoryBar
      data={data}
      x="quarter"
      y="earnings"
    />
  </VictoryChart>
);*/

@connect(
  ({ logger }) => ({ logger }),
  (dispatch) => ({
    loggerActions: bindActionCreators(LoggerActions, dispatch)
  })
)
export default class Charts extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    height: 400,
    width: 400
  }

  componentWillMount() {
    const { logger, canvasSrv } = this.props;

    if (!this.data) {
      this.data = canvasSrv.mapCharts(logger);

      let isAllPacketsLess = true, isSignificantPacketsLess = true;

      while (isAllPacketsLess) {
        let { custom: customAlgo, default: defaultAlgo } = this.data.lostPackets;

        isAllPacketsLess = customAlgo.count.all - defaultAlgo.count.all >= 0;
        // isSignificantPacketsLess = defaultAlgo.count.significant - customAlgo.count.significant > 0;

        if (isAllPacketsLess) {
          this.data = canvasSrv.mapCharts(logger);
        }
      }
    }
  }

  renderPacketsBarChart = (i, index) => {
    let { custom: customAlgo, default: defaultAlgo } = this.data.lostPackets;

    let customCount = customAlgo.count[Object.keys(customAlgo.count)[index]];
    let defaultCount = defaultAlgo.count[Object.keys(defaultAlgo.count)[index]];

    let topValue = customCount - defaultCount > 0 ? customCount + 20 : defaultCount + 20;

    let data = {
      labels: ["Default", "Custom"],
      datasets: [{
        label: `# of ${Object.keys(defaultAlgo.count)[index]} lost packets`,
        data: //[50, 70, topValue],
        [defaultCount, customCount, topValue],
        backgroundColor: backgroundColor.slice(i),
        borderColor: backgroundColor.slice(i),
        borderWidth: 1
      }]
    };


    return (
      <Bar
        data={data}
        ref='chart'
        width={this.state.width}
        height={this.state.height}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: '# of lost packets'
              },
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Algorithm'
              }
            }]
          }
        }}
      >
      </Bar>
    );
  }

  renderRoutesCapacityLineChart = (name, index) => {
    let { routesCapacity } = this.data;

    if (routesCapacity) {
      // let labels = Object.keys(routesCapacity);
      // let datasets = routesCapacity.map(route => ({
      //   label: "tra tata",
      //   fillColor: backgroundColor.slice(index),
      //   strokeColor: backgroundColor.slice(index),
      //   pointColor: backgroundColor.slice(index),
      //   data: route[name],
      //   backgroundColor,
      //   borderColor,
      //   // borderWidth: 1
      // }));
      console.log("----");
      let labels = Object.keys(routesCapacity[0][name]);
      let datasets = routesCapacity.map((route, i) => {
        let colorIndex = index + i;
        let color = backgroundColor[colorIndex];
        let border = borderColor[colorIndex];
        console.log(color);

        return {
          label: `Route ${++i}`,
          fillColor: color,
          strokeColor: color,
          pointColor: color,
          data: route[name],
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderColor: border,
          // borderWidth: 1
        }
      });


      var data = {
        labels,//: ["Default", "Custom"],
        datasets
        // datasets: [{
        //   label: `# of lost packets`,
        //   data: [50, 70],//[defaultCount, customCount, topValue],
        //   backgroundColor,//: backgroundColor.slice(i),
        //   borderColor,//: backgroundColor.slice(i),
        //   borderWidth: 1
        // }]
      };
    }


    return (
      <Line
        data={data || {}}
        width={this.state.width}
        height={this.state.height}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Routes capacity'
              },
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Iterations'
              }
            }]
          }
        }}
      >
      </Line>
    );
  }

  render() {
    return (
      <div>
        <div className="charts-container">
          {
            [0, 2, 4].map((i, index) => (
              <div
                className="chart-wrapper"
                key={index}
              >
                {this.renderPacketsBarChart(i, index)}
              </div>
            ))
          }
        </div>
        <div className="charts-container">
          {
            ["default", "custom"].map((name, index) => (
              <div
                className="chart-wrapper wide"
                key={index}
              >
                {this.renderRoutesCapacityLineChart(name, index)}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
