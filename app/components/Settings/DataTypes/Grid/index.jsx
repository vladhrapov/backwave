import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

import * as DataTypesActions from "../../../../actions/DataTypesActions";

import { orange500, blue500, cyan500 } from 'material-ui/styles/colors';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
  floatingLabelStyle: {
    color: cyan500,
  },
  floatingLabelFocusStyle: {
    color: cyan500,
  },
  widthAutoTextField: {
    width: "100%"
  },
  rowTextCenter: {
    textAlign: "center"
  }
};

const style = {
  margin: 12,
};

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
export default class Grid extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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
  }


  // handleInputChange = (event) => {
  //   let { name, value } = event.target;

  //   this.setState({ [name]: value });
  //   console.log("this.state::::", this.state);
  // };

  setUpdatedTable(row, value, editedFieldName, editedFieldValue) {
    let newRow = { ...row, [editedFieldName]: value },
      rowToUpdate = this.state.updatedTable.filter(row => row.id == newRow.id);

    if (rowToUpdate.length) {
      let newTable = [...this.state.updatedTable].map(row => {
        if (row.id == newRow.id) return { ...newRow };

        return row;
      });

      this.setState((prevState, props) => ({ updatedTable: [...newTable] }));
    }
    else {
      this.setState((prevState, props) => ({ updatedTable: [...prevState.updatedTable, newRow] }));
    }

    console.log("ROWNUM: ___ ", newRow);
  }

  handleTableCellUpdate = (event, row, editedFieldName, editedFieldValue) => {
    let { name, value } = event.target;

    this.setState({ [name]: value });

    if (row && editedFieldName && editedFieldValue) {
      this.setUpdatedTable(row, value, editedFieldName, editedFieldValue);
    }
  }

  handleAddNewDataType = (event) => {
    const { type, minAmount, maxAmount, color } = this.state,
      { dataTypes, dataTypesActions } = this.props,
      id = +dataTypes[dataTypes.length - 1].id + 1;

    this.setState((prevState, props) => ({ id: id + 1, type: "", minAmount: "", maxAmount: "", color: "" }));
    // this.setState({ id: "" });

    dataTypesActions.addDataType({ id, type, minAmount, maxAmount, color });
  }

  handleTableRowClick = (event, rowNum) => {
    console.log(`Row number clicked`, event.target, " -- ", rowNum);
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
    return (
      <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="8" tooltip="Super Header" style={{ textAlign: 'center' }}>
                Super Header
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="The data type name" colSpan="2">Data type</TableHeaderColumn>
              <TableHeaderColumn tooltip="The minimum amount of the type of data">Minimum amount</TableHeaderColumn>
              <TableHeaderColumn tooltip="The maximum amount of the type of data">Maximum amount</TableHeaderColumn>
              <TableHeaderColumn tooltip="The color of the packet">Packet color</TableHeaderColumn>
              <TableHeaderColumn colSpan="2" style={styles.rowTextCenter}></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.props.dataTypes.map((row, index) => {
              if (!row) return;
              //onTouchTap = {(event) => this.handleTableRowClick(event, row)}
              return (<TableRow key={index} >
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn colSpan="2">
                  <TextField
                    name={`type_${index}`}
                    value={this.state[`type_${index}`] || row.type}
                    underlineShow={false}
                    style={styles.widthAutoTextField}
                    onChange={(event) => this.handleTableCellUpdate(event, row, "type", this.state[`type_${index}`])}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    name={`minAmount_${index}`}
                    value={this.state[`minAmount_${index}`] || row.minAmount}
                    underlineShow={false}
                    style={styles.widthAutoTextField}
                    onChange={(event) => this.handleTableCellUpdate(event, row, "minAmount", this.state[`minAmount_${index}`])}
                  />
                  </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    name={`maxAmount_${index}`}
                    value={this.state[`maxAmount_${index}`] || row.maxAmount}
                    underlineShow={false}
                    style={styles.widthAutoTextField}
                    onChange={(event) => this.handleTableCellUpdate(event, row, "maxAmount", this.state[`maxAmount_${index}`])}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    name={`color_${index}`}
                    value={this.state[`color_${index}`] || row.color}
                    underlineShow={false}
                    style={styles.widthAutoTextField}
                    onChange={(event) => this.handleTableCellUpdate(event, row, "color", this.state[`color_${index}`])}
                  />
                </TableRowColumn>
                <TableRowColumn colSpan="2" style={styles.rowTextCenter}>
                  <RaisedButton label="Edit" primary={true} style={style} />
                  <RaisedButton label="Delete" primary={true} style={style} />
                </TableRowColumn>
              </TableRow>)
            })}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>
                <TextField
                  name="id"
                  floatingLabelText="Id"
                  disabled={true}
                  value={this.props.dataTypes.length}
                  onChange={(event) => this.handleTableCellUpdate(event)}
                />
              </TableRowColumn>
              <TableRowColumn colSpan="2">
                <TextField
                  name="type"
                  floatingLabelText="Data type"
                  floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  style={styles.widthAutoTextField}
                  value={this.state.type}
                  onChange={(event) => this.handleTableCellUpdate(event)}
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  name="minAmount"
                  floatingLabelText="Minimum amount"
                  floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  style={styles.widthAutoTextField}
                  value={this.state.minAmount}
                  onChange={(event) => this.handleTableCellUpdate(event)}
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  name="maxAmount"
                  floatingLabelText="Maximum amount"
                  floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  style={styles.widthAutoTextField}
                  value={this.state.maxAmount}
                  onChange={(event) => this.handleTableCellUpdate(event)}
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  name="color"
                  floatingLabelText="Packet color"
                  floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  style={styles.widthAutoTextField}
                  value={this.state.color}
                  onChange={(event) => this.handleTableCellUpdate(event)}
                />
              </TableRowColumn>
              <TableRowColumn colSpan="2" style={styles.rowTextCenter}>
                <RaisedButton label="Add" primary={true} style={style} onTouchTap={this.handleAddNewDataType} />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
        
        <RaisedButton label="Save" primary={true} onTouchTap={this.handleSaveClick} />
      </div>
    );
  }
}