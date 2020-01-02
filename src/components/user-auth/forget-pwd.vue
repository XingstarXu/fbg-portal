<template lang="html">
    <div id="forget-pwd">
        <b-container fluid id="container">
            <!-- 申請重設密碼 -->
            <b-row class="mt-4 mb-2">
                <b-col>
                    <h2>{{ title }}</h2>
                </b-col>
            </b-row>

            <b-row v-show="showForm">
                <b-col>
                    <!-- 返回登入頁面 -->
                    <b-row class="mt-2 mb-2">
                        <b-col class="col-reset-pwd">
                            <router-link
                                id="return-login" to="/">
                                <font-awesome-icon icon="caret-square-left"/>
                                返回登入頁面
                            </router-link>
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

                    <!-- 電郵地址 -->
                    <b-row>
                        <b-col>
                            <b-form-group
                                class="label"
                                :label="form.email.text"
                                :label-for="form.email.ref">
                                <b-form-input
                                    type="email"
                                    v-model="form.email.value"
                                    :ref="form.email.ref"
                                ></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <!-- 驗證碼 -->
                    <b-row>
                        <b-col>
                            <VerifyCode :ref="form.verifyCode.ref"></VerifyCode>
                        </b-col>
                    </b-row>

                    <!-- 訊息 -->
                    <b-row class="mt-3">
                        <b-col>
                            <b-alert
                                :show="applyResetPwdMessage.show"
                                :variant="applyResetPwdMessage.type">
                                {{ applyResetPwdMessage.text }}
                            </b-alert>
                        </b-col>
                    </b-row>

                    <!-- 申請 -->
                    <b-row class="mt-3">
                        <b-col>
                            <b-button
                                size="lg"
                                variant="primary"
                                :ref="buttonApply.ref"
                                :disabled="buttonApply.disabled"
                                @click="applyResetPwd"
                                block>
                                <b-spinner
                                    v-show="buttonApply.handling"
                                    class="mr-3">
                                </b-spinner>{{ buttonApply.text }}
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
                        <b-col id="col-to-reset-pwd">
                            <router-link
                                id="to-reset-pwd" :to="conmponent.resetPwd">
                                重置密碼 <font-awesome-icon icon="caret-square-right" />
                            </router-link>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>


    </div>
</template>

<script>
    // 載入驗證碼組件
    import VerifyCode from "@/components/user-auth/app-verify-code"

    export default {
        name: "ForgetPwd",
        data() {
            return {
                websiteCode: "WEB01",
                title: "申請重設密碼",
                form: {
                    // 帳號
                    act: {
                        text: "帳號",
                        ref: "act",
                        value: "",
                        disabled: false,
                    },
                    // 電子郵箱
                    email: {
                        text: "電子郵箱",
                        ref: "email",
                        value: "",
                        disabled: false,
                    },
                    verifyCode: {
                        ref: "verifyCode"
                    },
                },
                buttonApply: {
                    text: "申請",
                    orgText: "申請",
                    ingText: "申請中...",
                    handling: false,
                    disabled: false,
                },
                applyResetPwdMessage: {
                    text: "",
                    show: false,
                    type: "danger",
                },
                toResetPwdMessage: {
                    text: "成功申請重置密碼，請在10分鐘之內把密碼重置，不然申請會自動失效。",
                    show: false,
                    type: "success",
                },
                alertErrType: "danger",
                alertSucType: "success",
                // 驗證 Email 地址
                reg: /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
                api: {
                    applyResetPwd: "http://192.168.12.26:9090/act-sys/apply-reset-pwd/",
                },
                conmponent: {
                    resetPwd: "/reset-pwd",
                    index: "/",
                },
                showForm: true,
            }
        },
        methods: {
            // 申請重設密碼
            applyResetPwd() {
                let self = this
                // 初始化
                self.applyResetPwdMessage.show = false

                let act = self.form.act.value
                let email = self.form.email.value
                let verifyCode = self.$refs[self.form.verifyCode.ref]

                let err = false
                // 檢查帳唬是否輸入
                if(act.length < 1) {
                    self.applyResetPwdMessage.text = "請輸入帳號"
                    self.$refs[self.form.act.ref].$el.focus()
                    err = true
                }
                // 檢查電郵地址是否輸入
                else if(email.length < 1) {
                    self.applyResetPwdMessage.text = "請輸入電郵地址"
                    self.$refs[self.form.email.ref].$el.focus()
                    err = true
                }
                // 檢查電郵地址是否
                else if(!self.isEmailValid(email)) {
                    self.applyResetPwdMessage.text = "電郵地址不正確"
                    self.$refs[self.form.email.ref].$el.focus()
                    err = true
                }
                // 檢查驗證碼是否有輸入
                else if(verifyCode.get().length < 1) {
                    self.applyResetPwdMessage.text = "請輸入驗證碼"
                    verifyCode.focus()
                    err = true
                }
                // 檢查驗證碼是否輸入正確
                else if (!verifyCode.check()) {
                    self.applyResetPwdMessage.text = "驗證碼不正確"
                    verifyCode.focus()
                    err = true
                }

                // 發生錯誤處理(重置驗證碼)
                if (err) {
                    self.applyResetPwdMessage.show = true
                    // 重置驗證碼
                    verifyCode.setup()
                    return
                }

                // Button 更改為 "申請中..." 狀態
                self.buttonApply.text = self.buttonApply.ingText
                self.buttonApply.handling = true
                self.buttonApply.disabled = true

                setTimeout(function() {
                    let self = this
                    this.axios(
                        {
                            method: "POST",
                            url: self.api.applyResetPwd,
                            data: {
                                act: act,
                                email: email,
                                website_code: self.websiteCode
                            },
                        }
                    ).then(function(response) {
                        var code = response.data.code
                        var msg = response.data.msg
                        var data = response.data.data

                        if (code > 0) {
                            let applyID = data["apply_id"]
                            self.conmponent.resetPwd = self.conmponent.resetPwd + "/" + applyID

                            self.showForm = false
                            self.toResetPwdMessage.show = true
                        } else {
                            if(code == -1111003 || code == -1111004) {
                                // 轉至登入頁面
                                self.$router.replace(self.component.index)
                            }
                            else {
                                self.applyResetPwdMessage.text = msg
                                self.applyResetPwdMessage.type = self.alertErrType
                                self.applyResetPwdMessage.show = true
                            }
                        }
                    }).catch(function (error) {
                        // 設置訊息框內容
                        self.applyResetPwdMessage.text = error
                        self.applyResetPwdMessage.type = self.alertErrType
                        self.applyResetPwdMessage.show = true
                    }).finally(function() {
                        // 重置驗證碼
                        verifyCode.setup()

                        // 更改按鈕狀態
                        self.buttonApply.text = self.buttonApply.orgText
                        self.buttonApply.handling = false
                        self.buttonApply.disabled = false
                    })
                }.bind(this), 1000)
            },
            isEmailValid(email) {
                return this.reg.test(String(email).toLowerCase())
            },
        },
        components: {
            // 驗證碼
            VerifyCode,
        }
    }
</script>

<style lang="css"  scoped>
    .label, #return-login {
        font-size: 1.3em;
    }

    #to-reset-pwd {
        font-size: 1.3em;
        color: #007bff;
    }

    #col-to-reset-pwd {
        text-align: right;
    }
</style>
