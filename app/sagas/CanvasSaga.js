import { delay } from 'redux-saga';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { loadCanvasListRequestApi, saveCanvasToListApi } from "./api/Canvas";



function* loadCanvasListAsync() {
   try {
      const data = yield call(loadCanvasListRequestApi);
      yield put({type: "LOAD_CANVAS_LIST_SUCCEEDED", payload: data});
   } catch (error) {
     console.log(error);
     yield put({type: "LOAD_CANVAS_LIST_FAILED", error});
   }
}

export function* loadCanvasListRequest() {
  yield takeLatest('LOAD_CANVAS_LIST', loadCanvasListAsync);
}

function* saveCanvasToListAsync(action) {
  try {
    console.log("saveCanvasToListAsync: action ", action);
    let { payload } = action;
    yield call(saveCanvasToListApi, payload.canvasName);
    yield put({type: "SAVE_CANVAS_TO_LIST_SUCCEEDED", payload});
  } catch(error) {
     console.log(error);
     yield put({type: "SAVE_CANVAS_TO_LIST_FAILED", error});
  }
}

export function* saveCanvasToListRequest() {
  yield takeLatest("SAVE_CANVAS_TO_LIST", saveCanvasToListAsync);
}

function* removeCanvasFromListAsync() {
  try {
    const data = 8;
  } catch(error) {

  }
}

export function* removeCanvasFromListRequest() {
  yield takeLatest("REMOVE_CANVAS_FROM_LIST", removeCanvasFromListAsync);
}