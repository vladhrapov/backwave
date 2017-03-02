import { loadCanvasListRequest } from "./CanvasSaga";

export function* rootSaga() {
  yield [
    loadCanvasListRequest()
  ]
}