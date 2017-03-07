import { combineReducers } from "redux";
import drawer from "./DrawerReducer";
import dialog from "./DialogReducer";
import canvas from "./CanvasReducer";

export const initialState = {
  canvas: [],
  dialog: {},
  drawer: {}
}

export const rootReducer = combineReducers({
  drawer,
  dialog,
  canvas
});
