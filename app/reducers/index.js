import { combineReducers } from "redux";
import canvas from "./CanvasReducer";
import settings from "./SettingsReducer";

export const initialState = {
  canvas: [],
  settings: {
    isDrawerOpened: false,
    isDialogOpened: false,
    dialogType: ""
  }
}

export const rootReducer = combineReducers({
  canvas,
  settings
});
