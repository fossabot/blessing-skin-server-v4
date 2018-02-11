import { expect } from 'chai';
import sinon from 'sinon';
import { actions } from '../../libs/store';

describe('test actions in store', () => {
    it('refresh token', () => {
        const { refreshToken } = actions as {
            refreshToken(
                { commit }: { commit: any },
                { token }: { token: string }
            ): void;
        };
        const commit = sinon.stub();
        refreshToken({ commit }, { token: 'a' });
        expect(commit.called).to.be.true;
        expect(commit.firstCall.args[0]).to.equal('updateToken');
        expect(commit.firstCall.args[1]).to.eql({ token: 'a' });
    });
});
