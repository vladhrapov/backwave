import React from "react";
import TextField from "material-ui/TextField";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";


export function renderRadioGroupBody({ canvas, handleCheckRadio }) {
  let radios;

  if (canvas && canvas.length) {
    radios = canvas.map((item, index) => {
      return (
        <RadioButton
          className="radio-btn"
          key={index}
          value={item.key}
          label={item.name}
          onClick={handleCheckRadio}
        />
      );
    });
  }

  return (
    <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
      {radios}
    </RadioButtonGroup>
  );
}

export function renderTextBody({ handleInputChange, defaultValue, errorMessage }) {
  return (
    <TextField
      hintText="Hint Text"
      floatingLabelText="Floating Label Text"
      defaultValue={defaultValue}
      errorText={errorMessage}
      onChange={handleInputChange}
    />
  );
}