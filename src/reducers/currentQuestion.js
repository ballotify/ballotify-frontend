import { handleActions } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import Immutable from 'immutable';


const initialState = Immutable.fromJS({
    isPending: null,
    isFulfilled: null,
    isRejected: null,
    error: null,
    currentVote: {
        choices: []
    }
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
        return state.updateIn(['currentVote', 'choices'], arr => Immutable.List([action.payload]));
    },

    ADD_QUESTION_VOTE: (state, action) => {
        return state.updateIn(['currentVote', 'choices'], arr => arr.push(action.payload));
    },

    REMOVE_QUESTION_VOTE: (state, action) => {
        return state.updateIn(['currentVote', 'choices'], arr => arr.filter(item => item.choice != action.payload.choice));
    }

}, initialState);

export default currentQuestion;
