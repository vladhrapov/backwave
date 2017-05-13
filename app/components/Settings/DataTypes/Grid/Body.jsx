import React from "react";
import { TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import ColorIcon from "../../../Shared/ColorIcon";

import { styles, bodyColumnData } from "../constants";

const renderRowColumnContent = (props, callbacks, row, column, index) => {
  const { handleTableCellUpdate, handleRemoveDataType } = callbacks,
    { id } = row,
    { name } = column;

  if (!index) return id;

  if (name) {
    const Field = <TextField
      name={`${name}_${id}`}
      value={props[`${name}_${id}`] || row[name]}
      underlineShow={column.underlineShow || false}
      style={column.style}
      onChange={(event) => handleTableCellUpdate(event, row, name, props[`${name}_${id}`])}
    />

    if (name === "color") {
      return (
        <div>
          <ColorIcon
            color={props[`${name}_${id}`] || row[name]}
          />
          {Field}
        </div>
      );
    }

    return Field;
  }

  return (
    <RaisedButton
      label={column.label || ""}
      primary={column.primary || true}
      style={column.style}
      onTouchTap={(event) => handleRemoveDataType(event, id)}
    />
  );
};

const renderRowColumns = (props, callbacks, row) => {
  return bodyColumnData.map((column, index) => {
    return (
      <TableRowColumn
        key={index}
        colSpan={column.colSpan || "1"}
        style={column.columnStyle || {}}
      >
        {renderRowColumnContent(props, callbacks, row, column, index)}
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
          {renderRowColumns(props, callbacks, row)}
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