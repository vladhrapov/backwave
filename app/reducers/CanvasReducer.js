import { initialState } from "./";

export default function canvasReducer(state = initialState.canvas, action) {
  switch (action.type) {
    case "LOAD_CANVAS_LIST_SUCCEEDED":
      console.log("Canvas REDUCER: ", action);
      return [
        ...action.payload
        // ...state,
        // canvasShapesList: [
        //   ...action.payload
        // ]
      ];
    case "SAVE_CANVAS_TO_LIST_SUCCEEDED":
      console.log("Canvas REDUCER: ", action, state);
      return [
        ...state
      ];
    case "REMOVE_CANVAS_FROM_LIST_SUCCEEDED":
      return [
        ...state.filter(canvas => canvas.key != action.payload.canvasName)
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