// import moment from 'moment';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import AutoComplete from 'material-ui/AutoComplete';
import SearchBox from './components/Search.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as name from "./module1";
import injectTapEventPlugin from 'react-tap-event-plugin';
// var rightNow = moment().format('MMMM Do YYYY, h:mm:ss a');
// console.log(rightNow);
console.log("ok");
console.log("2ssssss3s")
console.log(name.testFunc(),23);
var k = 2;
var t = 2;

var t = 2;

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