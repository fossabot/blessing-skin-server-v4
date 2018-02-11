import { expect } from 'chai';
import { State, mutations } from '../../libs/store';

describe('test mutations in store', () => {
    it('update token', () => {
        const state = { token: '' } as State;
        mutations.updateToken(state, { token: 'a' });
        expect(state.token).to.equal('a');
    });

    it('update user info', () => {
        const { updateUserInfo } = mutations;
        const state = {
            user: { uid: 0, nickname: 'a', email: 'b', permission: 'NORMAL' }
        } as State;

        updateUserInfo(state, { uid: 1 });
        expect(state.user.uid).to.equal(1);

        updateUserInfo(state, { nickname: 'c' });
        expect(state.user.nickname).to.equal('c');

        updateUserInfo(state, { email: 'd' });
        expect(state.user.email).to.equal('d');

        updateUserInfo(state, { permission: 'ADMIN' });
        expect(state.user.permission).to.equal('ADMIN');
    });
});
