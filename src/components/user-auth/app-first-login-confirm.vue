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
                    <font-awesome-icon icon="times"/>
                </b-button>
            </template>
            <template
                v-slot:default="{ hide }">
                <h6 class="label">首次登入必需更改密碼，請按「確定」轉至重置密碼頁面!</h6>
            </template>
            <template v-slot:modal-footer="{ hide }">
                <b-container fluid>
                    <b-row>
                        <b-col class="text-right label">
                            <b-button
                                variant="primary"
                                size="md"
                                @click="toResetPwd(applyID)">{{ buttonSubmit.text }}
                            </b-button>
                            <b-button
                                class="ml-3"
                                variant="danger"
                                size="md"
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
        name: "FirstLoginConfirm",
        data() {
            return {
                showModal: false,
                buttonSubmit: {
                    text: "確定",
                },
                buttonCancel: {
                    text: "取消",
                },
                conmponent: {
                    resetPwd: "/reset-pwd",
                },
            }
        },
        props: {
            applyID: {
                type: String,
                default: ""
            },
        },
        methods: {
            show() {
                let self = this
                self.showModal = true
            },
            cancel() {
                let self = this
                self.showModal = false
            },
            toResetPwd(applyID) {
                let self = this

                self.conmponent.resetPwd = self.conmponent.resetPwd + "/" + applyID
                // 轉至「重置密碼」頁面
                self.$router.push(self.conmponent.resetPwd)
            },
        }
    }
</script>

<style lang="css" scoped>
    @import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap&subset=chinese-traditional");

    .label {
        font-family: "Noto Sans TC", sans-serif;
    }
</style>
