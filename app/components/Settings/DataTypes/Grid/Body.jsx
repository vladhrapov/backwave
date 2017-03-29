import React from "react";
import { TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { styles, bodyColumnData } from "../constants";

const renderRowColumnContent = (props, callbacks, row, rowIndex, column, index) => {
  const { handleTableCellUpdate } = callbacks,
    { name } = column;

  if (!index) return rowIndex;

  if (name) {
    return (
      <TextField
        name={`${name}_${rowIndex}`}
        value={props[`${name}_${rowIndex}`] || row[name]}
        underlineShow={column.underlineShow || false}
        style={column.style}
        onChange={(event) => handleTableCellUpdate(event, row, name, props[`${name}_${rowIndex}`])}
      />
    );
  }

  return (
    <RaisedButton
      label={column.label || ""}
      primary={column.primary || true}
      style={column.style}
    />
  );
};

const renderRowColumns = (props, callbacks, row, rowIndex) => {
  return bodyColumnData.map((column, index) => {
    return (
      <TableRowColumn
        key={index}
        colSpan={column.colSpan || "1"}
        style={column.columnStyle || {}}
      >
        {renderRowColumnContent(props, callbacks, row, rowIndex, column, index)}
      </TableRowColumn>
    );
  });
};

const renderRows = (props, callbacks) => {
  return props.dataTypes
    .filter(row => !!row)
    .map((row, index) => {
      if (!row) return;

      return (
        <TableRow key={index} >
          {renderRowColumns(props, callbacks, row, index)}
        </TableRow>
      );
    });
};

export const renderBody = (props, callbacks) => {
  const {
    showCheckboxes,
    deselectOnClickaway,
    showRowHover,
    stripedRows
  } = props;

  return (
    <TableBody
      displayRowCheckbox={showCheckboxes}
      deselectOnClickaway={deselectOnClickaway}
      showRowHover={showRowHover}
      stripedRows={stripedRows}
    >
      {renderRows(props, callbacks)}
    </TableBody>
  );
};