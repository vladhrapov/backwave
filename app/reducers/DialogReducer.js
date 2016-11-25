import { types } from "../constants/ActionTypes";
import InitialState from "./InitialState";

export default function dialogReducer(state = InitialState.dialog, action) {
  switch (action.type) {
    case types.TOGGLE_DIALOG:
      console.log("TOGGLE_DIALOG: ", action);
      return Object.assign({}, action.dialog);
    default:
      return state;
  }
}
