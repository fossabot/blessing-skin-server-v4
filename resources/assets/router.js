const routers = [
    {
        path: '/user',
        meta: {
            title: ''
        },
        component: () => import('./views/user/index.vue')
    }
];

export default routers;
