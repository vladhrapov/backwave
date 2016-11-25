import { types } from "../constants/ActionTypes";

export function toggleDialog(dialog) {
  return {
    type: types.TOGGLE_DIALOG,
    dialog
  };
}
