<template lang="html">
    <div>
        <b-input-group>
            <b-form-file
                v-model="file"
                accept=".pdf"
                browse-text="上傳"
                placeholder="請選擇檔案..."
                @input="inputImage">
            </b-form-file>
            <b-input-group-append>
                <b-button
                    variant="secondary"
                    @click="cancelFile">
                    <font-awesome-icon icon="times"/>
                </b-button>
            </b-input-group-append>
        </b-input-group>
        <b-alert
            :show="inputFileMessage.show"
            :variant="inputFileMessage.type"
            class="mt-2">
            {{ inputFileMessage.text }}
        </b-alert>
        <br>
        <!-- <b-button
            variant="success"
            @click="upload">
            upload
        </b-button> -->
    </div>
</template>

<script>
    export default {
        name: "UpdateFile",
        data() {
            return {
                file: null,
                inputFileMessage: {
                    text: "",
                    show: false,
                    type: "danger"
                },
                alertErrType: "danger",
                alertSucType: "success",
            }
        },
        methods: {
            cancelFile() {
                let self = this
                self.file = null
                self.inputFileMessage.show = false
                self.inputFileMessage.text = ""

                /* eslint-disable */
                console.log(self.file)
            },
            inputImage() {
                let self = this

                self.inputFileMessage.show = false
                self.inputFileMessage.text = ""

                if(self.file == null) {
                    return
                }

                // 取圖片大小
                let imageSize = Number((self.file.size / 1024).toFixed(1));

                // 檢查圖片大小是否超過512
                if(imageSize > 512) {
                    self.file = null
                    self.inputFileMessage.show = true
                    self.inputFileMessage.text = "錯誤: 檔案大小不可超過512KB"
                    return
                }

                // 檢查圖片格式是否 PNG 或 JPEG
                if(self.file.type != "application/pdf") {
                    self.file = null
                    self.inputFileMessage.show = true
                    self.inputFileMessage.text = "錯誤: 只能上傳 PDF 格式的檔案"
                    return
                }
            },
            upload() {
                let self = this

                if(self.file == null) {
                    self.inputFileMessage.show = true
                    self.inputFileMessage.text = "錯誤: 請選擇檔案"
                    return
                }

                let formData = new FormData()
                formData.append("invoice_doc", self.file)
                formData.append("website_code", "WEB01")
                formData.append("security_id", "1c4cbfcabde942cf92e778e89179e29d")
                var header = {
                    "vendor_id": "8141760a569a48dfa60f8803fdf1be29",
                    "pr_no": "FB123456",
                    "warehouse_id": "bfed20966f09480386a753f796574869",
                    "qty": 3,
                    "total_amt": 30.7,
                    "remark": ""
                }
                formData.append("header", JSON.stringify(header))
                var details = [
                    {
                        "item_id": "117fa107a646475581df9eb52ca1d79c",
                        "qty": 2,
                        "price": 10.1,
                        "amt": 20.2,
                        "remark": ""
                    },
                    {
                        "item_id": "bc1a3d783c1247f6aa8678e82fa5ef2c",
                        "qty": 1,
                        "price": 10.5,
                        "amt": 10.5,
                        "remark": ""
                    }
                ]
                formData.append("details", JSON.stringify(details))

                setTimeout(function() {
                    self.axios(
                        {
                            method: "POST",
                            url: "http://192.168.12.26:9090/asset-sys/ins-trans/",
                            data: formData,
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        }
                    ).then(function(response) {
                        /* eslint-disable */
                        console.log(response)
                    }).catch(function(error) {
                        /* eslint-disable */
                        console.log(error)
                        self.file = null
                    })
                }.bind(self), 1000)
            }
        }
    }
</script>

<style lang="css" scoped>
    img.preview {
        width: 200px;
        background-color: white;
        border: 1px solid #DDD;
        padding: 5px;
    }
</style>
