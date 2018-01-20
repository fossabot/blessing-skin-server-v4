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
                        <span class="main-user-name">{{ currentUser.nickname }}</span>
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="logout" v-t="`logout`" />
                    </DropdownMenu>
                </Dropdown>
                <Avatar src="" class="avatar"></Avatar>
            </Row>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
    name: 'AvatarCon',
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
    props: {
        shrink: Boolean
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
        currentLangName() {
            return this.langs.find(lang => lang.value === this.$i18n.locale)
                .text;
        }
    },
    methods: {
        changeLang(lang) {
            this.$i18n.locale = lang;
            document.title = this.$t(this.$route.meta.title);
            localStorage.setItem('language', lang);
        },
        logout() {
            //
        }
    },
    watch: {
        shrink(newValue) {
            if (window.outerWidth <= 768) {
                if (newValue === false) {
                    this.$refs.avatarCon.style.display = 'none';
                } else {
                    this.$refs.avatarCon.style.display = 'block';
                }
            } else {
                this.$refs.avatarCon.style.display = 'block';
            }
        }
    }
};
</script>
