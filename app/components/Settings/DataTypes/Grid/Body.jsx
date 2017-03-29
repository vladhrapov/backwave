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
}

const renderRowColumns = (props, callbacks, row, rowIndex) => {
  return bodyColumnData.map((column, index) => {
    return (
      <TableRowColumn
        key={index}
        colSpan={column.colSpan || "1"}
      >
        {renderRowColumnContent(props, callbacks, row, rowIndex, column, index)}
      </TableRowColumn>
    );
  });
}

const renderRows = (props, callbacks) => {
  return props.dataTypes.map((row, index) => {
    if (!row) return;

    return (
      <TableRow key={index} >
        {renderRowColumns(props, callbacks, row, index)}
        <TableRowColumn style={styles.rowTextCenter}>

        </TableRowColumn>
      </TableRow>
    );
  });
}

export const Body = (props, callbacks) => {
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
}


/*
<TableRowColumn>{index}</TableRowColumn>
  <TableRowColumn colSpan="2">
    <TextField
      name={`type_${index}`}
      value={props[`type_${index}`] || row.type}
      underlineShow={false}
      style={styles.widthAutoTextField}
      onChange={(event) => handleTableCellUpdate(event, row, "type", props[`type_${index}`])}
    />
  </TableRowColumn>
  <TableRowColumn>
    <TextField
      name={`minAmount_${index}`}
      value={props[`minAmount_${index}`] || row.minAmount}
      underlineShow={false}
      style={styles.widthAutoTextField}
      onChange={(event) => handleTableCellUpdate(event, row, "minAmount", props[`minAmount_${index}`])}
    />
  </TableRowColumn>
  <TableRowColumn>
    <TextField
      name={`maxAmount_${index}`}
      value={props[`maxAmount_${index}`] || row.maxAmount}
      underlineShow={false}
      style={styles.widthAutoTextField}
      onChange={(event) => handleTableCellUpdate(event, row, "maxAmount", props[`maxAmount_${index}`])}
    />
  </TableRowColumn>
  <TableRowColumn>
    <TextField
      name={`color_${index}`}
      value={props[`color_${index}`] || row.color}
      underlineShow={false}
      style={styles.widthAutoTextField}
      onChange={(event) => handleTableCellUpdate(event, row, "color", props[`color_${index}`])}
    />
  </TableRowColumn>*/