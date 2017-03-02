import { delay } from 'redux-saga';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { firebaseRef } from "../components/App/App.jsx";




function* loadCanvasListAsync() {
   try {
      const data = yield call(() => firebaseRef.ref("canvasCollection").once("value").then(data => data.val()));
      yield put({type: "LOAD_CANVAS_LIST_SUCCEEDED", payload: data});
   } catch (error) {
     console.log(error);
     yield put({type: "LOAD_CANVAS_LIST_FAILED", error});
   }
}

export function* loadCanvasListRequest() {
  yield takeLatest('LOAD_CANVAS_LIST', loadCanvasListAsync)
}