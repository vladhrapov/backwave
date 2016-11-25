import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/RootReducer";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

// initialState is a good point to init Store
// especially for server-side rendering
export default function Store(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      reduxImmutableStateInvariant()
    )
  );
}
