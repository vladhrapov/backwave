import React from "react";
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';


export default function Schema({
  handleStateChange,
  vertexName,
  vertexShape,
  isBindToRange,
  lineMinValue,
  lineMaxValue,
  settings,
}) {
  return (
    <Paper style={{ padding: 35, margin: 45 }}>
      <h2>Schema settings</h2>
      <div className="global-row">
        <div className="global-col-6">
          Vertex name:
          <TextField
            hintText="Please fill vertex name (one letter)"
            value={vertexName || settings.vertexName}
            onChange={(event, vertexName) => handleStateChange(event, "vertexName", vertexName)}
          />
        </div>
        <div className="global-col-6">
          Vertex shape:
          <SelectField
            floatingLabelText="Shape"
            value={vertexShape || settings.vertexShape}
            onChange={(event, key, vertexShape) => handleStateChange(event, "vertexShape", vertexShape)}
          >
            <MenuItem value={1} primaryText="Circle" />
          </SelectField>
        </div>
      </div>
      <div className="global-row">
        <div className="global-col-12 center">
          <Toggle
            label="Bind canvas to range vertices"
            style={{ margin: "16px 0", width: 290 }}
            defaultToggled={isBindToRange || settings.isBindToRange}
            onToggle={(event, isBindToRange) => handleStateChange(event, "isBindToRange", isBindToRange)}
          />
        </div>
      </div>
      <div className="global-row">
        <div className="global-col-6">
        Random line value from:
        <TextField
          hintText="Hint Text"
          floatingLabelText="Floating Label Text"
          value={lineMinValue || settings.lineMinValue}
          onChange={(event, lineMinValue) => handleStateChange(event, "lineMinValue", lineMinValue)}
        />
        </div>
        <div className="global-col-6">
        to:
        <TextField
          hintText="Hint Text"
          floatingLabelText="Floating Label Text"
          value={lineMaxValue || settings.lineMaxValue}
          onChange={(event, lineMaxValue) => handleStateChange(event, "lineMaxValue", lineMaxValue)}
        />
          </div>
      </div>
    </Paper>
  );
}