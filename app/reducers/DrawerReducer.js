import { types } from "../constants/ActionTypes";
import InitialState from "./InitialState";

export default function drawerReducer(state = InitialState.drawer, action) {
  switch (action.type) {
    case types.TOGGLE_DRAWER:
      console.log("action.drawer: ", action.drawer);
      return Object.assign({}, action.drawer);
    default:
      return state;
  }
}
