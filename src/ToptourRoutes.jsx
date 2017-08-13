import Route from 'react-router'
import ToptourMap from './ToptourMap'
import ToptourApp from './ToptourApp'
import ToptourLogin from './ToptourLogin'
import EnsureLoggedInContainer from './components/EnsureLoggedInContainer'
// import ToptourMain from './ToptourMap'
// import ToptourMain from './ToptourBlog'

  // <Route component={EnsureLoggedInContainer}>
  //   <Route path="map" component={ToptourMap}/> 
  // </Route>


<Route path="/" component={ToptourApp}> 
  <Route path="login" component={Login}/>
</Route>

import { Switch, Route } from 'react-router-dom'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={ToptourApp}/>
      <Route path='/login' component={ToptourLogin}/>
    </Switch>
  </main>
)

