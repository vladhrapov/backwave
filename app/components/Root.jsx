import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from "react-redux";
import {Router, Route, IndexRoute, hashHistory, browserHistory} from 'react-router';

import App from "./App/App.jsx";
import Home from "./Home/Home.jsx";
import Charts from "./Charts/Charts.jsx";
import Reports from "./Reports/Reports.jsx";
import Store from "../store/Store";


const store = new Store();

// const AppWrapper = () => { 
//   return (
//     <div>
//       <Home firebase={firebase}/>
//     </div>
//   );
// }

const Root = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="charts/" component={Charts}/>
          <Route path="reports/" component={Reports}/>
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
);
      // <App firebase={firebase}/>
// {Routes}

export default Root;
