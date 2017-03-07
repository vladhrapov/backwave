import { createStore, applyMiddleware } from "redux";
import { rootReducer, initialState } from "../reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga'
import { rootSaga } from "../sagas";

const sagaMiddleware = createSagaMiddleware();

// initialState is a good point to init Store
// especially for server-side rendering
export default function Store(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        thunk,
        sagaMiddleware,
        reduxImmutableStateInvariant()  
      )
    ));

  sagaMiddleware.run(rootSaga);

  return store;
}
