import { combineReducers } from 'redux-immutablejs';
import newQuestion from './newQuestion';

const rootReducer = combineReducers({
  newQuestion
});

export default rootReducer;
