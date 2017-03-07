import FirebaseService from "../services/FirebaseService";

import { firebaseRef } from "../constants/FirebaseConfig";

export const loadCanvasListRequestApi = () =>  {
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


export const saveCanvasToListApi = name => {
  // return new FirebaseService().saveCanvasToFirebase(name, firebaseRef);
  return firebaseRef.ref("canvasCollection").child(name).set({
      name: name,
      canvasObjects: new FirebaseService().getCanvasObjectsCollection()
    });
}

export const removeCanvasFromListApi = name => {
  console.log(`canvasCollection/${name}`);
  //return firebaseRef.ref(`canvasCollection/${name}`).remove().then(data => console.log(`canvasCollection/${name} + DATA + `, data));
}