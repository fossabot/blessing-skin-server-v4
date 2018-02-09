import Vue from 'vue';
import { shallow, createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import moxios from 'moxios';
import VueI18n from 'vue-i18n';
import moment from 'moment';
import Dashboard from '../../../views/user/dashboard.vue';

const localVue = createLocalVue();
localVue.prototype.$ajax = axios;
localVue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'en',
    silentTranslationWarn: true
});

describe('test `Dashboard` component', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('assert initial data', () => {
        const wrapper = shallow(Dashboard, {
            localVue,
            i18n,
            stubs: {
                'vue-markdown': true
            }
        });

        const vmData = wrapper.vm.$data;
        expect(vmData.announcement).to.equal('');
        expect(vmData.currentUser.score).to.equal(0);
        expect(vmData.currentUser.players).to.be.an('array').and.empty;
        expect(vmData.currentUser.closet).to.be.an('array').and.empty;
        expect(vmData.currentUser.last_signed_at).to.equal('');
        expect(vmData.scoreInfo.signAfterZero).to.be.false;
        expect(vmData.scoreInfo.signGapTime).to.equal(24);
        expect(vmData.scoreInfo.perPlayer).to.equal(100);
        expect(vmData.scoreInfo.perStorage).to.equal(1);
        expect(vmData.scoreInfo.returnScore).to.be.true;
        expect(vmData.scoreInfo.initial).to.equal(1000);
        expect(vmData.scoreInfo.signScore).to.equal('10,100');
    });

    it('test `created` lifecycle hook', done => {
        moxios.stubRequest('/api/site/announcement', {
            status: 200,
            responseText: 'test announcement'
        });
        moxios.stubRequest('/api/site/score', {
            status: 200,
            response: {
                signAfterZero: true,
                signGapTime: 12,
                perPlayer: 50,
                perStorage: 2,
                returnScore: false,
                initial: 2000,
                signScore: '50,100'
            }
        });

        const wrapper = shallow(Dashboard, {
            localVue,
            i18n,
            stubs: {
                'vue-markdown': true
            }
        });

        moxios.wait(() => {
            expect(wrapper.vm.$data.announcement).to.equal('test announcement');
            expect(wrapper.vm.$data.scoreInfo).to.eql({
                signAfterZero: true,
                signGapTime: 12,
                perPlayer: 50,
                perStorage: 2,
                returnScore: false,
                initial: 2000,
                signScore: '50,100'
            });
            done();
        });
    });

    it('test computed value: used storage', () => {
        const wrapper = shallow(Dashboard, {
            localVue,
            i18n,
            stubs: {
                'vue-markdown': true
            }
        });
        const vm = wrapper.vm as Vue & { usedStorage: number };

        expect(vm.usedStorage).to.equal(0);

        wrapper.setData({
            currentUser: {
                ...vm.$data.currentUser,
                closet: [{ texture: { size: 5 } }]
            }
        });
        expect(vm.usedStorage).to.equal(5);
    });

    it('test computed value: storage percent', () => {
        const wrapper = shallow(Dashboard, {
            localVue,
            i18n,
            stubs: {
                'vue-markdown': true
            }
        });
        const vm = wrapper.vm as Vue & { storagePercent: number };

        expect(vm.storagePercent).to.equal(0);

        wrapper.setData({
            currentUser: {
                ...vm.$data.currentUser,
                closet: [{ texture: { size: 5 } }],
                score: 100
            }
        });
        expect(vm.storagePercent).to.closeTo(0.05, 0.005);
    });

    it('test computed value: total players', () => {
        const wrapper = shallow(Dashboard, {
            localVue,
            i18n,
            stubs: {
                'vue-markdown': true
            }
        });
        const vm = wrapper.vm as Vue & { totalPlayers: number };

        expect(vm.totalPlayers).to.equal(0);

        wrapper.setData({
            currentUser: {
                ...vm.$data.currentUser,
                score: 50
            },
            scoreInfo: {
                ...vm.$data.scoreInfo,
                perPlayer: 20
            }
        });
        expect(vm.totalPlayers).to.equal(2);
    });

    it('test computed value: players percent', () => {
        const wrapper = shallow(Dashboard, {
            localVue,
            i18n,
            stubs: {
                'vue-markdown': true
            }
        });
        const vm = wrapper.vm as Vue & { playersPercent: number };

        expect(vm.playersPercent).to.equal(0);

        wrapper.setData({
            currentUser: {
                ...vm.$data.currentUser,
                score: 50,
                players: [{}]
            },
            scoreInfo: {
                ...vm.$data.scoreInfo,
                perPlayer: 20
            }
        });
        expect(vm.playersPercent).to.be.closeTo(0.5, 0.01);
    });

    it('test computed value: score introduction', () => {
        const wrapper = shallow(Dashboard, {
            localVue,
            i18n,
            stubs: {
                'vue-markdown': true
            }
        });
        const vm = wrapper.vm as Vue & { scoreIntro: VueI18n.TranslateResult };
        const text = vm.scoreIntro;
        expect(text).to.be.a('string');
        expect(text).to.include(vm.$data.scoreInfo.signScore.split(',')[0]);
        expect(text).to.include(vm.$data.scoreInfo.signScore.split(',')[1]);
        expect(text).to.include(vm.$data.scoreInfo.initial);
        expect(text).to.include(vm.$t('score-intro.will-return'));

        wrapper.setData({
            scoreInfo: { ...vm.$data.scoreInfo, returnScore: false }
        });
        expect(vm.scoreIntro).to.include(vm.$t('score-intro.no-return'));
    });

    it('test computed value: checks if a user can sign', () => {
        const wrapper = shallow(Dashboard, {
            localVue,
            i18n,
            stubs: {
                'vue-markdown': true
            }
        });
        const vm = wrapper.vm as Vue & { canSign: boolean };
        const button = wrapper.find('.btn-sign');
        expect(vm.canSign).to.be.false;
        expect(button.attributes()).to.include.keys('disabled');

        wrapper.setData({
            currentUser: {
                ...vm.$data.currentUser,
                last_signed_at: '2000-01-01 00:00:00'
            }
        });
        expect(vm.canSign).to.be.true;
        expect(button.attributes()).not.include.keys('disabled');

        wrapper.setData({
            currentUser: {
                ...vm.$data.currentUser,
                last_signed_at: moment(moment.now()).format(
                    'YYYY-MM-DD hh:mm:ss'
                )
            }
        });
        expect(vm.canSign).to.be.false;
        expect(button.attributes()).to.include.keys('disabled');

        wrapper.setData({
            currentUser: {
                ...vm.$data.currentUser,
                last_signed_at: moment(moment.now())
                    .subtract(5, 'hour')
                    .format('YYYY-MM-DD hh:mm:ss')
            },
            scoreInfo: {
                ...vm.$data.scoreInfo,
                signGapTime: 2
            }
        });
        expect(vm.canSign).to.be.true;
        expect(button.attributes()).not.include.keys('disabled');

        wrapper.setData({
            currentUser: {
                ...vm.$data.currentUser,
                last_signed_at: moment(moment.now()).format(
                    'YYYY-MM-DD hh:mm:ss'
                )
            },
            scoreInfo: {
                ...vm.$data.scoreInfo,
                signAfterZero: true
            }
        });
        expect(vm.canSign).to.be.false;
        expect(button.attributes()).to.include.keys('disabled');

        wrapper.setData({
            currentUser: {
                ...vm.$data.currentUser,
                last_signed_at: moment(moment.now())
                    .subtract(1, 'day')
                    .format('YYYY-MM-DD kk:mm:ss')
            },
            scoreInfo: {
                ...vm.$data.scoreInfo,
                signAfterZero: true
            }
        });
        expect(vm.canSign).to.be.true;
        expect(button.attributes()).not.include.keys('disabled');
    });

    it('test computed value: text of button `sign`', () => {
        const wrapper = shallow(Dashboard, {
            localVue,
            i18n,
            stubs: {
                'vue-markdown': true
            }
        });
        const { vm } = wrapper;

        wrapper.setData({
            currentUser: {
                ...vm.$data.currentUser,
                last_signed_at: '2000-01-01 00:00:00'
            }
        });
        expect(wrapper.find('.btn-sign').text()).to.equal(vm.$t('sign'));
    });

    it('test instance method: sign diff', () => {
        const wrapper = shallow(Dashboard, {
            localVue,
            i18n,
            stubs: {
                'vue-markdown': true
            }
        });
        const { signDiff } = wrapper.vm as Vue & {
            signDiff(
                d1: moment.Moment,
                d2: moment.Moment
            ): { time: number; unit: VueI18n.TranslateResult };
        };

        expect(
            signDiff(
                moment(moment.now()),
                moment(moment.now()).subtract(3, 'hour')
            )
        ).to.eql({
            unit: wrapper.vm.$t('hour'),
            time: 3
        });

        expect(
            signDiff(
                moment(moment.now()),
                moment(moment.now()).subtract(3, 'minute')
            )
        ).to.eql({
            unit: wrapper.vm.$t('min'),
            time: 3
        });
    });

    it('sign', async () => {
        const fakeSign = sinon.stub();
        fakeSign.onFirstCall().rejects();
        fakeSign.onSecondCall().resolves({ data: { userSign: { score: 50 } } });
        const $apollo = {
            mutate: fakeSign
        };
        const $Message = {
            success: sinon.stub(),
            error: sinon.stub()
        };
        const wrapper = shallow(Dashboard, {
            localVue,
            i18n,
            stubs: {
                'vue-markdown': true
            },
            mocks: {
                $apollo,
                $Message
            }
        });
        const { sign } = wrapper.vm as Vue & { sign(): Promise<void> };

        await sign();
        expect(fakeSign.called).to.be.true;
        expect(fakeSign.args[0][0]).to.have.keys('mutation', 'update');
        expect($Message.error.calledWith(wrapper.vm.$t('sign-failed'))).to.be
            .true;

        wrapper.setData({
            currentUser: {
                ...wrapper.vm.$data.currentUser,
                score: 20
            }
        });
        await sign();
        expect(
            $Message.success.calledWith(
                wrapper.vm.$t('sign-success', { score: 30 })
            )
        ).to.be.true;
    });

    it('tooltip of button `sign`', () => {
        const wrapper = shallow(Dashboard, {
            localVue,
            i18n,
            stubs: {
                'vue-markdown': true
            }
        });
        wrapper.setData({
            currentUser: {
                ...wrapper.vm.$data.currentUser,
                last_signed_at: moment(moment.now())
                    .subtract(3, 'hour')
                    .format('YYYY-MM-DD kk:mm:ss')
            }
        });
        expect(wrapper.find('.btn-sign').attributes()!.title).to.equal(
            wrapper.vm.$t('last-sign', {
                time: moment.duration(3, 'hours').humanize()
            })
        );
    });

    it('press `sign` button', () => {
        const wrapper = shallow(Dashboard, {
            localVue,
            i18n,
            stubs: {
                'vue-markdown': true
            }
        });
        wrapper.setData({
            currentUser: {
                ...wrapper.vm.$data.currentUser,
                last_signed_at: '2000-01-01 00:00:00'
            }
        });
        const fakeSign = sinon.stub();
        wrapper.setMethods({ sign: fakeSign });
        wrapper.find('.btn-sign').trigger('click');
        expect(fakeSign.called).to.be.true;
    });
});
