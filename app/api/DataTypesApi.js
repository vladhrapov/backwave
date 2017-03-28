import { firebaseRef } from "../constants/FirebaseConfig";

export const loadDataTypesApi = () => {
  return firebaseRef.ref("dataTypesCollection")
    .once("value")
    .then(data => data.val());
}


export const addDataTypeApi = payload => {
  let { id } = payload;

  return firebaseRef
    .ref("dataTypesCollection")
    .child(id)
    .set({ ...payload });
}

// export const removeCanvasFromListApi = payload => {
//   let { name } = payload;

//   return firebaseRef
//     .ref(`canvasCollection/${name}`)
//     .remove();
// }