import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GridList, GridTile } from 'material-ui';
import { VictoryChart, VictoryBar } from 'victory';
import { Chart, Bar, defaults } from 'react-chartjs-2';

import * as LoggerActions from "../../actions/LoggerActions";

import "./assets/_styles.scss";

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

    this.data = canvasSrv.mapCharts(logger);
  }

  renderBar = (i, index) => {
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

    let { custom: customAlgo, default: defaultAlgo } = this.data.lostPackets;

    let customCount = customAlgo.count[Object.keys(customAlgo.count)[index]];
    let defaultCount = defaultAlgo.count[Object.keys(defaultAlgo.count)[index]];

    let data = {
      labels: ["Default", "Custom"],
      datasets: [{
        label: '# of lost packets',
        data: [defaultCount, customCount, 0, 200],
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
          maintainAspectRatio: false
        }}
      >
      </Bar>
    );
  }

  render() {
    return (
      <div className="charts-container">
        {
          [0, 2, 4].map((i, index) => (
            <div
              className="chart-wrapper"
              key={i}
            >
              {this.renderBar(i, index)}
            </div>
          ))
        }
      </div>
    );
  }
}
