<template lang="html">
    <div id="user-auth">
        <b-container fluid id="container">
            <img alt="FBGroup logo" src="../../assets/img/logo.png">
            <!-- 路由出口，匹配到的組件在這裡進行渲染。 -->
            <router-view></router-view>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "UserAuth",
    }
</script>

<style lang="css" scoped>
    img {
        width: 100%;
    }

    #user-auth {
        width: 100%;
        height: 100%;

        /* 令 <body> 所有元素上下置中 */
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
    }

    #container {
        max-width: 30em;
    }
</style>
