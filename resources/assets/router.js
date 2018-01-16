const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: () => import('./views/user/index.vue')
    }
];

export default routers;
