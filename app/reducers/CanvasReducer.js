import { types } from "../constants/ActionTypes";
import InitialState from "./InitialState";

export default function dialogReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_CANVAS_LIST:
      console.log("LOAD_CANVAS_LIST: ", action);
      return [
        ...state
      ];
    default:
      return state;
  }
}
