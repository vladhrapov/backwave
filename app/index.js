import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'rxjs';

import Root from "./components/Root.jsx";



injectTapEventPlugin();

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
