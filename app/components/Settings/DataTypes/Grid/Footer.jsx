import React from "react";
import { TableFooter, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { styles, footerColumnData } from "../constants";

const renderRowColumnContent = (props, callbacks, column) => {
  const { handleTableCellUpdate, handleAddNewDataType } = callbacks;

  if (column.name) {
    const getValue = (props, column) => {
      if (column.name == "id") return props.dataTypes.length;

      return props[column.name] || "";
    };

    return (
      <TextField
        name={column.name}
        floatingLabelText={column.floatingLabelText}
        floatingLabelStyle={column.floatingLabelStyle || {}}
        floatingLabelFocusStyle={column.floatingLabelFocusStyle || {}}
        style={column.style || {}}
        disabled={column.disabled || false}
        value={getValue(props, column)}
        onChange={(event) => handleTableCellUpdate(event)}
      />
    );
  }

  return (
    <RaisedButton
      label={column.label}
      primary={column.primary || false}
      style={column.style || {}}
      onTouchTap={handleAddNewDataType}
    />
  );
};

const renderRowColumns = (props, callbacks) => {
  return footerColumnData.map((column, index) => {
    return (
      <TableRowColumn
        key={index}
        colSpan={column.colSpan || "1"}
        style={column.columnStyle || {}}
      >
        {renderRowColumnContent(props, callbacks, column)}
      </TableRowColumn>
    );
  });
};

export const Footer = (props, callbacks) => {
  const { showCheckboxes } = props;

  return (
    <TableFooter
      adjustForCheckbox={showCheckboxes}
    >
      <TableRow>
        {renderRowColumns(props, callbacks)}
      </TableRow>
    </TableFooter>
  );
};