import { combineReducers } from 'redux-immutablejs';
import { routeReducer } from 'react-router-redux';
import newQuestion from './newQuestion';
import currentQuestion from './currentQuestion';
import questions from './questions';
import auth from './auth';

const rootReducer = combineReducers({
    auth,
    newQuestion,
    currentQuestion,
    questions,
    route: routeReducer
});

export default rootReducer;
