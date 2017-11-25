import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import searchResult from './searchResults'

const toptourApp = combineReducers({
  todos,
  visibilityFilter,

})

export default toptourApp