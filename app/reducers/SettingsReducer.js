import { types } from "../constants/ActionTypes";
import { initialState } from "./";

export default function settingsReducer(state = initialState.settings, action) {
  switch (action.type) {
    case types.TOGGLE_DIALOG:
      return {
        ...state,
        ...action.payload
      };
    case types.TOGGLE_DRAWER:
      return {
        ...state,
        ...action.payload
      };
    case "REFRESH_CANVAS_SCHEMA":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
