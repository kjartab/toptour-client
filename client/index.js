import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './components/Main.jsx';
// import injectTapEventPlugin from 'react-tap-event-plugin';

// injectTapEventPlugin();

// import AppBar from './AppBar.jsx';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
// import UpperSection from './UpperSection';
// import ProjectPage from './projects/ProjectPage.jsx';
// import AboutSection from './about/AboutSection.jsx';
// import ProjectSection from './projects/ProjectSection.jsx';
// import ContactSection from './contact/ContactSection.jsx';

var data = {
	turer : []
}


// class App {
// 		return (
// 		  <MuiThemeProvider>
// 		    <Main/>
// 		  </MuiThemeProvider>
// 		)
// 	}
// }

const App = function(obj) {

  return(
	<MuiThemeProvider>
    	<Main/>
  	</MuiThemeProvider>
)};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);