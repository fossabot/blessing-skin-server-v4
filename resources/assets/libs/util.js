import axios from 'axios';

const util = Object.create(null);

util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

const ajaxUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1/' : '/';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

export default util;
