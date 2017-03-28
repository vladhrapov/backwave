import { combineReducers } from "redux";
import canvas from "./CanvasReducer";
import dataTypes from "./DataTypesReducer";
import settings from "./SettingsReducer";

export const initialState = {
  canvas: [],
  dataTypes: [],
  settings: {
    isDrawerOpened: false,
    isDialogOpened: false,
    dialogType: ""
  }
}

export const rootReducer = combineReducers({
  canvas,
  dataTypes,
  settings
});
