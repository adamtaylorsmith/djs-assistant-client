let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
    case 'djs-assistant-b.herokuapp.com':
        APIURL = 'https://djs-assistant-b.herokuapp.com'
};

export default APIURL;