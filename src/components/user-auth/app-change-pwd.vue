<template lang="html">
    <div id="app">
        <b-modal
            v-model="showModal"
            hide-ok
            scrollable
            hide-cancel
            size="md"
            header-bg-variant="light"
            body-bg-variant="light"
            footer-bg-variant="light"
            no-close-on-esc
            no-close-on-backdrop>
            <template v-slot:modal-header="{ close }">
                <h3 class="label">更改密碼</h3>
                <b-button
                    size="sm"
                    @click="close()"
                    variant="light">
                    <font-awesome-icon icon="times"/>
                </b-button>
            </template>
            <template
                v-slot:default="{ hide }">
                <!-- <b-row>
                    <b-col>
                        <b-form-group
                            class="label"
                            :label="act.text"
                            :label-for="act.ref">
                            <b-form-input
                                v-model="act.value"
                                :ref="act.ref"
                                :disabled="act.disabled">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row> -->

                <!-- 舊密碼 -->
                <b-row>
                    <b-col>
                        <b-form-group
                            class="label"
                            :label="form.oldPwd.text"
                            :label-for="form.oldPwd.ref">
                            <b-form-input
                                type="password"
                                v-model="form.oldPwd.value"
                                :ref="form.oldPwd.ref"
                                :disabled="form.oldPwd.disabled">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <!-- 新密碼 -->
                <b-row>
                    <b-col>
                        <b-form-group
                            class="label"
                            :label="form.newPwd.text"
                            :label-for="form.newPwd.ref"
                            description="密碼長度最少8位，並且包含數字及英文字母。">
                            <b-form-input
                                type="password"
                                v-model="form.newPwd.value"
                                :ref="form.newPwd.ref"
                                :disabled="form.newPwd.disabled">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <!-- 確認密碼 -->
                <b-row>
                    <b-col>
                        <b-form-group
                            class="label"
                            :label="form.confirmPwd.text"
                            :label-for="form.confirmPwd.ref"
                            description="密碼長度最少8位，並且包含數字及英文字母。">
                            <b-form-input
                                type="password"
                                v-model="form.confirmPwd.value"
                                :ref="form.confirmPwd.ref"
                                :disabled="form.confirmPwd.disabled">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                <!-- 驗證碼 -->
                <b-row>
                    <b-col class="label">
                        <VerifyCode :ref="form.verifyCode.ref"></VerifyCode>
                    </b-col>
                </b-row>
            </template>

            <template v-slot:modal-footer="{ hide }">
                <b-container fluid>
                    <b-row>
                        <b-col>
                            <b-alert class="alert"
                                :show="changePwdMessage.show"
                                :variant="changePwdMessage.type">
                                {{ changePwdMessage.text }}
                            </b-alert>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="text-right label">
                            <b-button
                                variant="primary"
                                size="md"
                                :disabled="buttonChangePwd.disabled"
                                @click="changePwd(securityID)">
                                <b-spinner
                                    v-show="buttonChangePwd.handling"
                                    class="mr-2 mb-1"
                                    small>
                                </b-spinner>{{ buttonChangePwd.text }}
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
    // 載入驗證碼組件
    import VerifyCode from "@/components/user-auth/app-verify-code"

    export default {
        name: "ChangePwd",
        data() {
            return {
                websiteCode: "WEB01",
                showModal: false,
                form: {
                    oldPwd: {
                        text: "舊密碼",
                        ref: "oldPwd",
                        value: "",
                        disabled: false,
                    },
                    newPwd: {
                        text: "新密碼",
                        ref: "newPwd",
                        value: "",
                        disabled: false,
                    },
                    confirmPwd: {
                        text: "確認密碼",
                        ref: "confirmPwd",
                        value: "",
                        disabled: false,
                    },
                    verifyCode: {
                        ref: "verifyCode"
                    },
                },
                buttonChangePwd: {
                    text: "更改",
                    orgText: "更改",
                    ingText: "更改中...",
                    handling: false,
                    disabled: false,
                },
                buttonCancel: {
                    text: "取消",
                    disabled: false,
                },
                changePwdMessage: {
                    text: "",
                    show: false,
                    type: "danger",
                },
                alertErrType: "danger",
                alertSucType: "success",
                component: {
                    index: "/",
                    login: "/login",
                },
                api: {
                    changePwd: "http://192.168.12.26:9090/act-sys/change-pwd/",
                },
                pwdRegex: /^(?=.*[a-zA-Z])(?=.*[0-9]){6,}/,
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

                self.form.oldPwd.value = ""
                self.form.newPwd.value = ""
                self.form.confirmPwd.value = ""

                self.showModal = true;
            },
            cancel() {
                let self = this
                self.showModal = false;
            },
            changePwd(securityID) {
                let self = this

                let oldPwd = self.form.oldPwd.value
                let newPwd = self.form.newPwd.value
                let confirmPwd = self.form.confirmPwd.value
                let verifyCode = self.$refs[self.form.verifyCode.ref]

                let err = false
                // 舊密碼
                if(oldPwd.length < 1) {
                    self.changePwdMessage.text = "請輸入舊密碼"
                    self.$refs[self.form.oldPwd.ref].$el.focus()
                    err = true
                }
                // 新密碼
                else if(newPwd.length < 1) {
                    self.changePwdMessage.text = "請輸入新密碼"
                    self.$refs[self.form.newPwd.ref].$el.focus()
                    err = true
                }
                else if(!this.isPwdValid(newPwd)) {
                    self.changePwdMessage.text = "新密碼的格式不正確"
                    self.$refs[self.form.newPwd.ref].$el.focus()
                    err = true
                }
                // 新密碼不能沿用舊密碼
                else if(oldPwd == newPwd) {
                    self.changePwdMessage.text = "新密碼不能沿用舊密碼"
                    self.$refs[self.form.newPwd.ref].$el.focus()
                    err = true
                }
                // 確認密碼
                else if(confirmPwd.length < 1) {
                    self.changePwdMessage.text = "請輸入確認密碼"
                    self.$refs[self.form.confirmPwd.ref].$el.focus()
                    err = true
                }
                // 檢查新密碼與確認密碼不一致
                else if(newPwd != confirmPwd) {
                    self.changePwdMessage.text = "新密碼與確認密碼不一致"
                    self.$refs[self.form.confirmPwd.ref].$el.focus()
                    err = true
                }
                // 檢查驗證碼是否有輸入
                else if(verifyCode.get().length < 1) {
                    self.changePwdMessage.text = "請輸入驗證碼。"
                    verifyCode.focus()
                    err = true
                }
                // 檢查驗證碼是否輸入正確
                else if(!verifyCode.check()) {
                    self.changePwdMessage.text = "驗證碼不正確。"
                    verifyCode.focus()
                    err = true
                }

                // 發生錯誤處理(重置驗證碼)
                if(err) {
                    self.changePwdMessage.show = true
                    // 重置驗證碼
                    verifyCode.setup()
                    return
                }

                self.buttonChangePwd.text = self.buttonChangePwd.ingText
                self.buttonChangePwd.handling = true
                self.buttonChangePwd.disabled = true

                self.buttonCancel.disabled = true

                setTimeout(function() {
                    var md5 = require("md5")

                    self.axios(
                        {
                            method: "POST",
                            url: self.api.changePwd,
                            data: {
                                security_id: securityID,
                                old_pwd: md5(oldPwd),
                                new_pwd: md5(newPwd),
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
                                self.changePwdMessage.text = msg
                                self.changePwdMessage.type = self.alertErrType
                                self.changePwdMessage.show = true
                            }
                        }
                    }).catch(function(error) {
                        self.changePwdMessage.text = error
                        self.changePwdMessage.type = self.alertErrType
                        self.changePwdMessage.show = true
                    }).finally(function() {
                        // 重置驗證碼
                        verifyCode.setup()

                        self.buttonChangePwd.text = self.buttonChangePwd.orgText
                        self.buttonChangePwd.handling = false
                        self.buttonChangePwd.disabled = false

                        self.buttonCancel.disabled = false
                    })
                })
            },
            isPwdValid: function(pwd) {
                let self = this
                return self.pwdRegex.test(String(pwd))
            }
        },
        components: {
            VerifyCode
        }
    }
</script>

<style lang="css" scoped>
    @import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap&subset=chinese-traditional");

    .label {
        font-size: 1.3em;
        font-family: "Noto Sans TC", sans-serif;
    }

    .alert {
        font-family: "Noto Sans TC", sans-serif;
    }
</style>
