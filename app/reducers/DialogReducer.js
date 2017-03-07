import { types } from "../constants/ActionTypes";
import { initialState } from "./";

export default function dialogReducer(state = initialState.dialog, action) {
  switch (action.type) {
    case types.TOGGLE_DIALOG:
      console.log("TOGGLE_DIALOG: ", action);
      return {
        ...action.dialog
      };
    default:
      return state;
  }
}
