import React from "react";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';


export default function Traffic({
  handleStateChange,
  isDistributionAutomatic,
  algorithmType,
  settings
}) {
  return (
    <Paper style={{ padding: 35, margin: 45 }}>
      <h2>Traffic distribution settings</h2>
      <div className="global-row">
        <Toggle
          label="Automatic traffic distribution"
          style={{ marginBottom: 16, width: 250 }}
          defaultToggled={isDistributionAutomatic || settings.isDistributionAutomatic}
          onToggle={(event, isDistributionAutomatic) => handleStateChange(event, "isDistributionAutomatic", isDistributionAutomatic)}
        />
      </div>
      <div className="global-row">
        <SelectField
          floatingLabelText="Algorithm type"
          value={algorithmType || settings.algorithmType}
          onChange={(event, key, algorithmType) => handleStateChange(event, "algorithmType", algorithmType)}
        >
          <MenuItem value={1} primaryText="Wave algorithm" />
          <MenuItem value={2} primaryText="Backwave algorithm" />
        </SelectField>
      </div>
    </Paper >
  );
}
