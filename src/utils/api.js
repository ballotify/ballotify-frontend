import request from './request';

const Api = () => {

    const defaultOptions = {
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const base = 'http://localhost:8002/v1';

    return {

        post: (path, body, options = {}) => {
            return request(`${base}${path}/`, Object.assign(
                options,
                defaultOptions, {
                    method: 'POST',
                    body: JSON.stringify(body)
                }
            ));
        },

        get: (path, options = {}) => {
            return request(`${base}${path}/`, Object.assign(
                options,
                defaultOptions, {
                    method: 'GET'
                }
            ));
        },

        edit: (path, body, options = {}) => {
            return request(`${base}${path}/`, Object.assign(
                options,
                defaultOptions, {
                    method: 'PUT'
                }
            ));
        },

        delete: (path, options = {}) => {
            return request(`${base}${path}/`, Object.assign(
                options,
                defaultOptions, {
                    method: 'DELETE'
                }
            ));
        }
    };
};

export const api = Api();
