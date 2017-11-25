import React , { Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
// import ToptourMap from './ToptourMap.jsx'

import cookie from 'react-cookies'
import ToptourApp from './ToptourApp.jsx'
import ToptourMap from './ToptourMap.jsx'
import LandingPage from './components/LandingPage.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'; 
import FloatingActionButtonExampleSimple from './components/Floatingbutton.jsx'
injectTapEventPlugin();

import Cookies from 'universal-cookie';
const cookies = new Cookies();


export default class Main extends Component {

  constructor() {
    super();
    this.state = {
      loggedIn : false
    }
  }

  render() {

    var app;    
    if (!cookies.get('toptourLoggedIn')) {
      app = (<Switch>
          <Route exact path='/' component={LandingPage}/>
        </Switch>);
    } else {
      app = (<Switch>
              <Route exact path='/' component={ToptourMap}/>
              <Route path='/login' component={LandingPage}/>
            </Switch>);
    }
    
    return (
      <MuiThemeProvider>
        <main>
          <BrowserRouter>
              {app}
          </BrowserRouter>
        </main>
      </MuiThemeProvider>
    );
  }
}
