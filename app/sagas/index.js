import { loadCanvasListRequest, saveCanvasToListRequest, removeCanvasFromListRequest } from "./CanvasSaga";

export function* rootSaga() {
  yield [
    loadCanvasListRequest(),
    saveCanvasToListRequest(),
    removeCanvasFromListRequest()
  ]
}