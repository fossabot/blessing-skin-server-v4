<template>
    <div class="layout">
        <Layout>
            <header-bar />
            <Layout>
                <Sider
                    breakpoint="md"
                    collapsible
                    class="sidebar"
                    v-model="sidebarCollapsed"
                    :collapsed-width="75"
                    :style="{ minHeight }">
                    <Menu
                        :active-name="$route.path"
                        theme="dark"
                        width="auto"
                        :class="menuItemsClasses"
                        @on-select="gotoLink">
                        <MenuItem
                            v-for="menuItem in userMenu"
                            :key="menuItem.name"
                            :name="menuItem.link">
                            <Icon :type="menuItem.icon"></Icon>
                            <span v-t="`menu.${menuItem.text}`"></span>
                        </MenuItem>
                    </Menu>
                </Sider>
                <Layout class="content-layout">
                    <Content class="content-wrapper">
                        <slot />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import HeaderBar from '../common/header-bar';
import { user as userMenu } from '../../menu';

export default {
    name: 'UserMaster',
    components: {
        HeaderBar
    },
    data() {
        return {
            sidebarCollapsed: false,
            userMenu
        };
    },
    computed: {
        menuItemsClasses() {
            return ['menu-item', this.sidebarCollapsed ? 'collapsed-menu' : ''];
        },
        minHeight() {
            return (window.innerHeight - 48 - 64) + 'px';
        }
    },
    methods: {
        gotoLink(link) {
            this.$router.push(link);
        }
    },
};
</script>

<style lang="less" scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.sidebar {
    min-height: 876px;
}

.content-layout {
    padding: 0 24px 24px;
}

.content-wrapper {
    padding: 24px;
    min-height: 280px;
}

.menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
}

.menu-item i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
}

.collapsed-menu span {
    width: 0px;
    transition: width 0.2s ease;
}

.collapsed-menu i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
}
</style>

<i18n>
en:
    menu:
        dashboard: Dashboard
        closet: Closet
        players: Players
        profile: Profile
zh-cn:
    menu:
        dashboard: 仪表盘
        closet: 我的衣柜
        players: 角色管理
        profile: 个人资料
</i18n>
