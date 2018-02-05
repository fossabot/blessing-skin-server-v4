import Vue from 'vue';
import { shallow, createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';
import axios from 'axios';
import moxios from 'moxios';
import VueI18n from 'vue-i18n';
import Dashboard from '../../../views/user/dashboard.vue';

const localVue = createLocalVue();
localVue.prototype.$ajax = axios;
localVue.use(VueI18n);
const i18n = new VueI18n({
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
        expect(vmData.announcement).to.equals('');
        expect(vmData.currentUser.score).to.equals(0);
        expect(vmData.currentUser.players).to.be.an('array').and.empty;
        expect(vmData.currentUser.closet).to.be.an('array').and.empty;
        expect(vmData.currentUser.last_signed_at).to.equals('');
        expect(vmData.scoreInfo.signAfterZero).to.be.false;
        expect(vmData.scoreInfo.signGapTime).to.equals(24);
        expect(vmData.scoreInfo.perPlayer).to.equals(100);
        expect(vmData.scoreInfo.perStorage).to.equals(1);
        expect(vmData.scoreInfo.returnScore).to.be.true;
        expect(vmData.scoreInfo.initial).to.equals(1000);
        expect(vmData.scoreInfo.signScore).to.equals('10,100');
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
            expect(wrapper.vm.$data.announcement).to.equals(
                'test announcement'
            );
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

    describe('test computed values', () => {
        it('get used storage', () => {
            const wrapper = shallow(Dashboard, {
                localVue,
                i18n,
                stubs: {
                    'vue-markdown': true
                }
            });
            const vm = wrapper.vm as Vue & { usedStorage: number };

            expect(vm.usedStorage).to.equals(0);

            wrapper.setData(
                Object.assign(vm.$data.currentUser, {
                    closet: [{ texture: { size: 5 } }]
                })
            );
            expect(vm.usedStorage).to.equals(5);
        });

        it('get storage percent', () => {
            const wrapper = shallow(Dashboard, {
                localVue,
                i18n,
                stubs: {
                    'vue-markdown': true
                }
            });
            const vm = wrapper.vm as Vue & { storagePercent: number };

            expect(vm.storagePercent).to.equals(0);

            wrapper.setData(
                Object.assign(vm.$data.currentUser, {
                    closet: [{ texture: { size: 5 } }],
                    score: 100
                })
            );
            expect(vm.storagePercent).to.closeTo(0.05, 0.005);
        });
    });
});
