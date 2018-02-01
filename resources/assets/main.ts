import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import router from './libs/router';
import store from './libs/store';
import i18n from './libs/i18n';
import apolloProvider from './libs/apollo';
import './libs/ajax';
import './libs/vee-validate';
import App from './app.vue';

Vue.use(iView);

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    apolloProvider,
    render: h => h(App)
});
