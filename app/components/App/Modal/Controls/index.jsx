import React from "react";
import FlatButton from "material-ui/FlatButton";

export function renderDialogControls({ handler, submitText, handleDialogClose }) {
  return [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={handleDialogClose}
    />,
    <FlatButton
      label={submitText}
      primary={true}
      keyboardFocused={true}
      onTouchTap={handler}
    />,
  ];
}