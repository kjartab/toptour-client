// import React from 'react'
// import { render } from 'react-dom'
// import { createStore } from 'redux'
// import { BrowserRouter } from 'react-router-dom'
// import rootReducer from './reducers/root.js'
// import { Provider } from 'react-redux'
// import searchResults from './reducers/searchResults.js'
// import App from './App.jsx';

// function todos(state = [], action) {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return state.concat([action.text])
//     default:
//       return state
//   }
// }

// let store = createStore(todos, ['Use Redux'])

// // import store from './store.js'
// // let store = createStore(searchResults)
// // console.log(store);
// render(( 
//   <Provider store={store}>
//       <App />
//   </Provider> 
// ), document.getElementById('root'));

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import toptourApp from './reducers'
import App from './components/App'

let store = createStore(toptourApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)