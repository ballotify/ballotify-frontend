import 'isomorphic-fetch';

export default function request(url, options) {
    return new Promise((resolve, reject) => {
        if (!url) {
            reject(new Error('There is no URL provided for the request.'));
        }

        if (!options) {
            reject(new Error('There are no options provided for the request.'));
        }

        fetch(url, options).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response;
            } else {
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        }).then(response => {
            return response.json();
        }).then(response => {
            return resolve(response);
        }).catch(error => {
            return reject(error);
        });
    });
}
