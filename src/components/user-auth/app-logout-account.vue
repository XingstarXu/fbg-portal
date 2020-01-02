<template lang="html">
    <div id="app">
        <b-modal
            v-model="showModal"
            hide-ok
            hide-cancel
            size="md"
            header-bg-variant="light"
            body-bg-variant="light"
            footer-bg-variant="light"
            no-close-on-esc
            no-close-on-backdrop>
            <template v-slot:modal-header="{ close }">
                <h3 class="label">提示</h3>
                <b-button
                    size="sm"
                    @click="close()"
                    variant="light">
                    <font-awesome-icon icon="times" />
                </b-button>
            </template>
            <template
                v-slot:default="{ hide }">
                <h6 class="label">確定登出!</h6>
            </template>
            <template v-slot:modal-footer="{ hide }">
                <b-container fluid>
                    <b-row>
                        <b-col>
                            <b-alert
                                class="mt-3"
                                :show="logoutMessage.show"
                                :variant="logoutMessage.type">
                                {{ logoutMessage.text }}
                            </b-alert>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="text-right label">
                            <b-button
                                variant="primary"
                                size="md"
                                :disabled="buttonLogout.disabled"
                                @click="onLogout(securityID)">
                                <b-spinner
                                    v-show="buttonLogout.handling"
                                    class="mr-2 mb-1"
                                    small>
                                </b-spinner>{{ buttonLogout.text }}
                            </b-button>
                            <b-button
                                class="ml-3"
                                variant="danger"
                                size="md"
                                :disabled="buttonCancel.disabled"
                                @click="cancel()">{{ buttonCancel.text }}
                            </b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "LogoutAccount",
    data() {
        return {
            websiteCode: "WEB01",
            showModal: false,
            buttonLogout: {
                text: "登出",
                orgText: "登出",
                ingText: "登出中...",
                handling: false,
                disabled: false,
            },
            buttonCancel: {
                text: "取消",
                disabled: false,
            },
            logoutMessage: {
                text: "",
                type: "",
                show: false
            },
            alertErrType: "danger",
            alertSucType: "success",
            api: {
                logout: "http://192.168.12.26:9090/act-sys/logout/"
            },
            component: {
                login: "/login",
                index: "/"
            }
        }
    },
    props: {
        securityID: {
            type: String,
            default: ""
        }
    },
    methods: {
        show() {
            let self = this
            self.showModal = true;
        },
        cancel() {
            let self = this
            self.showModal = false;
        },
        onLogout(securityID) {
            let self = this

            self.buttonLogout.text = self.buttonLogout.ingText
            self.buttonLogout.handling = true
            self.buttonLogout.disabled = true

            self.buttonCancel.disabled = true

            setTimeout(function() {
                self.axios(
                    {
                        method: "POST",
                        url: self.api.logout,
                        data: {
                            security_id: securityID,
                            website_code: self.websiteCode,
                        },
                    }
                ).then(function(response) {
                    var code = response.data.code
                    var msg = response.data.msg

                    if(code > 0) {
                        // 刪除 cookies
                        self.$cookies.remove("security_id")
                        // 轉至登入頁面
                        self.$router.replace(self.component.login)
                    }
                    else {
                        if(code == -1111003 || code == -1111004) {
                            // 刪除 cookies
                            self.$cookies.remove("security_id")
                            // 轉至登入頁面
                            self.$router.replace(self.component.index)
                        }
                        else {
                            self.logoutMessage.text = msg
                            self.logoutMessage.type = self.alertErrType
                            self.logoutMessage.show = true
                        }
                    }
                }).catch(function(error) {
                    self.logoutMessage.text = error
                    self.logoutMessage.type = self.alertErrType
                    self.logoutMessage.show = true
                }).finally(function() {
                    self.buttonLogout.text = self.buttonLogout.orgText
                    self.buttonLogout.handling = false
                    self.buttonLogout.disabled = false

                    self.buttonCancel.disabled = false
                })
            }.bind(this), 1000)
        }
    }
}
</script>

<style lang="css" scoped>
    @import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap&subset=chinese-traditional");

    .label {
        font-family: "Noto Sans TC", sans-serif;
    }
</style>
