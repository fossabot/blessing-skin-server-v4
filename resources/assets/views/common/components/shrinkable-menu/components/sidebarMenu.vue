<template>
    <i-menu
        ref="sideMenu"
        :active-name="$route.path"
        :theme="menuTheme"
        width="auto"
        @on-select="gotoLink">
        <template v-for="item in menuList">
            <i-submenu
                :name="item.name"
                :key="item.name"
                v-if="item.children">
                <template slot="title">
                    <i-icon :type="item.icon" :size="iconSize"></i-icon>
                    <span class="layout-text" v-t="item.text" />
                </template>
                <template v-for="child in item.children">
                    <i-menu-item :name="child.name" :key="`item-${child.name}`">
                        <i-icon :type="child.icon" :key="`icon-${child.name}`" />
                        <span
                            class="layout-text"
                            :key="`text-${child.name}`"
                            v-t="child.text"
                        ></span>
                    </i-menu-item>
                </template>
            </i-submenu>

            <i-menu-item v-else :name="item.name" :key="`item-${item.name}`">
                <i-icon :type="item.icon" :key="`icon-${item.name}`"></i-icon>
                <span
                    class="layout-text"
                    :key="`text-${item.name}`"
                    v-t="item.text"
                ></span>
            </i-menu-item>
        </template>
    </i-menu>
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
                const sideMenu = this.$refs.sideMenu as Vue & {
                    updateOpened: Function;
                };
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
