import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

import VueI18n from 'vue-i18n';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(iView);

function lang() {
    const preset = localStorage.getItem('language');
    if (preset) return preset;

    const fallback = 'zh-cn';
    const supported = ['zh-cn', 'en'];
    const convertRules = {
        'zh-hans': 'zh-cn',
        'en-us': 'en'
    };

    const nav = navigator.language.toLowerCase();
    if (supported.includes(nav)) {
        return nav;
    } else if (supported.includes(convertRules[nav])) {
        return convertRules[nav];
    } else {
        return fallback;
    }
}

const RouterConfig = {
    mode: 'hash',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {}
});

const i18n = new VueI18n({
    locale: lang(),
    fallbackLocale: 'zh-cn'
});

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
});
