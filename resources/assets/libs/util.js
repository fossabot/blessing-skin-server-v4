import Vue from 'vue';
import axios from 'axios';

const util = Object.create(null);

const ajaxUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1/' : '/';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

Vue.prototype.$ajax = util.ajax;

export default util;
