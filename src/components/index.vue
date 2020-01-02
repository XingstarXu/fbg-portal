<template lang="html">
    <div id="index">
        <b-container fluid id="container">
            <b-row>
                <b-col>
                    <img alt="FBGroup logo" src="../assets/img/logo.png">
                </b-col>
            </b-row>
            <b-row
                v-if="webStatus===2"
                class="text-center mt-5"
                align-v="center">
                <b-col cols="5">
                    <font-awesome-icon
                        icon="tools" class="fa-5x" />
                </b-col>
                <b-col cols="7">
                    <h1>網站維護中</h1>
                    <h6>請聯絡電腦部</h6>
                </b-col>
            </b-row>
            <b-row
                v-else-if="webStatus===-1"
                class="text-center mt-5"
                align-v="center">
                <b-col cols="5">
                    <font-awesome-icon
                        icon="bug" class="fa-5x" />
                </b-col>
                <b-col cols="7">
                    <h1>網站錯誤</h1>
                    <h6>請聯絡電腦部</h6>
                </b-col>
            </b-row>
        </b-container>
    </div>

</template>

<script>
export default {
    name: "Index",
    data() {
        return {
            websiteCode: "WEB01",
            api: {
                checkWebsiteStatus: "http://192.168.12.26:9090/fbg-portal/check-website-status/",
            },
            // -1: 錯誤, 1: 上線, 2: 維護
            webStatus: 1,
        }
    },
    mounted: function() {
        let self = this

        self.axios(
            {
                method: "POST",
                url: self.api.checkWebsiteStatus,
                data: {
                    website_code: self.websiteCode
                }
            }
        ).then(function(response) {
            var code = response.data.code
            // var msg = response.data.msg

            if(code > 0) {
                // 網站維護中
                if(code == 1311003) {
                    self.webStatus = 2
                } else {
                    // 轉至登入介面
                    self.$router.replace({ name: "UserAuth" })
                }
            }
            else {
                // 網站錯誤
                self.webStatus = -1
            }
        }).catch(function() {
            // TOMMY
            // console.log(error)
            // 網站錯誤
            self.webStatus = -1
        })
    }
}
</script>

<style lang="css" scoped>
    #index {
        width: 100%;
        height: 100%;

        /* 令 <body> 所有元素上下置中 */
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
    }

    #container {
        max-width: 420px;
    }

    img {
        width: 100%;
    }
</style>
