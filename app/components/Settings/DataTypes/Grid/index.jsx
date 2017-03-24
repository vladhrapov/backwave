import React from 'react';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

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

const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
    selected: true,
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
    selected: true,
  },
  {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  },
];

export default class Grid extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '60vh',
    };
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({ height: event.target.value });
  };

  handleAddNewDataType = () => {

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
              <TableHeaderColumn colSpan="5" tooltip="Super Header" style={{ textAlign: 'center' }}>
                Super Header
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="The data type name">Data type</TableHeaderColumn>
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
            {tableData.map((row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
                <TableRowColumn colSpan="2">
                  <RaisedButton label="Edit" primary={true} style={style} />
                  <RaisedButton label="Delete" primary={true} style={style} />
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>
                <TextField
                  hintText="Id"
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Data type"
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Minimum amount"
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Maximum amount"
                />
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText="Packet color"
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