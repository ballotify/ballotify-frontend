import { combineReducers } from 'redux-immutablejs';
import newQuestion from './newQuestion';
import questions from './questions';
import auth from './auth';

const rootReducer = combineReducers({
    auth,
    newQuestion,
    questions
});

export default rootReducer;
