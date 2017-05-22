import { call, put, takeLatest } from 'redux-saga/effects';
import { saveSettingsApi } from "../api/SettingsApi";

// function* toggleDialogHandler(action) {
//   let { payload } = action;
//   yield put({type: "TOGGLE_DIALOG_SUCCEEDED", payload });
// }

// export function* toggleDialogRequest() {
//   yield takeLatest('TOGGLE_DIALOG', toggleDialogHandler);
// }

// function* toggleDrawerHandler(action) {
//   let { payload } = action;
//   yield put({type: "TOGGLE_DRAWER_SUCCEEDED", payload });
// }

// export function* toggleDrawerRequest() {
//   yield takeLatest('TOGGLE_DRAWER', toggleDrawerHandler);
// }

function* saveSettingsAsync(action) {
  try {
    const { payload } = action;
    yield call(saveSettingsApi, payload);
    yield put({ type: "SAVE_SETTINGS_SUCCEEDED", payload });
  } catch (error) {
    console.log(error);
    yield put({ type: "SAVE_SETTINGS_FAILED", error });
  }
}

export function* saveSettingsRequest() {
  yield takeLatest("SAVE_SETTINGS", saveSettingsAsync);
}









// function* loadCanvasListAsync() {
//   try {
//     const data = yield call(loadCanvasListRequestApi);
//     yield put({ type: "LOAD_CANVAS_LIST_SUCCEEDED", payload: data });
//   } catch (error) {
//     console.log(error);
//     yield put({ type: "LOAD_CANVAS_LIST_FAILED", error });
//   }
// }

// export function* loadCanvasListRequest() {
//   yield takeLatest('LOAD_CANVAS_LIST', loadCanvasListAsync);
// }