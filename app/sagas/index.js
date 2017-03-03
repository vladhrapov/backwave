import { loadCanvasListRequest, saveCanvasToListRequest } from "./CanvasSaga";

export function* rootSaga() {
  yield [
    loadCanvasListRequest(),
    saveCanvasToListRequest()
  ]
}