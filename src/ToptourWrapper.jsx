import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux' 

import SearchBox from './components/Search.jsx' 

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'; 
import FloatingActionButtonExampleSimple from './components/Floatingbutton.jsx'
// injectTapEventPlugin();

export default class ToptourApp extends Component {

    constructor() {
      super();
    }
    
    render() {
        return (
          <div>
            <LeftMenu  
            />
          </div>
        )
      }
}
