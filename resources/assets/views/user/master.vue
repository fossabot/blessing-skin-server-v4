<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo" />
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate" />
                            Item 1
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider
                    breakpoint="md"
                    collapsible
                    class="sidebar"
                    v-model="sidebarCollapsed"
                    :collapsed-width="75">
                    <Menu
                        active-name="1-2"
                        theme="dark"
                        width="auto"
                        :open-names="['1']"
                        :class="menuItemsClasses">
                        <MenuItem
                            v-for="menuItem in userMenu"
                            :key="menuItem.name"
                            :name="menuItem.name">
                            <Icon :type="menuItem.icon"></Icon>
                            <span>{{ menuItem.text }}</span>
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
import { user as userMenu } from '../../menu';

export default {
    name: 'UserMaster',
    data() {
        return {
            sidebarCollapsed: false,
            userMenu
        };
    },
    computed: {
        menuItemsClasses() {
            return ['menu-item', this.sidebarCollapsed ? 'collapsed-menu' : ''];
        }
    }
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
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}

.sidebar {
    background: #fff;
    min-height: 80vh;
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
