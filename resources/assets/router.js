const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: () => import('./views/user/master.vue')
    }
];

export default routers;
