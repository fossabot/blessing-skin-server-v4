<template>
    <div class="main" :class="{ 'main-hide-text': shrink }">
        <div
            class="sidebar-menu-con"
            :style="{
                width: shrink ? sidebarWidth() : '200px',
                overflow: shrink ? 'visible' : 'auto'
            }">
            <shrinkable-menu 
                :shrink="shrink"
                :theme="menuTheme" 
                :menu-list="menuList">
                <div slot="top" class="logo-con">
                </div>
            </shrinkable-menu>
        </div>
        <div
            class="main-header-con"
            :style="{ paddingLeft: shrink ? sidebarWidth() : '200px' }">
            <div class="main-header">
                <div class="navicon-con">
                    <Button
                        :style="{transform: `rotateZ(${this.shrink ? '-90' : '0'}deg)`}"
                        type="text"
                        @click="toggleSidebar">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="$store.state.ui.breadcrumb" />
                    </div>
                </div>
                <avatar-con :shrink="shrink" />
            </div>
        </div>
        <div
            class="single-page-con"
            :style="{ left: shrink ? sidebarWidth() : '200px' }">
            <div class="single-page">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import ShrinkableMenu from './components/shrinkable-menu/shrinkable-menu';
import BreadcrumbNav from './components/breadcrumb-nav';
import AvatarCon from './avatar-con';

export default {
    components: {
        ShrinkableMenu,
        BreadcrumbNav,
        AvatarCon
    },
    data() {
        return {
            shrink: false,
            userName: '',
            menuTheme: 'dark',
            menuList: []
        };
    },
    methods: {
        sidebarWidth() {
            return window.outerWidth <= 768 ? '0' : '60px';
        },
        toggleSidebar() {
            this.shrink = !this.shrink;
        }
    },
    created() {
        if (window.outerWidth <= 768) {
            this.shrink = true;
        }
    }
};
</script>

<!-- DO NOT use scoped style -->
<style lang="less">
@import './styles/common.less';
@import './styles/main.less';

.avatar {
    background: #619fe7;
    margin-left: 10px;
}
</style>
