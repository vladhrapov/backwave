import { types } from "../constants/ActionTypes";
import { initialState } from "./";

export default function settingsReducer(state = initialState.settings, action) {
  switch (action.type) {
    case types.TOGGLE_DIALOG_SUCCEEDED:
      console.log("TOGGLE_DIALOG_SUCCEEDED: ", action);
      return {
        ...state,
        ...action.payload
      };
    case types.TOGGLE_DRAWER_SUCCEEDED:
      console.log("TOGGLE_DRAWER_SUCCEEDED: ", action);
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
