import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from "./App/App.jsx";

import * as firebase from "firebase";

let config = {
  apiKey: "AIzaSyCzqQq-uOcmHCzbhhr4FtWmMNLl2SA7-jQ",
  databaseURL: "https://diploma-dd819.firebaseio.com/"
}

firebase.initializeApp(config);

const Root = () => (
  <MuiThemeProvider>
    <App firebase={firebase}/>
  </MuiThemeProvider>
);

export default Root;
