import React from 'react';
import {Router, Route, IndexRoute, hashHistory, browserHistory} from 'react-router';
import App from './components/App.jsx';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={App}/>
      <Route path="graphics/" component={Graphics}/>
      <Route path="reports/" component={Reports}/>
    </Route>
  </Router>
);