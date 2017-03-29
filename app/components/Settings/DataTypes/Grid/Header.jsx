import React from "react";
import { TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

import { styles, headerRowData } from "../constants";

const renderHeaderColumn = (column, index) => {
  return (
    <TableHeaderColumn
      key={index}
      colSpan={column.colSpan || "1"}
      tooltip={column.tooltip || ""}
      style={column.style || {}}
    >
      {column.contentText}
    </TableHeaderColumn>
  );
};

const renderRows = () => {
  return headerRowData.map((row, index) => {
    return (
      <TableRow key={index}>
        {row.columns.map((column, index) => renderHeaderColumn(column, index))}
      </TableRow>
    );
  });
};

export const renderHeader = (props) => {
  let { showCheckboxes, enableSelectAll } = props;

  return (
    <TableHeader
      displaySelectAll={showCheckboxes}
      adjustForCheckbox={showCheckboxes}
      enableSelectAll={enableSelectAll}
    >
      {renderRows()}
    </TableHeader>
  );
};