import { loadCanvasListRequest, saveCanvasToListRequest, removeCanvasFromListRequest } from "./CanvasSaga";
import { loadSettingsRequest, saveSettingsRequest } from "./SettingsSaga";
import { loadDataTypesRequest, addDataTypeRequest, saveDataTypesRequest, removeDataTypeRequest } from "./DataTypesSaga";

export function* rootSaga() {
  yield [
    loadCanvasListRequest(),
    saveCanvasToListRequest(),
    removeCanvasFromListRequest(),
    loadSettingsRequest(),
    saveSettingsRequest(),
    // toggleDialogRequest(),
    // toggleDrawerRequest(),
    loadDataTypesRequest(),
    addDataTypeRequest(),
    saveDataTypesRequest(),
    removeDataTypeRequest()
  ]
}