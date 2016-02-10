let API_ROOT, FACEBOOK_ID;

if (__DEV__) {
    API_ROOT = 'http://localhost:8003/v1';
    FACEBOOK_ID = '107790869310294';
} else {
    API_ROOT = 'http://api.ballotify.com/v1';
    FACEBOOK_ID = '1687518998148246';
}

export {API_ROOT, FACEBOOK_ID};
