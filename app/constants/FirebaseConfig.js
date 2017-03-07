import * as firebase from "firebase";

let config = {
  apiKey: "AIzaSyCzqQq-uOcmHCzbhhr4FtWmMNLl2SA7-jQ",
  databaseURL: "https://diploma-dd819.firebaseio.com/"
}

firebase.initializeApp(config);

export const firebaseRef =  firebase.database();