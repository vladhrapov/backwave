import { combineReducers } from "redux";
import canvas from "./CanvasReducer";
import dataTypes from "./DataTypesReducer";
import settings from "./SettingsReducer";
import logger from "./LoggerReducer";

export const initialState = {
  canvas: [],
  dataTypes: [],
  settings: {
    isDrawerOpened: false,
    isDialogOpened: false,
    dialogType: "",
    canvasLoadedSchema: ""
  },
  logger: {
    routesInfo: {},
    packetsInfo: {
      pending: [],
      sent: []
    },
    // packetsInfo: [],
    queueInfo: []
  }
}

export const rootReducer = combineReducers({
  canvas,
  dataTypes,
  settings,
  logger
});
