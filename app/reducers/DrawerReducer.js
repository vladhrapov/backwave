import { types } from "../constants/ActionTypes";
import { initialState } from "./";

export default function drawerReducer(state = initialState.drawer, action) {
  switch (action.type) {
    case types.TOGGLE_DRAWER:
      console.log("action.drawer: ", action.drawer);
      return { ...action.drawer };
    default:
      return state;
  }
}
