<template>
    <div ref="menu" :style="styles" class="ivu-shrinkable-menu">
        <slot name="top"></slot>
        <sidebar-menu 
            v-show="!shrink"
            :menu-theme="theme" 
            :menu-list="menuList"
        ></sidebar-menu>
        <sidebar-menu-shrink 
            v-show="shrink"
            :menu-theme="theme"
            :menu-list="menuList"
            :icon-color="shrinkIconColor"
        ></sidebar-menu-shrink>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SidebarMenu from './components/sidebarMenu.vue';
import SidebarMenuShrink from './components/sidebarMenuShrink.vue';

export default Vue.extend({
    name: 'ShrinkableMenu',
    components: {
        SidebarMenu,
        SidebarMenuShrink
    },
    props: {
        shrink: {
            type: Boolean,
            default: false
        },
        menuList: {
            type: Array,
            required: true
        },
        theme: {
            type: String,
            default: 'dark',
            validator(val: string) {
                return ['dark', 'light'].includes(val);
            }
        },
        openNames: {
            type: Array
        }
    },
    computed: {
        bgColor(): string {
            return this.theme === 'dark' ? '#495060' : '#fff';
        },
        shrinkIconColor(): string {
            return this.theme === 'dark' ? '#fff' : '#495060';
        },
        styles() {
            return {
                background: this.bgColor
            };
        }
    },
    mounted() {
        if (window.outerWidth <= 768) {
            (this.$refs.menu as HTMLElement).style.display = 'none';
        }
    },
    watch: {
        shrink(newValue) {
            if (window.outerWidth <= 768) {
                if (newValue) {
                    (this.$refs.menu as HTMLElement).style.display = 'none';
                } else {
                    (this.$refs.menu as HTMLElement).style.display = 'block';
                }
            } else {
                (this.$refs.menu as HTMLElement).style.display = 'block';
            }
        }
    }
});
</script>

<style lang="less" scoped>
.ivu-shrinkable-menu {
    height: 100%;
    width: 100%;
}
</style>
