<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<style lang="less">
@font-face {
    font-family: Minecraft;
    src: url('./fonts/minecraft.woff2') format('woff2');
}

html,
body {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}

.app-main {
    width: 100%;
    height: 100%;
}
</style>
