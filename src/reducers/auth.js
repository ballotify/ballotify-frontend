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
        // TODO: Is it mutation? Should it be outside of reducers?
        localStorage.setItem('jwtToken', action.payload.token);

        return state.merge({
            isAuthenticated: true,
            jwtToken: action.payload.token
        });
    },

    LOGOUT: (state, action) => {
        localStorage.removeItem('jwtToken');
        return state.merge({
            isAuthenticated: false,
            jwtToken: null
        });
    },

    LOGIN_FACEBOOK_PENDING: (state, action) => {
        return state.set('isPending', true);
    },

    LOGIN_FACEBOOK_FULFILLED: (state, action) => {
        localStorage.setItem('jwtToken', action.payload.token);
        return state.merge({
            isPending: false,
            isFulfilled: true,
            isAuthenticated: true,
            jwtToken: action.payload.token
        });
    }

}, initialState);

export default auth;
