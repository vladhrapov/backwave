import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui';
import { VictoryChart, VictoryBar } from 'victory';
import { Chart, Bar, defaults } from 'react-chartjs-2';

import "./assets/_styles.scss";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

const data2 = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]
};

// defaults.global.animationSteps = 50;
// defaults.global.tooltipYPadding = 16;
// defaults.global.tooltipCornerRadius = 0;
// defaults.global.tooltipTitleFontStyle = "normal";
// defaults.global.tooltipFillColor = "rgba(0,160,0,0.8)";
// defaults.global.animationEasing = "easeOutBounce";
// defaults.global.responsive = true;
// // Chart.defaults.global.scaleLineColor = "black";
// defaults.global.scaleFontSize = 16;

Chart.defaults.global.maintainAspectRatio = false;
defaults.global.maintainAspectRatio = false;

const chart = (
  <VictoryChart>
    <VictoryBar
      data={data}
      x="quarter"
      y="earnings"
    />
  </VictoryChart>
);

export default class Charts extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    height: 400,
    width: 400
  }

  componentWillMount() {
    Chart.defaults.global.maintainAspectRatio = false;
    defaults.global.maintainAspectRatio = false;
  }

  componentDidMount() {
    // defaults.global.animationSteps = 50;
    // defaults.global.tooltipYPadding = 16;
    // defaults.global.tooltipCornerRadius = 0;
    // defaults.global.tooltipTitleFontStyle = "normal";
    // defaults.global.tooltipFillColor = "rgba(0,160,0,0.8)";
    // defaults.global.animationEasing = "easeOutBounce";
    // defaults.global.responsive = true;
    // // Chart.defaults.global.scaleLineColor = "black";
    // Chart.defaults.global.scaleFontSize = 16;
    Chart.defaults.global.maintainAspectRatio = false;
    defaults.global.maintainAspectRatio = false;
  }

  render() {
    Chart.defaults.global.maintainAspectRatio = false;
    defaults.global.maintainAspectRatio = false;

    return (
      <div className="charts-container">
        {
          [1, 2, 3, 4, 5, 6].map((i) => (
            <div
              className="chart-wrapper"
              key={i}
            >
              {/*{chart}*/}
              <Bar
                data={data2}
                ref='chart'
                width={this.state.width}
                height={this.state.height}
                options={{
                  maintainAspectRatio: false
                }}
              >
              </Bar>
            </div>
          ))
        }
        {/*<Bar
          data={data2}
          ref='chart'
          width={50}
          height={50}
          options={{
            maintainAspectRatio: false
          }}
        />*/}
      </div>
    );
  }
}
