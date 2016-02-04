import { handleActions } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import Immutable from 'immutable';


const initialState = Immutable.fromJS({
    isPending: null,
    isFulfilled: null,
    isRejected: null,
    error: null,
    votes: []
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
            votes: Immutable.List([]),
            ...action.payload
        });
    },

    SET_QUESTION_VOTE: (state, action) => {
        return state.updateIn(['votes'], arr => Immutable.List([action.payload.id]));
    },

    ADD_QUESTION_VOTE: (state, action) => {
        return state.updateIn(['votes'], arr => arr.push(action.payload.id));
    },

    REMOVE_QUESTION_VOTE: (state, action) => {
        return state.updateIn(['votes'], arr => arr.filter(item => item != action.payload.id));
    }

}, initialState);

export default currentQuestion;
