import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';  
injectTapEventPlugin();

render((
  <BrowserRouter>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>
), document.getElementById('root'));
