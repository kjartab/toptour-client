// import React from 'react' 
// import Main from './Main.jsx'

import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App

// class App extends React.Component {
    

//     render() {
//         return (
//         <div>
//             <Main />
//         </div>
//         )

//     }
// }

// export default App
