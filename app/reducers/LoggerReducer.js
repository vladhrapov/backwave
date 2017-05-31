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
    case "LOG_UPDATED_ROUTES_INFO":
      return {
        ...state,
        routesInfo: {
          ...action.payload
        }
      }
    case "LOG_PACKETS_INFO":
      return {
        ...state,
        packetsInfo: {
          pending: [
            ...action.payload
          ],
          sent: [
            ...state.packetsInfo.sent,
            ...action.payload.filter(packet => !!packet.isFinishVertex)
          ]
        }
      };
    case "LOG_QUEUE_INFO":
      return {
        ...state,
        queueInfo: [
          ...action.payload
        ]
      };
    default:
      return state;
  }
}
