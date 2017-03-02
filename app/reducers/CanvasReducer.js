import InitialState from "./InitialState";

export default function canvasReducer(state = InitialState.canvas, action) {
  switch (action.type) {
    case "LOAD_CANVAS_LIST_SUCCEEDED":
      console.log("Canvas REDUCER: ", action);
      return {
        ...action.payload
        // ...state,
        // canvasShapesList: [
        //   ...action.payload
        // ]
      };
    case "LOAD_CANVAS_NAMES_SUCCEEDED":
      console.log("Canvas REDUCER: ", action);
      return {
        ...state,
        canvasNames: [
          ...action.payload
        ]
      };

      // [
      //   ...action.canvasShapesList
      // ];
    // case types.SAVE_CANVAS_INFO:
    //   return {
    //     ...state,
    //     ...action.canvasInfo
    //   };
    default:
      return state;
  }
}