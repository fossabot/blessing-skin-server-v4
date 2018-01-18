import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

// GraphQL
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

import router from './libs/router';
import store from './libs/store';
import i18n from './libs/i18n';
import App from './app.vue';

Vue.use(iView);
Vue.use(VueApollo);

const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            Authorization: localStorage.getItem('token') || ''
        }
    });
    return forward(operation);
});
const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
        const token = operation
            .getContext()
            .response.headers.get('Authorization');
        if (token) {
            localStorage.setItem('token', token);
        }
        return response;
    });
});
const httpLink = new HttpLink({
    uri:
        (process.env.NODE_ENV === 'development' ? 'http://localhost' : '') +
        '/graphql'
});
const apolloClient = new ApolloClient({
    link: middlewareLink.concat(afterwareLink).concat(httpLink),
    cache: new InMemoryCache()
});
const apolloProvider = new VueApollo({
    defaultClient: apolloClient
});

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    apolloProvider,
    render: h => h(App)
});
