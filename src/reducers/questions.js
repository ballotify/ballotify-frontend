import { handleActions } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import Immutable from 'immutable';


const initialState = Immutable.fromJS({
    isPending: null,
    isFulfilled: null,
    isRejected: null,
    error: null,
    data: []
});

const questions = handleActions({
    GET_QUESTIONS_PENDING: (state, action) => {
        return state.set('isPending', true);
    },

    GET_QUESTIONS_FULFILLED: (state, action) => {
        return state.merge({
            isPending: false,
            isFulfilled: true,
            data: Immutable.List(action.payload.results)
        });
    }
}, initialState);

export default questions;
