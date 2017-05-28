import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui';
import { VictoryChart, VictoryBar } from 'victory';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

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

  render() {
    return (
      <GridList>
      {
        [1,2,3,4,5,6].map((i) => (
          <GridTile
            key={i}
            title={i}
          >
            {chart}
          </GridTile>
        ))
      }
      </GridList>
    );
  }
}
