import Vue from 'vue';
import Vuex from 'vuex';
import gql from 'graphql-tag';
import { apolloClient } from './apollo';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
        user: {
            uid: 0,
            nickname: '',
            email: '',
            permission: 'NORMAL'
        },
        ui: {
            breadcrumb: [
                {
                    title: 'Blessing Skin Server',
                    path: '/'
                },
                {
                    title: 'user-center',
                    path: '/user'
                }
            ]
        }
    },
    getters: {
        isAdmin({ user: { permission } }) {
            return permission === 'ADMIN' || permission === 'SUPER_ADMIN';
        }
    },
    mutations: {
        updateToken(state, { token }) {
            state.token = token;
        },
        updateUserInfo(state, { uid, nickname, email, permission }) {
            state.user.uid = uid || state.user.uid;
            state.user.nickname = nickname || state.user.nickname;
            state.user.email = email || state.user.email;
            state.user.permission = permission || state.user.permission;
        }
    },
    actions: {
        refreshToken({ commit }, { token }) {
            commit('updateToken', { token });
            localStorage.setItem('token', token);
        },
        async fetchUserInfo({ commit }) {
            const { data } = await apolloClient.query({
                query: gql`
                    query {
                        currentUser {
                            uid
                            nickname
                            email
                            permission
                        }
                    }
                `
            });
            commit('updateUserInfo', (data as { currentUser: User }).currentUser);
        }
    }
});

export type State = typeof store.state;

export default store;
