<template lang="html">
    <div id="app">
        <b-container id="container" fluid class="h-100">
            <!-- 標題 -->
            <b-row>
                <b-col>
                    <h1>{{ title }}</h1>
                </b-col>
            </b-row>

            <b-row align-h="center" class="mt-5">
                <font-awesome-icon icon="user-circle" class="fa-10x" />
            </b-row>

            <b-row align-h="center" class="mt-2">
                <h3>{{ name }}</h3>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "Profile",
        data() {
            return {
                websiteCode: "WEB01",
                title: "主頁面",
                name: "",
                api: {
                    selUser: "http://192.168.12.26:9090/act-sys/sel-user/"
                },
                component: {
                    index: "/",
                    login: "/login",
                },
                toastErrType: "danger",
                toastSucType: "success",
            }
        },
        mounted() {
            let self = this

            if(self.$cookies.isKey("security_id")) {
                self.securityID = self.$cookies.get("security_id")

                self.axios(
                    {
                        method: "POST",
                        url: self.api.selUser,
                        data: {
                            security_id: self.securityID,
                            website_code: self.websiteCode,
                        }
                    }
                ).then(function(response) {
                    var code = response.data.code
                    var msg = response.data.msg

                    if(code > 0) {
                        // 成功讀取帳號資訊
                        let data = response.data.data

                        self.name = data["name"]
                    }
                    else {
                        if(code == -1111003 || code == -1111004) {
                            // 刪除 cookies
                            self.$cookies.remove("security_id")
                            // 轉至首頁
                            self.$router.replace(self.component.index)
                        }
                        else {
                            self.$bvToast.toast(
                                msg,
                                {
                                    title: "錯誤",
                                    variant: self.toastErrType,
                                    solid: true
                                }
                            )
                        }
                    }
                }).catch(function(error) {
                    self.$bvToast.toast(error, {
                        title: "錯誤",
                        variant: self.toastErrType,
                        solid: true
                    })
                })
            }
            else {
                // 轉至「登入」頁面
                self.$router.replace(self.component.login)
                return
            }
        }
    }
</script>

<style lang="css" scoped>

</style>
