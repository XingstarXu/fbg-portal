<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: "app",
}
</script>

<style>
    @import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap&subset=chinese-traditional");

    html, body, #app {
        width: 100%;
        height: 100%;

        /* 令 <body> 所有元素上下置中 */
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;

        background-color: #F5F5F5;

        font-family: "Noto Sans TC", sans-serif;
    }
</style>
