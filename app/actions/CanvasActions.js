import { types } from "../constants/ActionTypes";
import CanvasService from "../services/CanvasService";


export function loadCanvasListSuccess(canvasList) {
  console.log("canvasList: ", canvasList);
  return {
    type: types.LOAD_CANVAS_LIST,
    canvasList
  }
}

export function loadCanvasList(firebaseRef) {
  return dispatch => {
    return CanvasService.loadCanvasList(firebaseRef)
    .then(canvasList => {
      console.log(canvasList);
      dispatch(loadCanvasListSuccess(canvasList))
    })
    .catch(error => {
      throw new Error("Failed load the courses");
    });
  }
}
