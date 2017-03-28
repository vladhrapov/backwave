import { delay } from 'redux-saga';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { loadDataTypesApi, addDataTypeApi } from "../api/DataTypesApi";

function* loadDataTypesAsync() {
  try {
    const payload = yield call(loadDataTypesApi);
    console.log("payload", payload);
    yield put({ type: "LOAD_DATA_TYPES_SUCCEEDED", payload });
  }
  catch (err) {

  }
}

export function* loadDataTypesRequest() {
  yield takeLatest("LOAD_DATA_TYPES", loadDataTypesAsync);
}

function* addDataTypeAsync(action) {
  try {
    let { payload } = action;
    yield call(addDataTypeApi, payload);
    yield put({ type: "ADD_DATA_TYPE_SUCCEEDED", payload });
  }
  catch (err) {

  }
}

export function* addDataTypeRequest() {
  yield takeLatest("ADD_DATA_TYPE", addDataTypeAsync);
}