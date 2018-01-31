<template>
    <div ref="avatarCon" class="header-avator-con">                    
        <div class="user-dropdown-menu-con">
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                <Dropdown transfer trigger="click" @on-click="changeLang">
                    <a style="cursor: pointer;">
                        <span class="main-user-name">{{ currentLangName }}</span>
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem
                            v-for="lang in langs"
                            :key="lang.value"
                            :name="lang.value"
                        >{{ lang.text }}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown transfer trigger="click" @on-click="logout">
                    <a style="cursor: pointer;">
                        <span class="main-user-name">{{ $store.state.user.nickname }}</span>
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="logout" v-t="`logout.action`" />
                    </DropdownMenu>
                </Dropdown>
                <Avatar src="" class="avatar"></Avatar>
            </Row>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
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
            return lang ? lang.text : 'zh-cn';
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
    created() {
        this.$store.dispatch('fetchUserInfo');
    },
    watch: {
        shrink(newValue: boolean) {
            if (window.outerWidth <= 768) {
                if (newValue === false) {
                    (this.$refs.avatarCon as HTMLElement).style.display =
                        'none';
                } else {
                    (this.$refs.avatarCon as HTMLElement).style.display =
                        'block';
                }
            } else {
                (this.$refs.avatarCon as HTMLElement).style.display = 'block';
            }
        }
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
