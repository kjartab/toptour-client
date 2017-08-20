import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
// import ToptourMap from './ToptourMap.jsx'
import ToptourApp from './ToptourApp.jsx'
import ToptourLogin from './ToptourLogin.jsx'
// import EnsureLoggedInContainer from './components/EnsureLoggedInContainer.jsx'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={ToptourApp}/>
        <Route path='/login' component={ToptourLogin}/>
      </Switch>
    </BrowserRouter>
  </main>
)

export default Main