import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from "react-redux";

import { Routes } from "./Routes.jsx";

import Store from "../store/Store";

export const store = new Store();

export const Root = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Routes />
    </MuiThemeProvider>
  </Provider>
);
