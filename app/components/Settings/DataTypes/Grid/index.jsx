import React, { Component } from 'react';
import { Table } from 'material-ui/Table';

import { renderHeader } from "./Header";
import { renderBody } from "./Body";
import { renderFooter } from "./Footer";

import { styles } from "../constants";

export default class Grid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      height,
      fixedHeader,
      selectable,
      multiSelectable,
      callbacks
    } = this.props;

    return (
      <Table
        height={height}
        fixedHeader={fixedHeader}
        selectable={selectable}
        multiSelectable={multiSelectable}
      >
        {renderHeader({ ...this.props })}
        {renderBody({ ...this.props }, callbacks)}
        {renderFooter({ ...this.props }, callbacks)}
      </Table>
    );
  }
}