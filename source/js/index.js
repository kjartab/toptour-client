import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import 'babel-polyfill';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import SearchBox from './components/Search'
// import logger from 'dev/logger';

// import rootReducer from 'reducers';
// import Routes from 'routes';
// import DevTools from 'dev/redux-dev-tools';

injectTapEventPlugin();
// Load SCSS
// import '../scss/app.scss';

const isProduction = process.env.NODE_ENV === 'production';

// Creating store
let store = null;

if (isProduction) {
  // In production adding only thunk middleware
  const middleware = applyMiddleware(thunk);

  store = createStore(
    // rootReducer,
    middleware
  );
} else {
  // In development mode beside thunk
  // logger and DevTools are added
  // const middleware = applyMiddleware(thunk);
  // const enhancer = compose(
  //   middleware,
  //   // DevTools.instrument()
  // );

  // store = createStore(
  //   // rootReducer,
  //   // enhancer
  // );
}


// Render it to DOM
ReactDOM.render(

  <MuiThemeProvider>
      <div>
        <SearchBox />
        <div><p>Test</p></div>
    </div>
  </MuiThemeProvider>
  ,
  document.getElementById('root')
);
