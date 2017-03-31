import React from 'react';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';

import App from "./App";
import Home from "./Home/Home.jsx";
import Charts from "./Charts";
import Reports from "./Reports";
import Settings from "./Settings";
import DataTypes from "./Settings/DataTypes";
import Global from "./Settings/Global";
import Logger from "./Settings/Logger";

export const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="charts/" component={Charts} />
      <Route path="reports/" component={Reports} />
      <Route path="settings" component={Settings}>
        <IndexRoute component={Global} />
        <Route path="data_types" component={DataTypes} />
        <Route path="global" component={Global} />
        <Route path="logger" component={Logger} />
      </Route>  
    </Route>
  </Router>
);