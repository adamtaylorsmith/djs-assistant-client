let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:5435';
        break;
    case 'djs-assistant-c.herokuapp.com':
        APIURL = 'https://djs-assistant-b.herokuapp.com'
};

export default APIURL;