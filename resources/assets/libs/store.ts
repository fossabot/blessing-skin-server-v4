import Vue from 'vue';
import Vuex, { GetterTree, MutationTree, ActionTree } from 'vuex';

Vue.use(Vuex);

export const state = {
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
};

export type State = typeof state;

export const getters: GetterTree<State, {}> = {
    isAdmin({ user: { permission } }) {
        return permission === 'ADMIN' || permission === 'SUPER_ADMIN';
    }
};

export const mutations: MutationTree<State> = {
    updateToken(state, { token }) {
        state.token = token;
    },
    updateUserInfo(state, { uid, nickname, email, permission }) {
        state.user.uid = uid || state.user.uid;
        state.user.nickname = nickname || state.user.nickname;
        state.user.email = email || state.user.email;
        state.user.permission = permission || state.user.permission;
    }
};

export const actions: ActionTree<State, {}> = {
    refreshToken({ commit }, { token }) {
        commit('updateToken', { token });
        localStorage.setItem('token', token);
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
