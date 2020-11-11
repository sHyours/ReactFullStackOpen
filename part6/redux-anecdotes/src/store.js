import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import anecdote from './reducers/anecdoteReducer'
import notification from './reducers/notificationReducer'
import filter from './reducers/filterReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({
  anecdote,
  notification,
  filter
});
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));