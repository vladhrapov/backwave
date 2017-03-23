import React from 'react';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';

import App from "./App/App.jsx";
import Home from "./Home/Home.jsx";
import Charts from "./Charts/Charts.jsx";
import Reports from "./Reports/Reports.jsx";
import Settings from "./Settings";
import DataTypes from "./Settings/DataTypes";

export const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="charts/" component={Charts} />
      <Route path="reports/" component={Reports} />
      <Route path="settings" component={Settings}>
        <IndexRoute component={DataTypes} />
        <Route path="data_types" component={DataTypes} />
      </Route>  
    </Route>
  </Router>
);