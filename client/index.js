import React from 'react';
import ReactDOM from 'react-dom';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './components/Main.jsx';

// import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'


var data = {
	turer : []
}

const App = function(obj) {

  return(
	// <MuiThemeProvider>
    	<Main/>
  	// </MuiThemeProvider>
)};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);