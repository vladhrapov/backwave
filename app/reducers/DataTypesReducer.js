import { initialState } from "./";

export default function dataTypesReducer(state = initialState.dataTypes, action) {
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
    case "SAVE_DATA_TYPES_SUCCEEDED":
      return [
        ...action.payload
      ];
    case "REMOVE_DATA_TYPE_SUCCEEDED":
      return [
        ...state.filter(row => row.id != action.payload.id)
      ];
    default:
      return state;
  }
}