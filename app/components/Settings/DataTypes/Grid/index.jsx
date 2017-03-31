import React, { Component } from 'react';
import { Table } from 'material-ui/Table';

import { renderHeader } from "./Header";
import { renderBody } from "./Body";
import { renderFooter } from "./Footer";

import { styles } from "../constants";

export default function Grid({
  height,
  fixedHeader,
  selectable,
  multiSelectable,
  handleTableCellUpdate,
  handleAddNewDataType,
  handleRemoveDataType,
  ...props
}) {
    return (
      <Table
        height={height}
        fixedHeader={fixedHeader}
        selectable={selectable}
        multiSelectable={multiSelectable}
      >
        {renderHeader(props)}
        {renderBody(props, { handleTableCellUpdate, handleRemoveDataType })}
        {renderFooter(props, { handleTableCellUpdate, handleAddNewDataType })}
      </Table>
    );
}