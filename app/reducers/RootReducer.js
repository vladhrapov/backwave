import { combineReducers } from "redux";
import drawer from "./DrawerReducer";
import dialog from "./DialogReducer";
import canvas from "./CanvasReducer";

const rootReducer = combineReducers({
  drawer,
  dialog,
  canvas
});

export default rootReducer;
