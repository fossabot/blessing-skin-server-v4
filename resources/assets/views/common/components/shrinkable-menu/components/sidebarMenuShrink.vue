<template>
    <div>
        <template v-for="item in menuList">
            <div class="shrinked-sidebar" :key="item.name">
                <i-dropdown
                    transfer
                    v-if="item.children"
                    placement="right-start"
                    :key="item.name"
                    @on-click="gotoLink">
                    <i-button class="btn" type="text">
                        <i-icon :size="20" :color="iconColor" :type="item.icon" />
                    </i-button>
                    <i-dropdown-menu class="dropdown-menu" slot="list">
                        <template v-for="child in item.children">
                            <i-dropdown-item :name="child.name" :key="child.name">
                                <i-icon :type="child.icon"></i-icon>
                                <span v-t="child.text" class="item-text" />
                            </i-dropdown-item>
                        </template>
                    </i-dropdown-menu>
                </i-dropdown>
                <i-dropdown
                    transfer
                    v-else
                    placement="right-start"
                    :key="item.name"
                    @on-click="gotoLink">
                    <i-button
                        @click="gotoLink(item.name)"
                        class="btn"
                        type="text">
                        <i-icon
                            :size="20"
                            :color="iconColor"
                            :type="item.icon">
                        </i-icon>
                    </i-button>
                    <i-dropdown-menu class="dropdown-menu" slot="list">
                        <i-dropdown-item :name="item.name">
                            <i-icon :type="item.icon"></i-icon>
                            <span class="item-text" v-t="item.text" />
                        </i-dropdown-item>
                    </i-dropdown-menu>
                </i-dropdown>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'SidebarMenuShrink',
    props: {
        menuList: {
            type: Array
        },
        iconColor: {
            type: String,
            default: 'white'
        },
        menuTheme: {
            type: String,
            default: 'dark'
        }
    },
    methods: {
        gotoLink(link: string): void {
            this.$router.push(link);
        }
    }
});
</script>

<style lang="less" scoped>
.shrinked-sidebar {
    text-align: center;
}

.btn {
    width: 70px;
    margin-left: -5px;
    padding: 10px 0;
}

.item-text {
    padding-left: 10px;
}

.dropdown-menu {
    width: 200px;
}
</style>
