import FirebaseService from "../../services/FirebaseService";

import { firebaseRef } from "../../components/App/App.jsx";

export const loadCanvasListRequestApi = () =>  {
  return firebaseRef.ref("canvasCollection")
    .once("value")
    .then(data => {
      let canvasObject = data.val();

      return Object.keys(canvasObject)
        .map((key) => {
          let { name, canvasObjects } = canvasObject[key];

          return { name, canvasObjects };
        });
      // return data.val();
    });
}


export const saveCanvasToListApi = name => {
  return new FirebaseService().saveCanvasToFirebase(name, firebaseRef);
}