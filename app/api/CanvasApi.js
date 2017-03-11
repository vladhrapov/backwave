import { firebaseRef } from "../constants/FirebaseConfig";

export const loadCanvasListRequestApi = () => {
  return firebaseRef.ref("canvasCollection")
    .once("value")
    .then(data => {
      let canvasObject = data.val();

      return Object.keys(canvasObject)
        .map((key) => {
          let { name, canvasObjects } = canvasObject[key];

          return { key, name, canvasObjects };
        });
    });
}


export const saveCanvasToListApi = payload => {
  let { name, canvasObjects } = payload;

  return firebaseRef
    .ref("canvasCollection")
    .child(name)
    .set({ name, canvasObjects });
}

export const removeCanvasFromListApi = payload => {
  let { name } = payload;

  return firebaseRef
    .ref(`canvasCollection/${name}`)
    .remove();
}