<template>
    <Header>
        <Menu mode="horizontal" theme="dark" active-name="1" @on-select="changeLang">
            <div class="layout-logo" />
            <div class="layout-nav">
                <Submenu name="lang-switch">
                    <template slot="title">
                        <Icon type="earth"></Icon>
                        <span>{{ currentLangText }}</span>
                    </template>
                    <MenuItem
                        v-for="lang in langs"
                        :key="lang.value"
                        :name="lang.value"
                    >{{ lang.text }}</MenuItem>
                </Submenu>
                <MenuItem name="1">
                    <Icon type="person" />
                    {{ currentUser.nickname }}
                </MenuItem>
            </div>
                </Menu>
    </Header>
</template>

<script>
import gql from 'graphql-tag';

export default {
    name: 'HeaderBar',
    apollo: {
        currentUser: {
            query: gql`
                query {
                    currentUser {
                        nickname
                    }
                }
            `
        }
    },
    data() {
        return {
            langs: [
                { text: '简体中文', value: 'zh-cn' },
                { text: 'English', value: 'en' }
            ],
            currentUser: { nickname: '' }
        };
    },
    computed: {
        currentLangText() {
            return this.langs.find(lang => lang.value === this.$i18n.locale)
                .text;
        }
    },
    methods: {
        changeLang(lang) {
            this.$i18n.locale = lang;
            localStorage.setItem('language', lang);
        }
    }
};
</script>

<style lang="less" scoped>
.layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}

.layout-nav {
    width: 270px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
