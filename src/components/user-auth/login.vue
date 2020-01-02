<template lang="html">
    <div id="login">
        <b-container fluid id="container">
            <!-- 登入後台 -->
            <b-row class="mt-4 mb-2">
                <b-col>
                    <h2>{{ title }}</h2>
                </b-col>
            </b-row>
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

            <!-- 密碼 -->
            <b-row>
                <b-col>
                    <b-form-group
                        class="label"
                        :label="form.pwd.text"
                        :label-for="form.pwd.ref">
                        <b-form-input
                            type="password"
                            v-model="form.pwd.value"
                            :ref="form.pwd.ref"
                            :disable="form.pwd.disabled">
                        </b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <!-- 驗證碼 -->
            <b-row>
                <b-col>
                    <VerifyCode :ref="form.verifyCode.ref"></VerifyCode>
                </b-col>
            </b-row>

            <!-- 忘記密碼 -->
            <b-row v-show="forgetPwd.show">
                <b-col class="col-forget-pwd">
                    <router-link id="forget-pwd" :to="component.forgetPwd">
                        {{ forgetPwd.text }}
                    </router-link>
                </b-col>
            </b-row>

            <!-- 訊息 -->
            <b-row class="mt-3">
                <b-col>
                    <b-alert
                        :show="loginMessage.show"
                        :variant="loginMessage.type">
                        {{ loginMessage.text }}
                    </b-alert>
                </b-col>
            </b-row>

            <!-- 登入 -->
            <b-row class="mt-3">
                <b-col>
                    <b-button
                        size="lg"
                        variant="primary"
                        :ref="buttonLogin.ref"
                        :disabled="buttonLogin.disabled"
                        @click="loginUser"
                        block>
                        <b-spinner
                            v-show="buttonLogin.handling"
                            class="mr-3">
                        </b-spinner>{{ buttonLogin.text }}
                    </b-button>
                </b-col>
            </b-row>
        </b-container>

        <FirstLoginConfirm
            :ref="firstloginConfirm.ref"
            :applyID="applyID">
        </FirstLoginConfirm>

        <DuplicationLogin
            :ref="duplicationLogin.ref">
        </DuplicationLogin>
    </div>
</template>

<script>
    // 載入驗證碼組件
    import VerifyCode from "@/components/user-auth/app-verify-code"
    import FirstLoginConfirm from "@/components/user-auth/app-first-login-confirm"
    import DuplicationLogin from "@/components/user-auth/app-duplication-login"

    export default {
        name: "Login",
        data() {
            return {
                websiteCode: "WEB01",
                title: "登入後台",
                form: {
                    act: {
                        text: "帳號",
                        ref: "act",
                        value: "",
                        disabled: false,
                    },
                    pwd: {
                        text: "密碼",
                        ref: "pwd",
                        value: "",
                        disabled: false,
                    },
                    verifyCode: {
                        ref: "verifyCode"
                    },
                },
                buttonLogin: {
                    text: "登入",
                    orgText: "登入",
                    ingText: "登入中...",
                    handling: false,
                    disabled: false,
                },
                // 顯示 "忘記密碼" 提示
                forgetPwd: {
                    text: "忘記密碼?",
                    show: false,
                },
                loginMessage: {
                    text: "",
                    show: false,
                    type: "danger",
                },
                alertErrType: "danger",
                alertSucType: "success",
                api: {
                    login: "http://192.168.12.26:9090/act-sys/login/",
                },
                component: {
                    forgetPwd: "/forget-pwd",
                    main: "/main",
                    resetPwd: "/reset-pwd",
                    index: "/"
                },
                firstloginConfirm: {
                    ref: "firstloginConfirm",
                },
                duplicationLogin: {
                    ref: "duplicationLogin"
                },
                applyID: "",
            }
        },
        methods: {
            loginUser() {
                let self = this
                // 初始化
                self.loginMessage.show = false

                let act = self.form.act.value
                let pwd = self.form.pwd.value
                let verifyCode = self.$refs[self.form.verifyCode.ref]

                let err = false
                // 檢查帳號是否有輸入
                if(act.length < 1) {
                    self.loginMessage.text = "請輸入帳號"
                    self.$refs[self.form.act.ref].$el.focus()
                    err = true
                }
                // 檢查密碼是否有輸入
                else if(pwd.length < 1) {
                    self.loginMessage.text = "請輸入密碼"
                    self.$refs[self.form.pwd.ref].$el.focus()
                    err = true
                }
                // 檢查驗證碼是否有輸入
                else if(verifyCode.get().length < 1) {
                    self.loginMessage.text = "請輸入驗證碼"
                    verifyCode.focus()
                    err = true
                }
                // 檢查驗證碼是否輸入正確
                else if (!verifyCode.check()) {
                    self.loginMessage.text = "驗證碼不正確"
                    verifyCode.focus()
                    err = true
                }

                // 發生錯誤處理(重置驗證碼)
                if (err) {
                    self.loginMessage.show = true
                    // 重置驗證碼
                    verifyCode.setup()
                    return
                }

                // Button 更改為 "登入..." 狀態
                self.buttonLogin.text = self.buttonLogin.ingText
                self.buttonLogin.handling = true
                self.buttonLogin.disabled = true

                // 向伺服器發出請求
                setTimeout(function() {
                    var md5 = require("md5")

                    self.axios(
                        {
                            method: "POST",
                            url: self.api.login,
                            data: {
                                act: act,
                                pwd: md5(pwd),
                                website_code: self.websiteCode
                            },
                        }
                    ).then(function(response) {
                        var code = response.data.code
                        var msg = response.data.msg
                        var data = response.data.data

                        if(code === 1112001) {// 帳號正常
                            // 設置 COOKIES
                            self.$cookies.config("1d")
                            self.$cookies.set("security_id", data["security_id"])
                            // 指向主介面
                            self.$router.replace(self.component.main)
                        }
                        else if(code === 1112002) {  // 首次登入
                            self.applyID = data["apply_id"]

                            let firstloginConfirm = self.$refs[self.firstloginConfirm.ref]
                            firstloginConfirm.show()
                        }
                        else if(code === 1112003) {  // 重複登入
                            // 設置 COOKIES
                            self.$cookies.config("1d")
                            self.$cookies.set("security_id", data["security_id"])

                            let duplicationLogin = self.$refs[self.duplicationLogin.ref]
                            duplicationLogin.show()
                        }
                        else {
                            if(code == -1111003 || code == -1111004) {
                                // 轉至首頁
                                self.$router.replace(self.component.index)
                            }
                            else {
                                self.loginMessage.text = msg
                                self.loginMessage.type = self.alertErrType
                                self.loginMessage.show = true
                            }
                        }

                        // 密碼不正確，顯示「忘記密碼」
                        if (code == -1111006) {
                            self.forgetPwd.show = true
                        }
                    }).catch(function(error) {
                        self.loginMessage.text = error
                        self.loginMessage.type = self.alertErrType
                        self.loginMessage.show = true
                    }).finally(function() {
                        // 重置驗證碼
                        verifyCode.setup()

                        self.buttonLogin.text = self.buttonLogin.orgText
                        self.buttonLogin.disabled = false
                        self.buttonLogin.handling = false
                    })
                }.bind(this), 1000)
            },
        },
        components: {
            VerifyCode,
            FirstLoginConfirm,
            DuplicationLogin,
        }
    }
</script>

<style lang="css" scoped>
    .label {
        font-size: 20px;
    }

    #login-message {
        font-size: 18px;
    }

    .col-forget-pwd {
        text-align: right;
    }

    #forget-pwd {
        font-size: 20px;
        color: #2eb050;
    }

</style>
