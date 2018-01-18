const routers = [
    {
        path: '/user',
        meta: {
            title: ''
        },
        component: () => import('./views/user/dashboard.vue')
    }
];

export default routers;
