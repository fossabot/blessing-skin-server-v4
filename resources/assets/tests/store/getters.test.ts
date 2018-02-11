import Vue from 'vue';
import { expect } from 'chai';
import { State, getters } from '../../libs/store';

Vue.config.productionTip = false;

describe('test getters in store', () => {
    it('checks if a user is admin', () => {
        const { isAdmin } = getters;
        expect(isAdmin({ user: { permission: 'BANNED' } } as State, {}, {}, {}))
            .to.be.false;
        expect(isAdmin({ user: { permission: 'NORMAL' } } as State, {}, {}, {}))
            .to.be.false;
        expect(isAdmin({ user: { permission: 'ADMIN' } } as State, {}, {}, {}))
            .to.be.true;
        expect(
            isAdmin(
                { user: { permission: 'SUPER_ADMIN' } } as State,
                {},
                {},
                {}
            )
        ).to.be.true;
    });
});
