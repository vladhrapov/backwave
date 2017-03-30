import { delay } from 'redux-saga';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { loadDataTypesApi, addDataTypeApi, saveDataTypesApi, removeDataTypeApi } from "../api/DataTypesApi";

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

function* saveDataTypesAsync(action) {
  console.clear();
  try {
    const { payload } = action;
    console.log("payload saveDataTypesAsync ", payload);
    const payloadWithOldDataTypes = yield call(loadDataTypesApi);
    const data = yield call(saveDataTypesApi, payload, payloadWithOldDataTypes);
    yield put({ type: "SAVE_DATA_TYPES_SUCCEEDED", payload: data });
  }
  catch (err) {

  }
}

export function* saveDataTypesRequest() {
  yield takeLatest("SAVE_DATA_TYPES", saveDataTypesAsync);
}

function* removeDataTypeAsync(action) {
  try {
    let { payload } = action;
    yield call(removeDataTypeApi, payload);
    yield put({ type: "REMOVE_DATA_TYPE_SUCCEEDED", payload });
  }
  catch (err) {

  }
}

export function* removeDataTypeRequest() {
  yield takeLatest("REMOVE_DATA_TYPE", removeDataTypeAsync);
}
