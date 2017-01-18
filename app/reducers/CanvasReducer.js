import { types } from "../constants/ActionTypes";
import InitialState from "./InitialState";

export default function canvasReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_CANVAS_LIST:
      return [
        ...action.canvasList
      ];
    case types.SAVE_CANVAS_INFO:
      return {
        ...state,
        ...action.canvasInfo
      };
    default:
      return state;
  }
}
