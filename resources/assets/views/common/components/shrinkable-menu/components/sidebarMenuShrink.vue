<template>
    <div>
        <template v-for="item in menuList">
            <div class="shrinked-sidebar" :key="item.name">
                <Dropdown
                    transfer
                    v-if="item.children"
                    placement="right-start"
                    :key="item.name"
                    @on-click="gotoLink">
                    <Button class="btn" type="text">
                        <Icon :size="20" :color="iconColor" :type="item.icon" />
                    </Button>
                    <DropdownMenu class="dropdown-menu" slot="list">
                        <template v-for="child in item.children">
                            <DropdownItem :name="child.name" :key="child.name">
                                <Icon :type="child.icon"></Icon>
                                <span v-t="child.text" class="item-text" />
                            </DropdownItem>
                        </template>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown
                    transfer
                    v-else
                    placement="right-start"
                    :key="item.name"
                    @on-click="gotoLink">
                    <Button
                        @click="gotoLink(item.name)"
                        class="btn"
                        type="text">
                        <Icon
                            :size="20"
                            :color="iconColor"
                            :type="item.icon">
                        </Icon>
                    </Button>
                    <DropdownMenu class="dropdown-menu" slot="list">
                        <DropdownItem :name="item.name">
                            <Icon :type="item.icon"></Icon>
                            <span class="item-text" v-t="item.text" />
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </template>
    </div>
</template>

<script>
export default {
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
        gotoLink(link) {
            this.$router.push(link);
        }
    }
};
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
