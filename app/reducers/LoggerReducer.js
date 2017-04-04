import { types } from "../constants/ActionTypes";
import { initialState } from "./";

export default function loggerReducer(state = initialState.logger, action) {
  switch (action.type) {
    case "LOG_ROUTES_INFO":
      return {
        ...state,
        routesInfo: {
          ...action.payload
        }
      };
    default:
      return state;
  }
}
