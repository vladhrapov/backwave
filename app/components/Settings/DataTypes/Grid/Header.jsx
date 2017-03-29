import React from "react";
import { TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

import { styles, headerRowData } from "../constants";

const renderHeaderColumn = (column) => {
  return (
    <TableHeaderColumn
      colSpan={column.colSpan || "1"}
      tooltip={column.tooltip || ""}
      style={column.style || {}}
    >
      {column.contentText}  
    </TableHeaderColumn>
  );
};

const renderRows = () => {
  return headerRowData.columns.map((column, index) => {
    return (
      <TableRow key={index}>
        {renderHeaderColumn(column)}
      </TableRow>
    );
  });
};

export const Header = (props) => {
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