<template lang="html">
    <div>
        <b-input-group>
            <b-form-file
                v-model="image"
                accept=".jpg, .png"
                browse-text="上傳"
                placeholder="請選擇檔案..."
                @input="inputImage">
            </b-form-file>
            <b-input-group-append>
                <b-button
                    variant="secondary"
                    @click="cancelImage">
                    <font-awesome-icon icon="times"/>
                </b-button>
            </b-input-group-append>
        </b-input-group>
        <img
            v-show="previewImage.show"
            class="preview"
            :src="previewImage.image"
        >
        <b-alert
            :show="inputImageMessage.show"
            :variant="inputImageMessage.type"
            class="mt-2">
            {{ inputImageMessage.text }}
        </b-alert>
        <br>
    </div>
</template>

<script>
    export default {
        name: "UpdateFile",
        data() {
            return {
                image: null,
                previewImage: {
                    image: null,
                    show: false
                },
                inputImageMessage: {
                    text: "",
                    show: false,
                    type: "danger"
                },
                alertErrType: "danger",
                alertSucType: "success",
            }
        },
        methods: {
            cancelImage() {
                let self = this

                self.previewImage.image = null
                self.previewImage.show = false
                self.image = null

            },
            inputImage() {
                let self = this

                self.inputImageMessage.show = false
                self.inputImageMessage.text = ""

                if(self.image == null) {
                    return
                }


                // 取圖片大小
                let imageSize = Number((self.image.size / 1024).toFixed(1));
                // 檢查圖片大小是否超過512
                if(imageSize > 512) {
                    self.previewImage.image = null
                    self.previewImage.show = false
                    self.image = null
                    self.inputImageMessage.show = true
                    self.inputImageMessage.text = "圖片大小不可超過512KB"
                    return
                }
                // 檢查圖片格式是否 PNG 或 JPEG
                if(self.image.type != "image/jpeg" && self.image.type != "image/png") {
                    self.previewImage.image = null
                    self.previewImage.show = false
                    self.image = null
                    self.inputImageMessage.show = true
                    self.inputImageMessage.text = "錯誤: 只能上傳 PNG 或 JPEG 格式的圖片"
                    return
                }

                // 顯示圖片
                self.previewImage.image = URL.createObjectURL(self.image);
                self.previewImage.show = true
            },
            upload() {
                let self = this

                let formData = new FormData()
                formData.append("file", self.image)
                formData.append("tommy", "tommy")

                setTimeout(function() {
                    self.axios(
                        {
                            method: "POST",
                            url: "http://192.168.12.26:9090/asset-sys/testing-upload/",
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
                    })
                }.bind(self), 1000)
            }
        },

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
