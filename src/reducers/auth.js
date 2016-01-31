import { handleActions } from 'redux-actions';
import { LOGIN_SUCCESS, LOGOUT } from '../constants/ActionTypes';
import Immutable from 'immutable';


const initialState = Immutable.fromJS({
    isAuthenticated: null,
    jwtToken: null,
    isPending: null,
    isFulfilled: null,
    isRejected: null,
    error: null
});

const auth = handleActions({
    LOGIN_SUCCESS: (state, action) => {
        return state.merge({
            isAuthenticated: true,
            jwtToken: action.payload.token,
            isPending: false,
            isFulfilled: true
        });
    },

    LOGOUT: (state, action) => {
        return state.merge({
            isAuthenticated: false,
            jwtToken: null
        });
    },

    LOGIN_FACEBOOK_PENDING: (state, action) => {
        return state.set('isPending', true);
    }

}, initialState);

export default auth;
