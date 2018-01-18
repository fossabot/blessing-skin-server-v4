import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import store from './store';

Vue.use(VueApollo);

const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            Authorization: store.state.token
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
            store.dispatch('refreshToken', { token });
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

export default new VueApollo({
    defaultClient: apolloClient
});
