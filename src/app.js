import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 

import SearchBox from './components/Search.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as name from "./module1";
import injectTapEventPlugin from 'react-tap-event-plugin'; 

injectTapEventPlugin();

class App extends Component {
    render() {
        return (
          <div>
            <SearchBox/> 
          </div>
        )
      }
}

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
  ,
  document.getElementById('root')
);