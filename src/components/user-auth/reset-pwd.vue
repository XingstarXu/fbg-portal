<template lang="html">
    <div id="app">
        <b-container fluid id="container">
            <!-- 申請重設密碼 -->
            <b-row class="mt-4 mb-2">
                <b-col>
                    <h2>{{ title }}</h2>
                </b-col>
            </b-row>

            <b-row v-show="showForm">
                <b-col>
                    <!-- 帳號 -->
                    <b-row>
                        <b-col>
                            <b-form-group
                                class="label"
                                :label="form.act.text"
                                :label-for="form.act.ref">
                                <b-form-input
                                    v-model="form.act.value"
                                    :ref="form.act.ref"
                                    :disabled="form.act.disabled">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <!-- 新密碼 -->
                    <b-row>
                        <b-col>
                            <b-form-group
                                class="label"
                                :label="form.pwd.text"
                                :label-for="form.pwd.ref"
                                description="密碼長度最少8位，並且包含數字及英文字母。">
                                <b-form-input
                                    type="password"
                                    v-model="form.pwd.value"
                                    :ref="form.pwd.ref"
                                    :disabled="form.pwd.disabled">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <!-- 再一次輸入密碼 -->
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
                    <b-row v-show="form.verifyCode.show">
                        <b-col>
                            <b-form-group
                                class="label"
                                :label="form.verifyCode.text"
                                :label-for="form.verifyCode.ref">
                                <b-form-input
                                    v-model="form.verifyCode.value"
                                    :ref="form.verifyCode.ref"
                                    :disabled="form.verifyCode.disabled">
                                </b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <!-- 訊息 -->
                    <b-row>
                        <b-col>
                            <b-alert
                                class="mt-3"
                                :show="resetPwdMessage.show"
                                :variant="resetPwdMessage.type">
                                {{ resetPwdMessage.text }}
                            </b-alert>
                        </b-col>
                    </b-row>

                    <!-- 重置 -->
                    <b-row>
                        <b-col>
                            <b-button
                                class="mt-3"
                                size="lg"
                                variant="primary"
                                :disabled="buttonReset.disabled"
                                @click="resetPwd()"
                                block>
                                <b-spinner
                                    v-show="buttonReset.handling"
                                    class="mr-3">
                                </b-spinner>{{ buttonReset.text }}
                            </b-button>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>

            <b-row v-show="toResetPwdMessage.show">
                <b-col>
                    <b-row>
                        <b-col>
                            <b-alert
                                show=true
                                :variant="toResetPwdMessage.type">
                                {{ toResetPwdMessage.text }}
                            </b-alert>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col id="col-to-login">
                            <router-link
                                id="to-login" :to="component.login">
                                返回登入首面<font-awesome-icon icon="caret-square-right" />
                            </router-link>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "ResetPwd",
        data() {
            return {
                websiteCode: "WEB01",
                title: "重置密碼",
                applyID: "",
                form: {
                    // 帳號
                    act: {
                        text: "帳號",
                        ref: "act",
                        value: "",
                        disabled: true,
                    },
                    // 新密碼
                    pwd: {
                        text: "密碼",
                        ref: "pwd",
                        value: "",
                        disabled: false,
                    },
                    // 確認密碼
                    confirmPwd: {
                        text: "確認密碼",
                        ref: "confirmPwd",
                        value: "",
                        disabled: false,
                    },
                    // 驗認碼
                    verifyCode: {
                        text: "驗認碼",
                        ref: "verifyCode",
                        value: "",
                        disabled: false,
                        show: true
                    }
                },
                showForm: false,
                resetPwdMessage: {
                    text: "",
                    show: false,
                    type: "danger",
                },
                toResetPwdMessage: {
                    text: "",
                    show: false,
                    type: "danger",
                },
                buttonReset: {
                    text: "重置",
                    orgText: "重置",
                    ingText: "重置中...",
                    handling: false,
                    disabled: false,
                },
                alertErrType: "danger",
                alertSucType: "success",
                pwdRegex: /^(?=.*[a-zA-Z])(?=.*[0-9]){6,}/,
                component: {
                    login: "/login",
                    index: "/",
                },
                api: {
                    checkVerifyCode: "http://192.168.12.26:9090/act-sys/check-apply-id/",
                    resetPwd: "http://192.168.12.26:9090/act-sys/reset-pwd/",
                },
            }
        },
        methods: {
            resetPwd: function() {
                let self = this
                // 初始化
                self.resetPwdMessage.show = false

                let pwd = self.form.pwd.value
                let confirmPwd = self.form.confirmPwd.value
                let verifyCode = self.form.verifyCode.value

                let err = false
                // 新密碼
                if(pwd.length < 1) {
                    self.resetPwdMessage.text = "請輸入新密碼"
                    self.$refs[self.form.pwd.ref].$el.focus()
                    err = true
                }
                else if(!this.isPwdValid(pwd)) {
                    self.resetPwdMessage.text = "密碼的格式不正確"
                    self.$refs[self.form.pwd.ref].$el.focus()
                    err = true
                }
                // 再一次輸入密碼
                else if(confirmPwd.length < 1) {
                    self.resetPwdMessage.text = "請輸入確認密碼"
                    self.$refs[self.form.confirmPwd.ref].$el.focus()
                    err = true
                }
                // 新密碼與確認密碼不一致
                else if(pwd != confirmPwd) {
                    self.resetPwdMessage.text = "密碼與確認密碼不一致"
                    self.$refs[self.form.confirmPwd.ref].$el.focus()
                    err = true
                }
                // 檢查驗證碼是否有輸入
                else if(verifyCode.length < 1) {
                    self.resetPwdMessage.text = "請輸入驗證碼"
                    self.$refs[self.form.verifyCode.ref].$el.focus()
                    err = true
                }

                // 發生錯誤處理
                if(err) {
                    self.resetPwdMessage.show = true
                    return
                }

                // Button 更改為 "登入..." 狀態
                self.buttonReset.text = self.buttonReset.ingText
                self.buttonReset.handleing = true
                self.buttonReset.disabled = true

                setTimeout(function() {
                    var md5 = require("md5")

                    this.axios(
                        {
                            method: "POST",
                            url: self.api.resetPwd,
                            data: {
                                apply_id: self.applyID,
                                pwd: md5(pwd),
                                website_code: self.websiteCode,
                            }
                        }
                    ).then(function (response) {
                        var code = response.data.code
                        var msg = response.data.msg

                        if(code > 0) {
                            // 顯示訊息框
                            self.toResetPwdMessage.text = msg
                            self.toResetPwdMessage.type = self.alertSucType
                            self.toResetPwdMessage.show = true

                            // 不顯示使用者輸入的資料
                            self.showForm = false
                        } else {
                            if(code == -1111003 || code == -1111004) {
                                // 轉至登入頁面
                                self.$router.replace(self.component.index)
                            }
                            else {
                                self.resetPwdMessage.text = msg
                                self.resetPwdMessage.type = self.alertErrType
                                self.resetPwdMessage.show = true
                            }
                        }
                    }).catch(function (error) {
                        // 設置訊息框內容
                        self.resetPwdMessage.text = error
                        self.resetPwdMessage.type = self.alertErrType
                        self.resetPwdMessage.show = true
                    }).finally(function() {
                        // 更改驗證碼
                        self.$refs.verify_code.setup()

                        self.buttonReset.text = self.buttonReset.orgText
                        self.buttonReset.disabled = false
                        self.buttonReset.handling = false
                    })
                }.bind(this), 1000)
          },
          isPwdValid: function(pwd) {
              return this.pwdRegex.test(String(pwd))
          }
        },
        mounted: function() {
            let self = this

            self.applyID = this.$route.params.applyID

            self.axios(
                {
                    method: "POST",
                    url: self.api.checkVerifyCode,
                    data: {
                        apply_id: self.applyID,
                        website_code: self.websiteCode,
                    }
                }
            ).then(function (response) {
                var code = response.data.code
                var msg = response.data.msg
                if (code > 0){
                    self.form.act.value = response.data.data["act"]

                    if(code == 1112007){
                        // 首次登入重置密碼
                        self.form.verifyCode.value = "0000"
                        self.form.verifyCode.disabled = false
                        self.form.verifyCode.show = false
                    }
                    self.showForm = true
                }
                else {
                    if(code == -1111004) {
                        // 轉至登入頁面
                        self.$router.replace(self.component.index)
                    }
                    else {
                        // 顯示訊息框
                        self.toResetPwdMessage.text = msg
                        self.toResetPwdMessage.type = self.alertErrType
                        self.toResetPwdMessage.show = true
                    }
                }
            }).catch(function (error) {
                // 顯示訊息框
                self.toResetPwdMessage.text = error
                self.toResetPwdMessage.type = self.alertErrType
                self.toResetPwdMessage.show = true
            })
        },
    }
</script>

<style lang="css" scoped>
    .label {
        font-size: 1.3em;
    }

    #to-login {
        font-size: 1.3em;
        color: #007bff;
    }

    #col-to-login {
        text-align: right;
    }
</style>
