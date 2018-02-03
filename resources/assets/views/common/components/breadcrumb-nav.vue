<template>
    <i-breadcrumb>
        <i-breadcrumb-item href="/">
            {{ currentPath[0].title }}
        </i-breadcrumb-item>
        <i-breadcrumb-item 
            v-for="item in currentPath.slice(1)" 
            :href="item.path" 
            :key="item.path"
        >{{ $t(item.title) }}</i-breadcrumb-item>
        <!-- DO NOT use `v-t` directive above. -->
    </i-breadcrumb>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'BreadcrumbNav',
    props: {
        currentPath: Array
    }
});
</script>
