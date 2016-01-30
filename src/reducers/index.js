import { combineReducers } from 'redux-immutablejs';
import newQuestion from './newQuestion';
import questions from './questions';

const rootReducer = combineReducers({
    newQuestion,
    questions
});

export default rootReducer;
