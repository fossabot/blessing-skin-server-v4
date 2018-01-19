<template>
    <Breadcrumb>
        <BreadcrumbItem 
            v-for="item in currentPath" 
            :href="item.path" 
            :key="item.path"
        >{{ $t(item.title) }}</BreadcrumbItem>
        <!-- DO NOT use `v-t` directive above. -->
    </Breadcrumb>
</template>

<script>
export default {
    name: 'BreadcrumbNav',
    props: {
        currentPath: Array
    }
};
</script>
