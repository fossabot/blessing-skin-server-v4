import axios from 'axios';
import env from '../config/env';

const util = Object.create(null);

util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ? 'http://127.0.0.1/' : '/';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

export default util;
