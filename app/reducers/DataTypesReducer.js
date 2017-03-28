import { initialState } from "./";

export default function dataTypesReducer(state = initialState.dataTypes, action) {
  console.log("dataTypesReducer REDUCER: ", action, state);
  switch (action.type) {
    case "LOAD_DATA_TYPES_SUCCEEDED":
      return [
        ...action.payload
      ];
    case "ADD_DATA_TYPE_SUCCEEDED":
      return [
        ...state,
        { ...action.payload }
      ];
    // case "REMOVE_CANVAS_FROM_LIST_SUCCEEDED":
    //   return [
    //     ...state.filter(canvas => canvas.key != action.payload.name)
    //   ];
    // // case types.SAVE_CANVAS_INFO:
    // //   return {
    // //     ...state,
    // //     ...action.canvasInfo
    // //   };
    default:
      return state;
  }
}