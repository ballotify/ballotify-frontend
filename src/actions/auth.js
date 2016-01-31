import * as types from '../constants/ActionTypes';
import { createAction } from 'redux-actions';
import { api } from '../utils/api';

export const loginSuccess = createAction(
    types.LOGIN_SUCCESS, (token) => {
        return {
            token
        };
    }
);

export function facebookLogin(fbToken) {
    return {
        type: types.LOGIN_FACEBOOK,
        payload: {
            promise: api.post('/login', {
                token: fbToken
            })
        }
    };
}

export const logout = createAction(types.LOGOUT);
