<template>
    <div v-show="show" class="header-avator-con">                    
        <div class="user-dropdown-menu-con">
            <i-row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                <i-dropdown transfer trigger="click" @on-click="changeLang">
                    <a style="cursor: pointer;">
                        <span class="main-user-name">{{ currentLangName }}</span>
                        <i-icon type="arrow-down-b"></i-icon>
                    </a>
                    <i-dropdown-menu slot="list">
                        <i-dropdown-item
                            v-for="lang in langs"
                            :key="lang.value"
                            :name="lang.value"
                        >{{ lang.text }}</i-dropdown-item>
                    </i-dropdown-menu>
                </i-dropdown>
                <i-dropdown data-test-id="logout" transfer trigger="click" @on-click="logout">
                    <a style="cursor: pointer;">
                        <span class="main-user-name">{{ $store.state.user.nickname }}</span>
                        <i-icon type="arrow-down-b"></i-icon>
                    </a>
                    <i-dropdown-menu slot="list">
                        <i-dropdown-item name="logout" v-t="`logout.action`" />
                    </i-dropdown-menu>
                </i-dropdown>
                <i-avatar src="" class="avatar"></i-avatar>
            </i-row>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import gql from 'graphql-tag';
import i18n from '../../libs/i18n';

export default Vue.extend({
    name: 'AvatarCon',
    props: {
        shrink: Boolean
    },
    data() {
        return {
            langs: [
                { text: '简体中文', value: 'zh-cn' },
                { text: 'English', value: 'en' }
            ]
        };
    },
    computed: {
        currentLangName(): string {
            const lang = this.langs.find(
                lang => lang.value === this.$i18n.locale
            );
            return lang ? lang.text : '简体中文';
        },
        show(): boolean {
            /* Test this in e2e test */
            return window.innerWidth >= 768 || this.shrink;
        }
    },
    methods: {
        changeLang(lang: string) {
            i18n.locale = lang;
            document.title = this.$t(this.$route.meta.title).toString();
            localStorage.setItem('language', lang);
        },
        async logout() {
            try {
                await this.$ajax.post('/api/auth/logout');
                this.$Message.success(this.$t('logout.success'));
                this.$router.push('/');
            } catch (error) {
                this.$Message.error(this.$t('logout.failed'));
            }
        }
    },
    async created() {
        const { data } = await this.$apollo.query({
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
        this.$store.commit(
            'updateUserInfo',
            (data as { currentUser: User }).currentUser
        );
    }
});
</script>

<i18n>
en:
    logout:
        action: Log out
        success: Logged out successfully.
        failed: Failed to log out.

zh-cn:
    logout:
        action: 退出登录
        success: 登出成功
        failed: 登出失败
</i18n>
