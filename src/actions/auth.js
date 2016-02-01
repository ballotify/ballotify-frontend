import * as types from '../constants/ActionTypes';
import { createAction } from 'redux-actions';
import { api } from '../utils/api';

export const loginSuccess = createAction(
    types.LOGIN_SUCCESS, (token) => {
        localStorage.setItem('jwtToken', token);
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
            }).then(response => {
                return (action, dispatch, getState) => {
                    dispatch(loginSuccess(response.token));
                    return response;
                };
            })
        }
    };
}

export const logout = createAction(types.LOGOUT, () => {
    localStorage.removeItem('jwtToken');

    // Logout from Facebook if there is access token available
    FB.getLoginStatus((response) => {
        if (response.authResponse && response.authResponse.accessToken) {
            FB.logout();
        }
    });
});
