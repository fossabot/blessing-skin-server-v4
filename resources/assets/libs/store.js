import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || ''
    },
    mutations: {
        updateToken(state, { token }) {
            state.token = token;
        }
    },
    actions: {
        refreshToken({ commit }, { token }) {
            commit('updateToken', { token });
            localStorage.setItem('token', token);
        }
    }
});

export default store;
