import React, {Component} from 'react';

class App extends Component {

  componentDidUpdate(prevProps) {
    const { dispatch, redirectUrl } = this.props
    const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn
    const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn

    if (isLoggingIn) {
      dispatch(navigateTo(redirectUrl))
    } else if (isLoggingOut) {
      // do any kind of cleanup or post-logout redirection here
    }
  }

  render() {
    return this.props.children
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.loggedIn,
    redirectUrl: state.redirectUrl
  }
}

export default connect(mapStateToProps)(App)