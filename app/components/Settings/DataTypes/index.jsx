import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RaisedButton from 'material-ui/RaisedButton';

import * as DataTypesActions from "../../../actions/DataTypesActions";

import Grid from "./Grid";

function mapStateToProps(state, ownProps) {
  return {
    dataTypes: state.dataTypes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dataTypesActions: bindActionCreators(DataTypesActions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class DataTypes extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    fixedHeader: true,
    stripedRows: false,
    showRowHover: false,
    selectable: false,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false,
    height: '60vh',
    id: "",
    type: "",
    minAmount: "",
    maxAmount: "",
    color: "",
    updatedTable: []
  };

  handleTableCellUpdate = (event, row, editedFieldName, editedFieldValue) => {
    let { name, value } = event.target;

    this.setState({ [name]: value });

    if (row) {
      this.setUpdatedTable(row, value, editedFieldName, editedFieldValue);
    }
  }

  setUpdatedTable(row, value, editedFieldName, editedFieldValue) {
    let rowToUpdate = this.state.updatedTable.filter(utrow => utrow.id == row.id);

    if (rowToUpdate.length) {
      let newTable = [...this.state.updatedTable].map(utrow => {
        if (utrow.id == row.id) return { ...utrow, [editedFieldName]: value };

        return utrow;
      });

      this.setState((prevState, props) => ({ updatedTable: [...newTable] }));
      console.log("TABLENEW: ___ ", newTable);
    }
    else {
      let newRow = { ...row, [editedFieldName]: value };

      this.setState((prevState, props) => ({ updatedTable: [...prevState.updatedTable, newRow] }));
      console.log("NEWROW: ___ ", newRow);
    }
  }

  handleAddNewDataType = (event) => {
    const { type, minAmount, maxAmount, color } = this.state,
      { dataTypes, dataTypesActions } = this.props,
      id = +dataTypes[dataTypes.length - 1].id + 1;

    this.setState((prevState, props) => ({ id: id + 1, type: "", minAmount: "", maxAmount: "", color: "" }));

    dataTypesActions.addDataType({ id, type, minAmount, maxAmount, color });
  }

  handleSaveClick = () => {
    const { dataTypes, dataTypesActions } = this.props;

    dataTypesActions.saveDataTypes([...this.state.updatedTable]);
  }

  shouldComponentUpdate() {
    console.log("shouldComponentUpdate::::this.state::::", this.state);

    return true;
  }

  componentWillMount() {
    const { dataTypes, dataTypesActions } = this.props;

    dataTypesActions.loadDataTypes();
  }

  render() {
    const { handleTableCellUpdate, handleAddNewDataType } = this;

    return (
      <div>
        <Grid
          {...this.state}
          {...this.props}
          callbacks={{ handleTableCellUpdate, handleAddNewDataType }}
        />
        <RaisedButton label="Save" primary={true} onTouchTap={this.handleSaveClick} />
      </div>
    );
  }
}