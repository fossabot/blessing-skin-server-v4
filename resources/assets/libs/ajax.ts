import Vue from 'vue';
import axios from 'axios';
import store from './store';

const ajaxUrl =
    process.env.NODE_ENV === 'development' ? 'http://127.0.0.1/' : '/';

const ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

ajax.interceptors.request.use(config => {
    config.headers.Authorization = store.state.token;
    return config;
});

ajax.interceptors.response.use(response => {
    const token = response.headers.Authorization;
    if (token) {
        store.dispatch('refreshToken', { token });
    }
    return response;
});

Vue.prototype.$ajax = ajax;

export default ajax;
