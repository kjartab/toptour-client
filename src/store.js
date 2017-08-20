import { createStore, applyMiddleware } from 'redux';
import rootReducers from './reducers/root.js';
import logMiddleware from './middleware/log.js';
import apiMiddleware from './middleware/api.js';

export default createStore(
  rootReducers,
  applyMiddleware(logMiddleware, apiMiddleware)
);