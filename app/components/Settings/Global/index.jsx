import React, { Component } from "react";
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

import Paper from 'material-ui/Paper';

import "./assets/_styles.scss";

export default class Global extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    vertexShape: 1,
    algorithmType: 1
  }

  render() {
    return (
      <div className="global-container">
        Global settings
        1) Vertex naming+
        2) Vertex shape (optional)+
        3) Trafic distribution (step by step or in time)+
        4) Algorithm type+
        5) Bind canvas vertices to first/last+
        6) Random value for line (from - to)+
        <Paper style={{ padding: 35, margin: 45 }}>
          <h2>Schema settings</h2>
          <div className="global-row">
            Vertex name:
            <TextField
              hintText="Please fill vertex name (one letter)"
            />
            Vertex shape:
            <SelectField
              floatingLabelText="Frequency"
              value={this.state.vertexShape}
              onChange={this.handleChange}
            >
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
          </div>
          <div className="global-row">
            <Toggle
              label="Bind canvas to range vertices"
              style={{ marginBottom: 16, width: 250 }}
            />
          </div>
          <div className="global-row">
            Random line value from:
            <TextField
              hintText="Hint Text"
              floatingLabelText="Floating Label Text"
            />
            to:
            <TextField
              hintText="Hint Text"
              floatingLabelText="Floating Label Text"
            />
          </div>
        </Paper>
        <Paper style={{ padding: 35, margin: 45 }}>
          <h2>Trafic distribution settings</h2>
          <div className="global-row">
            <Toggle
              label="Automatic trafic distribution"
              style={{ marginBottom: 16, width: 250}}
            />
          </div>
          <div className="global-row">
            <SelectField
              floatingLabelText="Algorithm type"
              value={this.state.algorithmType}
              onChange={this.handleChange}
            >
              <MenuItem value={1} primaryText="Wave algorithm" />
              <MenuItem value={2} primaryText="Backwave algorithm" />
            </SelectField>
          </div>
        </Paper>
      </div>
    );
  }
} 