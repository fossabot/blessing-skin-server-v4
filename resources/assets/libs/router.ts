import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import i18n from './i18n';

Vue.use(VueRouter);

function load(path: string) {
    return () => import(`../views/${path}.vue`);
}

const routes = [
    {
        path: '/',
        component: load('common/main'),
        children: [
            {
                path: 'user',
                meta: {
                    title: 'dashboard'
                },
                component: load('user/dashboard')
            },
            {
                path: 'user/profile',
                meta: {
                    title: 'profile'
                },
                component: load('user/profile')
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'hash',
    routes
});

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    document.title = i18n.t(to.meta.title) + '';
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;
