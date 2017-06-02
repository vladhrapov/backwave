import React from "react";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';


export default function Traffic({
  handleStateChange,
  isDistributionAutomatic,
  algorithmType,
  simulationIterationsCount,
  changesFrequency,
  settings
}) {
  return (
    <Paper style={{ padding: 35, margin: "0 45px 45px 45px" }}>
      <h2>Traffic distribution settings</h2>
      <div className="global-row">
        <div className="global-col-6">
          <Toggle
            label="Automatic traffic distribution"
            style={{ marginBottom: 16, width: 290 }}
            defaultToggled={isDistributionAutomatic || settings.isDistributionAutomatic}
            onToggle={(event, isDistributionAutomatic) => handleStateChange(event, "isDistributionAutomatic", isDistributionAutomatic)}
          />
        </div>
        <div className="global-col-6">
          Changes frequency:
          <TextField
            hintText="Please fill frequency"
            value={changesFrequency || settings.changesFrequency}
            onChange={(event, changesFrequency) => handleStateChange(event, "changesFrequency", changesFrequency)}
          />
        </div>
      </div>
      <div className="global-row">
        <div className="global-col-6">
          <SelectField
            floatingLabelText="Algorithm type"
            value={algorithmType || settings.algorithmType}
            onChange={(event, key, algorithmType) => handleStateChange(event, "algorithmType", algorithmType)}
          >
            <MenuItem value={1} primaryText="Wave algorithm" />
            <MenuItem value={2} primaryText="Backwave algorithm" />
          </SelectField>
        </div>
        <div className="global-col-6">
          Simulation iteration count:
          <TextField
              hintText="Please fill count"
              value={simulationIterationsCount || settings.simulationIterationsCount}
              onChange={(event, simulationIterationsCount) => handleStateChange(event, "simulationIterationsCount", simulationIterationsCount)}
            />
        </div>
      </div>
    </Paper>
  );
}
