import { handleActions } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import Immutable from 'immutable';


const initialState = Immutable.fromJS({
    isPending: null,
    isFulfilled: null,
    isRejected: null,
    error: null
});

const currentQuestion = handleActions({
    CREATE_QUESTION_PENDING: (state, action) => {
        return state.set('isPending', true);
    },

    GET_QUESTION_PENDING: (state, action) => {
        return state.set('isPending', true);
    },

    GET_QUESTION_FULFILLED: (state, action) => {
        return state.merge({
            isPending: false,
            isFulfilled: true,
            ...action.payload
        });
    }

}, initialState);

export default currentQuestion;
