import { initialState } from "./";

export default function canvasReducer(state = initialState.canvas, action) {
  switch (action.type) {
    case "LOAD_CANVAS_LIST_SUCCEEDED":
      return [
        ...action.payload
      ];
    case "SAVE_CANVAS_TO_LIST_SUCCEEDED":
      return [
        ...state,
        { ...action.payload }
      ];
    case "REMOVE_CANVAS_FROM_LIST_SUCCEEDED":
      return [
        ...state.filter(canvas => canvas.key != action.payload.name)
      ];
    // case types.SAVE_CANVAS_INFO:
    //   return {
    //     ...state,
    //     ...action.canvasInfo
    //   };
    default:
      return state;
  }
}