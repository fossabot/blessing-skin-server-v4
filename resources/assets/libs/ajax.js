import Vue from 'vue';
import axios from 'axios';

const ajaxUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1/' : '/';

const ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

Vue.prototype.$ajax = ajax;

export default ajax;
