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
            </template>
            <template
                v-slot:default="{ hide }">
                <h6 class="label">該帳號已經在其它裝置登入，系統會自動登出帳號。</h6>
            </template>
            <template v-slot:modal-footer="{ hide }">
                <b-container fluid>
                    <b-row>
                        <b-col class="text-right label">
                            <b-button
                                variant="primary"
                                size="md"
                                @click="toMain()">{{ buttonSubmit.text }}
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
        name: "DuplicationLogin",
        data() {
            return {
                showModal: false,
                buttonSubmit: {
                    text: "確定",
                },
                component: {
                    main: "/main",
                },
            }
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
            toMain() {
                let self = this
                // 指向主介面
                self.$router.replace(self.component.main)
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
