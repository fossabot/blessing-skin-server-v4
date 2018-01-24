<template>
    <Breadcrumb>
        <BreadcrumbItem href="/">
            {{ currentPath[0].title }}
        </BreadcrumbItem>
        <BreadcrumbItem 
            v-for="item in currentPath.slice(1)" 
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
