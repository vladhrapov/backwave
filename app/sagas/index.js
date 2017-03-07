import { loadCanvasListRequest, saveCanvasToListRequest, removeCanvasFromListRequest } from "./CanvasSaga";
import { toggleDialogRequest, toggleDrawerRequest } from "./SettingsSaga";

export function* rootSaga() {
  yield [
    loadCanvasListRequest(),
    saveCanvasToListRequest(),
    removeCanvasFromListRequest(),
    toggleDialogRequest(),
    toggleDrawerRequest()
  ]
}