<template>
    <Menu
        ref="sideMenu"
        :active-name="$route.path"
        :theme="menuTheme"
        width="auto"
        @on-select="gotoLink">
        <template v-for="item in menuList">
            <Submenu
                :name="item.name"
                :key="item.name"
                v-if="item.children">
                <template slot="title">
                    <Icon :type="item.icon" :size="iconSize"></Icon>
                    <span class="layout-text" v-t="item.text" />
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="child.name" :key="`item-${child.name}`">
                        <Icon :type="child.icon" :key="`icon-${child.name}`" />
                        <span
                            class="layout-text"
                            :key="`text-${child.name}`"
                            v-t="child.text"
                        ></span>
                    </MenuItem>
                </template>
            </Submenu>

            <MenuItem v-else :name="item.name" :key="`item-${item.name}`">
                <Icon :type="item.icon" :key="`icon-${item.name}`"></Icon>
                <span
                    class="layout-text"
                    :key="`text-${item.name}`"
                    v-t="item.text"
                ></span>
            </MenuItem>
        </template>
    </Menu>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'SidebarMenu',
    props: {
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        },
        openNames: {
            type: Array
        }
    },
    methods: {
        gotoLink(link: string): void {
            this.$router.push(link);
        }
    },
    updated() {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                const sideMenu = (this.$refs.sideMenu as Vue & { updateOpened: Function });
                sideMenu.updateOpened();
            }
        });
    }
});
</script>

<style lang="less" scoped>
.ivu-shrinkable-menu {
    height: 100%;
    width: 100%;
}
</style>
