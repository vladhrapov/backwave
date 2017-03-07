import { delay } from 'redux-saga';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { loadCanvasListRequestApi, saveCanvasToListApi, removeCanvasFromListApi } from "../api/CanvasApi";



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

function* removeCanvasFromListAsync(action) {
  try {
    let { payload } = action;
    yield call(removeCanvasFromListApi, payload.canvasName);
    yield put({type: "REMOVE_CANVAS_FROM_LIST_SUCCEEDED", payload});
  } catch(error) {
    console.log(error);
    yield put({type: "REMOVE_CANVAS_FROM_LIST_FAILED", payload});
  }
}

export function* removeCanvasFromListRequest() {
  yield takeLatest("REMOVE_CANVAS_FROM_LIST", removeCanvasFromListAsync);
}