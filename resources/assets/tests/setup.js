require('jsdom-global')();

global.localStorage = new require('node-localstorage').LocalStorage('./temp');

const Vue = require('vue');
Vue.config.productionTip = false;
