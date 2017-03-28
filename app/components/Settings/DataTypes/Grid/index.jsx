import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

import * as DataTypesActions from "../../../../actions/DataTypesActions";

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
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
      color: ""
    };
  }


  handleInputChange = (event) => {
    let { name, value } = event.target;

    this.setState({ [name]: value });
    console.log("this.state::::", this.state);
  };

  handleInputChange2 = (event, rowNum, editedFieldName, editedFieldValue) => {
    let { name, value } = event.target;

    let newRow = { ...rowNum, [editedFieldName]: editedFieldValue };

    this.setState({ [name]: value });
    console.log("this.state::::", this.state);

    console.log("ROWNUM: ___ ", newRow);
  }

  handleAddNewDataType = (event) => {
    const { type, minAmount, maxAmount, color } = this.state,
      { dataTypes, dataTypesActions } = this.props,
      id = +dataTypes[dataTypes.length - 1].id + 1;

    this.setState((prevState, props) => ({ id: +dataTypes[dataTypes.length - 1].id + 1, type: "", minAmount: "", maxAmount: "", color: "" }));
    // this.setState({ id: "" });

    dataTypesActions.addDataType({ id, type, minAmount, maxAmount, color });
  }

  handleTableRowClick = (event, rowNum) => {
    console.log(`Row number clicked`, event.target, " -- ", rowNum);
  }

  componentWillMount() {
    const { dataTypes, dataTypesActions } = this.props;

    dataTypesActions.loadDataTypes();

  }

  // componentDidMount() {
  //   const { dataTypes, dataTypesActions } = this.props;

  //   this.setState((prevState, props) => ({ id: +dataTypes[dataTypes.length - 1].id + 2 }));
  // }

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
              <TableHeaderColumn colSpan="2"></TableHeaderColumn>
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
                <TableRowColumn colSpan="2">{row.type}</TableRowColumn>
                <TableRowColumn><TextField name={`type_${index}`} value={this.state[`type_${index}`] || row.minAmount} onChange={(event) => this.handleInputChange2(event, row, "type", this.state[`type_${index}`])} /></TableRowColumn>
                <TableRowColumn>{row.maxAmount}</TableRowColumn>
                <TableRowColumn>{row.color}</TableRowColumn>
                <TableRowColumn colSpan="2">
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
                  hintText="Id"
                  disabled={true}
                  value={this.props.dataTypes.length}
                  onChange={this.handleInputChange}
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  name="type"
                  hintText="Data type"
                  value={this.state.type}
                  onChange={this.handleInputChange}
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  name="minAmount"
                  hintText="Minimum amount"
                  value={this.state.minAmount}
                  onChange={this.handleInputChange}
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  name="maxAmount"
                  hintText="Maximum amount"
                  value={this.state.maxAmount}
                  onChange={this.handleInputChange}
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  name="color"
                  hintText="Packet color"
                  value={this.state.color}
                  onChange={this.handleInputChange}
                />
              </TableRowColumn>
              <TableRowColumn>
                <RaisedButton label="Add" primary={true} style={style} onTouchTap={this.handleAddNewDataType} />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}