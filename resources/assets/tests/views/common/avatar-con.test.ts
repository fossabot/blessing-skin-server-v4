import Vue from 'vue';
import Vuex from 'vuex';
import { shallow, createLocalVue } from '@vue/test-utils';
import VueI18n from 'vue-i18n';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import AvatarCon from '../../../views/common/avatar-con.vue';

chai.use(sinonChai);

const localVue = createLocalVue();
localVue.prototype.$apollo = {
    query: sinon.stub()
};
const store = new Vuex.Store({
    state: {
        user: { nickname: 'nickname' }
    },
    mutations: {
        updateUserInfo() {}
    }
});
localVue.use(Vuex);
localVue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'en',
    silentTranslationWarn: true
});

describe('test `AvatarCon` component', () => {
    it('props', async () => {
        const wrapper = shallow(AvatarCon, {
            localVue,
            store,
            i18n,
            propsData: {
                shrink: true
            }
        });
        wrapper.setProps({ shrink: false });
        await wrapper.vm.$nextTick();
        expect(
            wrapper.find('.header-avator-con').element.style.display
        ).to.equal('none');

        wrapper.setProps({ shrink: true });
        await wrapper.vm.$nextTick();
        expect(
            wrapper.find('.header-avator-con').element.style.display
        ).to.equal('');
    });

    it('test `created` lifecycle hook', async () => {
        const mockApollo = sinon.stub();
        mockApollo.onFirstCall().resolves({ data: { currentUser: 'sth' } });
        const wrapper = shallow(AvatarCon, {
            localVue,
            store,
            i18n,
            propsData: {
                shrink: true
            },
            mocks: {
                $apollo: {
                    query: mockApollo
                }
            }
        });
        const mockCommit = sinon.stub(wrapper.vm.$store, 'commit');

        expect(mockApollo).to.have.been.called;
        await wrapper.vm.$nextTick();
        expect(mockCommit).to.have.been.calledWith('updateUserInfo', 'sth');
    });

    it('test computed value: current language name', async () => {
        const wrapper = shallow(AvatarCon, {
            localVue,
            store,
            i18n,
            propsData: {
                shrink: true
            }
        });

        wrapper.vm.$i18n.locale = 'zh-cn';
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.main-user-name').text()).to.equal('简体中文');

        wrapper.vm.$i18n.locale = 'en';
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.main-user-name').text()).to.equal('English');

        wrapper.vm.$i18n.locale = 'unknown';
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.main-user-name').text()).to.equal('简体中文');
    });

    it('change language', () => {
        const wrapper = shallow(AvatarCon, {
            localVue,
            store,
            i18n,
            propsData: {
                shrink: true
            },
            mocks: {
                $route: {
                    meta: { title: 'title' }
                }
            }
        });
        const vm = wrapper.vm as Vue & { changeLang(lang: string): void };

        vm.changeLang('en');
        expect(document.title).to.equal('title');
        expect(localStorage.getItem('language')).to.equal('en');

        vm.changeLang('zh-cn');
        expect(localStorage.getItem('language')).to.equal('zh-cn');
    });

    it('logout', async () => {
        const ajax = sinon.stub();
        ajax.onFirstCall().resolves();
        ajax.onSecondCall().rejects();

        const $Message = {
            success: sinon.stub(),
            error: sinon.stub()
        };

        const routerPush = sinon.stub();

        const wrapper = shallow(AvatarCon, {
            localVue,
            store,
            i18n,
            propsData: {
                shrink: true
            },
            mocks: {
                $router: {
                    push: routerPush
                },
                $Message,
                $ajax: {
                    post: ajax
                }
            }
        });
        const { vm } = wrapper;

        await wrapper.find('[data-test-id="logout"]').trigger('on-click');
        expect(ajax).to.have.been.calledWith('/api/auth/logout');
        expect($Message.success).to.have.been.calledWith(
            vm.$t('logout.success')
        );
        expect(routerPush).to.have.been.calledWith('/');

        await wrapper.find('[data-test-id="logout"]').trigger('on-click');
        expect($Message.error).to.have.been.calledWith(vm.$t('logout.failed'));
    });

    it('display nickname', () => {
        const wrapper = shallow(AvatarCon, {
            localVue,
            store,
            i18n,
            propsData: {
                shrink: true
            }
        });
        expect(
            wrapper
                .findAll('.main-user-name')
                .at(1)
                .text()
        ).to.equal('nickname');
    });
});
