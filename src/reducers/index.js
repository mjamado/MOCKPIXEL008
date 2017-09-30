import { combineReducers } from 'redux';
import runtime from './runtime';
import smart from './smart';

export default combineReducers({
  runtime,
  smart,
});
