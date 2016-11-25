import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from "react-redux";

import App from "./App/App.jsx";
import Store from "../store/Store";

import * as firebase from "firebase";

let config = {
  apiKey: "AIzaSyCzqQq-uOcmHCzbhhr4FtWmMNLl2SA7-jQ",
  databaseURL: "https://diploma-dd819.firebaseio.com/"
}

firebase.initializeApp(config);

const store = new Store();

const Root = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <App firebase={firebase}/>
    </MuiThemeProvider>
  </Provider>
);
// {Routes}

export default Root;
