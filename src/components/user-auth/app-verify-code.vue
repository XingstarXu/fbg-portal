<template lang="html">
    <div>
        <b-form-group
            class="label"
            label="驗證碼"
            description="注意英文字母大小寫，驗證碼不清晰可點擊右圖更換。">
            <div>
                <b-row>
                    <b-col class="col-8">
                        <b-form-input
                            maxlength="4"
                            v-model="form.verifyCode.value"
                            :ref="form.verifyCode.ref"
                            :formatter="format"
                        ></b-form-input>
                    </b-col>
                    <b-col class="col-4">
                        <canvas
                            id="vf-code"
                            :width="width"
                            :height="height"
                            @click="setup">
                        </canvas>
                    </b-col>
                </b-row>
            </div>
        </b-form-group>
    </div>
</template>

<script>
    export default {
        name: "VerifyCode",
        data() {
            return {
                form: {
                    verifyCode: {
                        ref: "verifyCode",
                        value: "",
                    },
                },
                targetVerifyCode: "",
            }
        },
        props: {
            // 驗證碼圖片闊度
            width: {
                type: Number,
                default: 100
            },
            // 驗證碼圖片高度
            height: {
                type: Number,
                default: 35
            },
            // 驗證碼字型大小
            fontSize: {
                type: Number,
                default: 20
            },
        },
        methods: {
            genCode() {
                var chars = [
                  "2", "3", "4", "5", "6", "8", "9",
                  "A", "B", "C", "D", "E", "F", "G",
                  "H", "K", "L", "M", "N", "P", "Q",
                  "R", "S", "T", "U", "V", "W", "X",
                  "Y", "Z"
                ]
                var code = ""
                this.targetVerifyCode = ""

                var idx = 0
                for (var i=0; i < 4; i++) {
                    idx = Math.floor(Math.random() * Math.floor(chars.length))
                    code = code + " " + chars[idx]
                    this.targetVerifyCode = this.targetVerifyCode + chars[idx]
                }

                return code
            },
            setup() {
                this.form.verifyCode.value = ""

                var canvas = document.getElementById("vf-code")
                var ctx = canvas.getContext("2d")
                ctx.clearRect(0, 0, this.width, this.height)

                ctx.font = this.fontSize + "px Comic Sans MS"
                ctx.fillStyle = "#BD0003"
                ctx.textAlign = "center"

                var x = 0;
                var y = 0;
                for(var i=0; i < 50; i++) {
                    x = Math.floor(Math.random() * Math.floor(this.width))
                    y = Math.floor(Math.random() * Math.floor(this.height))
                    ctx.fillRect(x, y, 2, 2)
                }
                ctx.fillText(
                    this.genCode(), this.width / 2,
                    Math.ceil((this.fontSize + this.height) / 2)
                )
            },
            check() {
                if (this.targetVerifyCode == this.form.verifyCode.value) {
                    return true
                }
                else {
                    return false
                }
            },
            focus() {
                this.$refs[this.form.verifyCode.ref].focus()
            },
            get: function() {
                return this.form.verifyCode.value
            },
            format(value) {
                return value.toUpperCase()
            }
        },
        mounted() {
            this.setup()
        },
    }
</script>

<style lang="css" scoped>
    #vf-code {
        background-color: #F2CA00;
    }
</style>
