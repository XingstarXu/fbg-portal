<template lang="html">
    <div>
        <b-container fluid>
            <!-- 標題 -->
            <b-row>
                <b-col>
                    <h1>帳號管理</h1>
                </b-col>
            </b-row>

            <!-- 功能 -->
            <b-row class="mt-4">
                <b-col lg="5" class="mb-2">
                    <b-row>
                        <b-col cols="7">
                            <b-input-group size="md">
                                <!--
                                    is-text: 把 ICON 轉為文件
                                -->
                                <b-input-group-prepend is-text>
                                    <font-awesome-icon
                                        icon="search" />
                                </b-input-group-prepend>
                                <b-form-input
                                    v-model="search"
                                    @input="search_user"></b-form-input>
                            </b-input-group>
                        </b-col>
                        <b-col cols="5">
                            <b-form-select
                                v-model="disable_sel_val"
                                @change="search_by_disable"
                                :options="disable_options">
                            </b-form-select>
                        </b-col>
                    </b-row>
                </b-col>

                <b-col lg="7">
                    <b-row>
                        <b-col cols="6" class="d-flex align-items-end flex-column">
                            <b-button-group size="md">
                                <b-button variant="dark" @click="gen_pdf">
                                    <font-awesome-icon
                                        icon="file-pdf" /> PDF
                                </b-button>
                                <b-button variant="dark" @click="gen_excel">
                                    <font-awesome-icon
                                        icon="file-excel" /> EXCEL
                                </b-button>
                            </b-button-group>
                        </b-col>
                        <b-col cols="6" class="d-flex align-items-end flex-column">
                            <b-button
                                variant="primary"
                                @click="show_cre_modal">
                                <font-awesome-icon
                                    icon="plus-square" />  新增
                                </b-button>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>

            <!-- 數據 -->
            <b-row class="mt-3">
                <b-col>
                    <b-table
                        id="my-table"
                        hover
                        head-variant="light"
                        :items="table.data"
                        :fields="table.fields"
                        :per-page="table.num_of_page"
                        @sort-changed="sort_change"
                        sort-icon-left>
                        <template v-slot:cell(action)="row">
                            <b-button-group size="sm">
                                <b-button variant="info"
                                    @click="show_info_modal(row.item)">
                                    <font-awesome-icon icon="info-circle"/>
                                </b-button>
                                <b-button
                                    @click="show_upd_modal(row.item)">
                                    <font-awesome-icon icon="pen" />
                                </b-button>
                            </b-button-group>
                        </template>
                    </b-table>
                </b-col>
            </b-row>

            <!-- 頁數 -->
            <b-row>
                <b-col>
                    <b-pagination
                        v-model="table.cur_page"
                        :total-rows="table.records"
                        :per-page="table.num_of_page"
                        @click.native="upd_table_data"
                        size="md"
                        aria-controls="my-table"
                        align="right"
                    ></b-pagination>
                </b-col>
            </b-row>
        </b-container>

        <!-- 新增、修改及詳細資料介面 -->
        <b-modal
            :id="modal.id"
            :ref="modal.ref"
            size="md"
            hide-ok
            hide-cancel
            scrollable>
            <!-- 標題 -->
            <template v-slot:modal-header="{ close }">
                <p class="font title">{{ modal.title }}</p>
                <b-button
                    size="sm"
                    @click="close()"
                    variant="light">
                    <font-awesome-icon icon="times" />
                </b-button>
            </template>

            <!-- 新增內容 -->
            <template
                v-if="modal.type == modal.cre_type"
                v-slot:default="{ hide }"
                :class="modal.form.hidden">
                <!-- 帳號描述 -->
                <b-form-group
                    class="font label"
                    :label="modal.form.act.txt"
                    :label-for="modal.form.act.id">
                    <b-form-input
                        v-model="modal.form.act.val"
                        :id="modal.form.act.id"
                        :ref="modal.form.act.ref"
                        :disabled="modal.form.act.disable">
                    </b-form-input>
                </b-form-group>
                <!-- 姓名描述 -->
                <b-form-group
                    class="font label"
                    :label="modal.form.name.txt"
                    :label-for="modal.form.name.id">
                    <b-form-input
                        v-model="modal.form.name.val"
                        :id="modal.form.name.id"
                        :ref="modal.form.name.ref"
                        :disabled="modal.form.name.disable">
                    </b-form-input>
                </b-form-group>
                <!-- 電郵描述 -->
                <b-form-group
                    class="font label"
                    :label="modal.form.email.txt"
                    :label-for="modal.form.email.id">
                    <b-input-group
                        size="md"
                        append="@futurebrightgroup.com">
                        <b-form-input
                            v-model="modal.form.email.val"
                            :id="modal.form.email.id"
                            :ref="modal.form.email.ref"
                            :disabled="modal.form.email.disable">
                        </b-form-input>
                    </b-input-group>
                </b-form-group>
                <!-- 部門描述 -->
                <b-form-group
                    class="font label"
                    :label="modal.form.dept.txt"
                    :label-for="modal.form.dept.id">
                    <b-form-select
                        :id="modal.form.dept.id"
                        :ref="modal.form.dept.ref"
                        :options="modal.form.dept.options"
                        :disabled="modal.form.dept.disable"
                        v-model="modal.form.dept.val"
                        value-field="val"
                        text-field="txt">
                    </b-form-select>
                </b-form-group>
                <!-- 角色 -->
                <b-form-group
                    class="font label"
                    :label="modal.form.role.txt"
                    :label-for="modal.form.role.id">
                    <b-form-select
                        :id="modal.form.role.id"
                        :ref="modal.form.role.ref"
                        :options="modal.form.role.options"
                        :disabled="modal.form.role.disable"
                        v-model="modal.form.role.val"
                        value-field="val"
                        text-field="txt">
                    </b-form-select>
                </b-form-group>
            </template>

            <!-- 修改內容 -->
            <template
                v-else-if="modal.type == modal.upd_type"
                v-slot:default="{ hide }"
                :class="modal.form.hidden">
                <!-- 帳號 -->
                <b-form-group
                    class="font label"
                    :label="modal.form.act.txt"
                    :label-for="modal.form.act.id">
                    <b-form-input
                        v-model="modal.form.act.val"
                        :id="modal.form.act.id"
                        :ref="modal.form.act.ref"
                        :disabled="modal.form.act.disable">
                    </b-form-input>
                </b-form-group>
                <!-- 姓名 -->
                <b-form-group
                    class="font label"
                    :label="modal.form.name.txt"
                    :label-for="modal.form.name.id">
                    <b-form-input
                        v-model="modal.form.name.val"
                        :id="modal.form.name.id"
                        :ref="modal.form.name.ref"
                        :disabled="modal.form.name.disable">
                    </b-form-input>
                </b-form-group>
                <!-- 電郵 -->
                <b-form-group
                    class="font label"
                    :label="modal.form.email.txt"
                    :label-for="modal.form.email.id">
                    <b-input-group
                        size="md"
                        append="@futurebrightgroup.com">
                        <b-form-input
                            v-model="modal.form.email.val"
                            :id="modal.form.email.id"
                            :ref="modal.form.email.ref"
                            :disabled="modal.form.email.disable">
                        </b-form-input>
                    </b-input-group>
                </b-form-group>
                <!-- 部門 -->
                <b-form-group
                    class="font label"
                    :label="modal.form.dept.txt"
                    :label-for="modal.form.dept.id">
                    <b-form-select
                        :id="modal.form.dept.id"
                        :ref="modal.form.dept.ref"
                        :options="modal.form.dept.options"
                        :disabled="modal.form.dept.disable"
                        v-model="modal.form.dept.val"
                        value-field="val"
                        text-field="txt">
                    </b-form-select>
                </b-form-group>
                <!-- 角色 -->
                <b-form-group
                    class="font label"
                    :label="modal.form.role.txt"
                    :label-for="modal.form.role.id">
                    <b-form-select
                        :id="modal.form.role.id"
                        :ref="modal.form.role.ref"
                        :options="modal.form.role.options"
                        :disabled="modal.form.role.disable"
                        v-model="modal.form.role.val"
                        value-field="val"
                        text-field="txt">
                    </b-form-select>
                </b-form-group>
                <!-- 狀態 -->
                <b-form-group
                    class="font label"
                    :label="modal.form.disable.txt"
                    :label-for="modal.form.disable.id">
                    <b-form-select
                        :id="modal.form.disable.id"
                        :ref="modal.form.disable.ref"
                        :options="modal.form.disable.options"
                        :disabled="modal.form.disable.disable"
                        v-model="modal.form.disable.val"
                        value-field="val"
                        text-field="txt">
                    </b-form-select>
                </b-form-group>
            </template>

            <!-- 詳細資料內容 -->
            <template
                v-else-if="modal.type=modal.info_type"
                v-slot:default="{ hide }"
                :class="modal.form.hidden">
                <b-form-group
                    v-for="(item, index) in modal.user_list"
                    :key="index"
                    class="font label"
                    :label="item.txt"
                    :label-for="item.id">
                    <b-form-select
                        v-if="item.type=='select'"
                        :id="item.id"
                        :ref="item.ref"
                        :options="item.options"
                        :disabled="item.disable"
                        v-model="item.val"
                        value-field="val"
                        text-field="txt">
                    </b-form-select>
                    <b-form-input
                        v-else-if="item.type=='text'"
                        v-model="item.val"
                        :id="item.id"
                        :ref="item.ref"
                        :disabled="item.disable">
                    </b-form-input>
                    <b-input-group
                        v-else-if="item.type=='email'"
                        size="md"
                        append="@futurebrightgroup.com">
                        <b-form-input
                            v-model="item.val"
                            :id="item.id"
                            :ref="item.ref"
                            :disable="item.disable">
                        </b-form-input>
                    </b-input-group>
                </b-form-group>
            </template>

            <!-- Footer -->
            <template v-slot:modal-footer="{ hide }">
                <b-container fluid>
                    <b-row>
                        <b-col>
                            <b-button
                                v-if="modal.btn_is_show"
                                :id="modal.form.btn.id"
                                block
                                variant="primary"
                                class="font label"
                                @click="modal_btn_func(modal.form.btn.func)"
                                :disabled="modal.form.btn.disable">
                                <b-spinner
                                    v-show="modal.form.btn.handling"
                                    class="mr-3">
                                </b-spinner>{{ modal.form.btn.txt }}
                            </b-button>
                        </b-col>
                    </b-row>

                    <!-- 訊息 -->
                    <b-row>
                        <b-col>
                            <b-alert
                                :id="modal.alert.id"
                                class="mt-3"
                                :show="modal.alert.show"
                                :variant="modal.alert.type">
                                {{ modal.alert.msg }}
                            </b-alert>
                        </b-col>
                    </b-row>
                </b-container>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            modal: {
                id: "modal",
                ref: "modal",
                title: "",
                form: {
                    _id: "",
                    code: {
                        id: "modal-code",
                        ref: "code",
                        txt: "編號",
                        val: "",
                        disable: true,
                        type: "text",
                    },
                    act: {
                        id: "modal-act",
                        ref: "act",
                        txt: "帳號",
                        val: "",
                        disable: true,
                        type: "text",
                    },
                    name: {
                        id: "modal-name",
                        ref: "name",
                        txt: "姓名",
                        val: "",
                        disable: true,
                        type: "text",
                    },
                    email: {
                        id: "modal-email",
                        ref: "email",
                        txt: "電郵",
                        val: "",
                        disable: true,
                        type: "email",
                    },
                    dept: {
                        id: "modal-dept",
                        ref: "dept",
                        txt: "部門",
                        val: "",
                        disable: true,
                        type: "select",
                        options: []
                    },
                    role: {
                        id: "modal-role",
                        ref: "role",
                        txt: "角色",
                        val: "",
                        disable: true,
                        type: "select",
                        options: []
                    },
                    disable: {
                        id: "modal-disable",
                        ref: "disable",
                        txt: "狀態",
                        val: "",
                        disable: true,
                        type: "select",
                        options: [
                            { val: 0, txt: "使用" },
                            { val: 1, txt: "停用" },
                        ],
                    },
                    last_login_time: {
                        id: "modal-last-login-time",
                        ref: "last-login-time",
                        txt: "最近登入時間",
                        val: "",
                        disable: true,
                        type: "text",
                    },
                    last_reset_pwd: {
                        id: "modal-last-reset-pwd",
                        ref: "last-reset-pwd",
                        txt: "最後更改密碼時間",
                        val: "",
                        disable: true,
                        type: "text",
                    },
                    create_by: {
                        id: "modal-create-by",
                        ref: "create_by",
                        txt: "建立人",
                        val: "",
                        disable: true,
                        type: "text",
                    },
                    create_time: {
                        id: "modal-create-time",
                        ref: "create_time",
                        txt: "建立時間",
                        val: "",
                        disable: true,
                        type: "text",
                    },
                    update_by: {
                        id: "modal-update-by",
                        ref: "update_by",
                        txt: "最後修改人",
                        val: "",
                        disable: true,
                        type: "text",
                    },
                    update_time: {
                        id: "modal-update-time",
                        ref: "update_time",
                        txt: "最後修改時間",
                        val: "",
                        disable: true,
                        type: "text",
                    },
                    disable_by: {
                        id: "modal-disabled-by",
                        ref: "disable_by",
                        txt: "停用人",
                        val: "",
                        disable: true,
                        type: "text",
                    },
                    disable_time: {
                        id: "modal-disabled-time",
                        ref: "disable_time",
                        txt: "停用時間",
                        val: "",
                        disable: true,
                        type: "text",
                    },
                    btn: {
                        id: "modal-btn",
                        ref: "btn",
                        txt: "",
                        func: "",
                        handling: false,
                        disable: false,
                        cre_user: "cre_user",
                        upd_user: "upd_user",
                    },
                },
                alert: {
                    id: "modal-msg",
                    show: false,
                    type: "",
                    msg: "",
                    suc: "success",
                    err: "danger",
                    suc_dismiss_msecs: 2000,
                },
                btn_is_show: true,
                type: 0,
                cre_type: 1,
                upd_type: 2,
                info_type: 3,
                user_list: []
            },
            disable_options: [
                {value: -1, text: "全部"},
                {value: 0, text: "使用"},
                {value: 1, text: "停用"}
            ],
            disable_sel_val: -1,
            urls: {
                sel_for_table: "http://192.168.12.26:9090/act-sys/sel-user-for-table/",
                cre_user: "http://192.168.12.26:9090/act-sys/cre-user/",
                upd_user: "http://192.168.12.26:9090/act-sys/upd-user/",
                sel_dept: "http://192.168.12.26:9090/act-sys/sel-dept/",
                sel_role: "http://192.168.12.26:9090/act-sys/sel-role/",
                gen_pdf: "http://192.168.12.26:9090/act-sys/gen-user-pdf/",
                gen_excel: "http://192.168.12.26:9090/act-sys/gen-user-excel/"
            },
            search: "",
            toast: {
                err_type: "danger",
                err_title: "發生錯誤",
                suc_type: "success",
            },
            table: {
                fields: [
                    { key: "no", label: "#" },
                    { key: "act", label: "帳號", sortable: true },
                    { key: "name", label: "姓名", sortable: true },
                    // { key: "dept_desc2", label: "部門", sortable: true },
                    { key: "state", label: "狀態" },
                    { key: "action", label: "操作", class: "text-right" },
                ],
                data: [],
                order_by: "",
                order_desc: "",
                cur_page: 1,
                num_of_page: 10,
                records: 0
            }
        }
    },
    methods: {
        sel_for_table: function(
            cur_page, search="", disable=-1, order_by, order_desc
        ) {
            let self = this
            self.axios(
                {
                    method: "POST",
                    url: self.urls.sel_for_table,
                    data: {
                        page: cur_page,
                        num_of_page: self.table.num_of_page,
                        search: search,
                        disable: disable,
                        order_by: order_by,
                        order_desc: order_desc
                    }
                }
            ).then(function(response) {
                var code = response.data.code
                var msg = response.data.msg

                if(typeof(code) !== "undefined") {
                    if(code < 0) {
                        self.make_toast(
                            self.toast.err_title,
                            msg,
                            self.toast.err_type
                        )
                    }
                } else {
                    self.table.data = response.data.data
                    self.table.records = response.data.records

                    // 停用狀態設置背景為紅色
                    for(let i = 0; i < self.table.data.length; i++) {
                        let item = self.table.data[i]
                        // 設置資料筆數
                        item["no"] = (
                            (i + 1) +
                            (self.table.cur_page - 1) *
                            self.table.num_of_page
                        )
                        // 把停用的部門資料，設置紅色背景。
                        if(item["disable"] == 1) {
                            item["_rowVariant"] = "danger"
                        }
                    }
                }

            }
            ).catch(function(error) {
                self.make_toast(
                    self.toast.err_title,
                    error,
                    self.toast.err_type
                )
            })
        },
        gen_pdf: function() {
            let self = this
            self.axios(
                {
                    method: "POST",
                    url: self.urls.gen_pdf,
                    responseType: "blob",
                }
            ).then(function(response) {
                    // 為 PDF 檔案建立一條 URL
                    const f_url = URL.createObjectURL(
                        new Blob(
                            [response.data],
                            {type: "application/pdf"}
                        )
                    )
                    // 開啟一個新視窗，瀏覽 PDF
                    window.open(f_url)
            }).catch(function(error) {
                self.make_toast(
                    self.toast.err_title,
                    error,
                    self.toast.err_type
                )
            })
        },
        gen_excel: function() {
            let self = this
            self.axios(
                {
                    method: "POST",
                    url: self.urls.gen_excel,
                    responseType: "blob",
                }
            ).then(function(response) {
                // 為 Excel 檔案建立一條 URL
                const f_url = URL.createObjectURL(
                    new Blob(
                        [response.data],
                        { type: "application/vnd.ms-excel" }
                    )
                )
                // 建立一個 <a> 標纖
                const link = document.createElement("a")
                // 設罝 <a> 屬性值
                link.href = f_url
                link.setAttribute("download", "USER-DATA.xlsx")
                // 把 <a> 加入網頁中
                document.body.appendChild(link)
                // 觸發 <a> Click 事件，下載 Excel 檔
                link.click()
            }).catch(function(error) {
                self.make_toast(
                    self.toast.err_title,
                    error,
                    self.toast.err_type
                )
            })
        },
        search_user: function(value) {
            this.sel_for_table(
                1,
                value,
                this.disable_sel_val,
                this.table.order_by,
                this.table.order_desc
            )
        },
        make_toast(title, txt, variant) {
            this.$bvToast.toast(txt, {
                title: title,
                variant: variant,
                solid: true
            })
        },
        sort_change: function(cxt) {
            this.table.order_by = cxt.sortBy
            this.table.order_desc = cxt.sortDesc

            this.sel_for_table(
                this.table.cur_page,
                this.search,
                this.disable_sel_val,
                this.table.order_by,
                this.table.order_desc
            )
        },
        upd_table_data: function() {
            this.sel_for_table(
                this.table.cur_page,
                this.search,
                this.disable_sel_val,
                this.table.order_by,
                this.table.order_desc
            )
        },
        dismiss_alert: function() {
            setTimeout(function() {
                let self = this

                self.modal.alert.show = false
            }.bind(this), this.modal.alert.suc_dismiss_msecs)
        },
        search_by_disable: function(value) {
            this.sel_for_table(
                1,
                this.search,
                value,
                this.table.order_by,
                this.table.order_desc
            )
        },
        show_cre_modal: function() {
            this.modal.type = this.modal.cre_type
            // 修改標題
            this.modal.title = "新增帳號"
            // 帳號
            this.modal.form.act.disable = false
            // 姓名
            this.modal.form.name.disable = false
            // 電郵
            this.modal.form.email.disable = false
            // 部門
            this.modal.form.dept.disable = false
            // 角色
            this.modal.form.role.disable = false
            // 修改按鈕名稱及功能
            this.modal.form.btn.txt = "新增"
            this.modal.form.btn.func = this.modal.form.btn.cre_user
            // 顥現按鈕
            this.modal.btn_is_show = true
            // 顯示 Modal
            this.$refs[this.modal.ref].show()
        },
        show_upd_modal: function(item) {
            this.modal.type = this.modal.upd_type
            // 修改標題
            this.modal.title = "修改帳號"
            // 帳號
            this.modal.form.act.disable = false
            // 姓名
            this.modal.form.name.disable = false
            // 電郵
            this.modal.form.email.disable = false
            // 部門
            this.modal.form.dept.disable = false
            // 角色
            this.modal.form.role.disable = false
            // 狀態
            this.modal.form.disable.disable = false
            // 修改按鈕名稱及功能
            this.modal.form.btn.txt = "更新"
            this.modal.form.btn.func = this.modal.form.btn.upd_user
            // 填寫帳號資料
            this.modal.form._id = item._id
            this.modal.form.act.val = item.act
            this.modal.form.name.val = item.name
            this.modal.form.email.val = item.email.split("@")[0]
            this.modal.form.dept.val = item.dept_id
            this.modal.form.role.val = item.role_id
            this.modal.form.disable.val =item.disable
            // 顥現按鈕
            this.modal.btn_is_show = true
            // 顯示Modal
            this.$refs[this.modal.ref].show()
        },
        modal_btn_func: function(target) {
            if(target == this.modal.form.btn.cre_user) {
                this.cre_user()
            }
            else if(target == this.modal.form.btn.upd_user) {
                this.upd_user()
            }
        },
        cre_user: function() {
            var err = false

            var act = this.modal.form.act.val
            var name = this.modal.form.name.val
            var email = this.modal.form.email.val
            var dept = this.modal.form.dept.val
            var role = this.modal.form.role.val
            if(act.length < 1) {
                this.modal.alert.msg = "請輸入帳號。"
                this.$refs.act.focus()
                err = true
            }
            else if(name.length < 1) {
                this.modal.alert.msg = "請輸入姓名。"
                this.$refs.name.focus()
                err = true
            }
            else if(email.length < 1) {
                this.modal.alert.msg = "請輸入電郵。"
                this.$refs.email.focus()
                err = true
            }
            else if(dept.length < 1) {
                this.modal.alert.msg = "請選擇部門。"
                this.$refs.dept.focus()
                err = true
            }

            if(err) {
                this.modal.alert.type = this.modal.alert.error
                this.modal.alert.show = true
                return
            }

            this.modal.alert.show = false

            // Button 更改為 "新增中..." 狀態
            this.modal.form.btn.txt = "新增中..."
            this.modal.form.btn.disable = true
            this.modal.form.btn.handling = true

            // 向伺服器發出請求
            setTimeout(function() {
                let self = this
                self.axios(
                    {
                        method: "POST",
                        url: self.urls.cre_user,
                        data: {
                            act: act,
                            name: name,
                            email: email,
                            dept_id: dept,
                            role_id: role,
                            create_by: "tommy.lao"
                        }
                    }
                ).then(function(response) {
                    var code = response.data.code
                    var msg = response.data.msg

                    if(code > 0) { // 成功新增帳號
                        self.upd_table_data()

                        self.modal.alert.msg = msg
                        self.modal.alert.type = self.modal.alert.suc
                        self.modal.alert.show = true

                        // 清除欄位資料
                        self.modal.form.act.val = ""
                        self.modal.form.name.val = ""
                        self.modal.form.email.val = ""
                        self.modal.form.dept.val = ""
                        self.modal.form.role.val = ""

                        // 2杪後隱藏 alert
                        self.dismiss_alert()
                    } else { // 新增失敗
                        self.modal.alert.msg = msg
                        self.modal.alert.type = self.modal.alert.err
                        self.modal.alert.show = true
                    }
                }).catch(function(error) {
                    self.modal.alert.msg = error
                    self.modal.alert.type = self.modal.alert.err
                    self.modal.alert.show = true
                })
                self.modal.form.btn.txt = "新增"
                self.modal.form.btn.disable = false
                self.modal.form.btn.handling = false
            }.bind(this), 1000)
        },
        upd_user: function() {
            var err = false

            var _id = this.modal.form._id
            var act = this.modal.form.act.val
            var name = this.modal.form.name.val
            var email = this.modal.form.email.val
            var dept = this.modal.form.dept.val
            var role = this.modal.form.role.val
            var disable = this.modal.form.disable.val

            if(act.length < 1) {
                this.modal.alert.msg = "請輸入帳號。"
                this.$refs.act.$el.focus()
                err = true
            }
            else if(name.length < 1) {
                this.modal.alert.msg = "請輸入姓名。"
                this.$refs.name.$el.focus()
                err = true
            }
            else if(email.length < 1) {
                this.modal.alert.msg = "請輸入電郵。"
                this.$refs.email.$el.focut()
                err = true
            }

            if(err) {
                this.modal.alert.type = this.modal.alert.err
                this.modal.alert.show = true
                return
            }
            this.modal.alert.show = false

            // Button 更改為 "更新中..." 狀態
            this.modal.form.btn.txt = "更新中..."
            this.modal.form.btn.disable = true
            this.modal.form.btn.handling = true

            setTimeout(function() {
                let self = this
                self.axios(
                    {
                        method: "POST",
                        url: self.urls.upd_user,
                        data: {
                            _id: _id,
                            act: act,
                            name: name,
                            email: email,
                            dept_id: dept,
                            role_id: role,
                            disable: disable,
                            update_by: "tommy.lao"
                        }
                    }
                ).then(function(response) {
                    var code = response.data.code
                    var msg = response.data.msg

                    if (code > 0) { // 成功新增部門資料
                        // 更新部門資料
                        self.upd_table_data()

                        self.modal.alert.msg = msg
                        self.modal.alert.type = self.modal.alert.suc
                        self.modal.alert.show = true

                        // 2杪後隱藏 alert
                        self.dismiss_alert()
                    } else { // 新增失敗
                        self.modal.alert.msg = msg
                        self.modal.alert.type = self.modal.alert.err
                        self.modal.alert.show = true
                    }
                }).catch(function(error) {
                    self.modal.alert.msg = error
                    self.modal.alert.type = self.modal.alert.err
                    self.modal.alert.show = true
                })
                self.modal.form.btn.txt = "更新"
                self.modal.form.btn.disable = false
                self.modal.form.btn.handling = false
            }.bind(this), 1000)
        },
        show_info_modal: function(item) {
            this.modal.type = this.modal.info_type
            // 修改標題
            this.modal.title = "帳號資料"
            // 編號
            this.modal.form.code.disable = true
            // 帳號
            this.modal.form.act.disable = true
            // 姓名
            this.modal.form.name.disable = true
            // 電郵
            this.modal.form.email.disable = true
            // 部門
            this.modal.form.dept.disable = true
            // 角色
            this.modal.form.role.disable = true
            // 狀態
            this.modal.form.disable.disable = true
            // 最後登錄時間
            this.modal.form.last_login_time.disable = true
            // 最後更改密碼時間
            this.modal.form.last_reset_pwd.disable = true
            // 建立人
            this.modal.form.create_by.disable = true
            // 建立時間
            this.modal.form.create_time.disable = true
            // 最後修改人
            this.modal.form.update_by.disable = true
            // 最後修改時間
            this.modal.form.update_time.disable = true
            // 停用人
            this.modal.form.disable_by.disable = true
            // 停用時間
            this.modal.form.disable_time.disable = true

            // 填寫部門資料
            this.modal.form.code.val = item.code
            this.modal.form.act.val = item.act
            this.modal.form.name.val = item.name
            this.modal.form.email.val = item.email.split("@")[0]
            this.modal.form.dept.val = item.dept_id
            this.modal.form.role.val = item.role_id
            this.modal.form.disable.val = item.disable
            this.modal.form.last_login_time.val = item.last_login_time
            this.modal.form.last_reset_pwd.val = item.last_reset_pwd_time
            this.modal.form.create_by.val = item.create_by
            this.modal.form.create_time.val = item.create_time
            this.modal.form.update_by.val = item.update_by
            this.modal.form.update_time.val = item.update_time
            this.modal.form.disable_by.val = item.disable_by
            this.modal.form.disable_time.val = item.disable_time

            // 設置表單
            this.modal.user_list = [
                // 編號
                {
                    id: this.modal.form.code.id,
                    ref: this.modal.form.code.ref,
                    txt: this.modal.form.code.txt,
                    val: this.modal.form.code.val,
                    disable: this.modal.form.code.disable,
                    type: this.modal.form.code.type,
                },
                // 帳號
                {
                    id: this.modal.form.act.id,
                    ref: this.modal.form.act.ref,
                    txt: this.modal.form.act.txt,
                    val: this.modal.form.act.val,
                    disable: this.modal.form.act.disable,
                    type: this.modal.form.act.type,
                },
                // 姓名
                {
                    id: this.modal.form.name.id,
                    ref: this.modal.form.name.ref,
                    txt: this.modal.form.name.txt,
                    val: this.modal.form.name.val,
                    disable: this.modal.form.name.disable,
                    type: this.modal.form.name.type,
                },
                // 電郵
                {
                    id: this.modal.form.email.id,
                    ref: this.modal.form.email.ref,
                    txt: this.modal.form.email.txt,
                    val: this.modal.form.email.val,
                    disable: this.modal.form.email.disable,
                    type: this.modal.form.email.type,
                },
                // 部門
                {
                    id: this.modal.form.dept.id,
                    ref: this.modal.form.dept.ref,
                    txt: this.modal.form.dept.txt,
                    val: this.modal.form.dept.val,
                    disable: this.modal.form.dept.disable,
                    type: this.modal.form.dept.type,
                },
                // 角色
                {
                    id: this.modal.form.role.id,
                    ref: this.modal.form.role.ref,
                    txt: this.modal.form.role.txt,
                    val: this.modal.form.role.val,
                    disable: this.modal.form.role.disable,
                    type: this.modal.form.role.type,
                },
                // 狀態
                {
                    id: this.modal.form.disable.id,
                    ref: this.modal.form.disable.ref,
                    txt: this.modal.form.disable.txt,
                    val: this.modal.form.disable.val,
                    disable: this.modal.form.disable.disable,
                    type: this.modal.form.disable.type,
                    options: this.modal.form.disable.options
                },
                // 最後登錄時間
                {
                    id: this.modal.form.last_login_time.id,
                    ref: this.modal.form.last_login_time.ref,
                    txt: this.modal.form.last_login_time.txt,
                    val: this.modal.form.last_login_time.val,
                    disable: this.modal.form.last_login_time.disable,
                    type: this.modal.form.last_login_time.type,
                },
                // 最後更改密碼時間
                {
                    id: this.modal.form.last_reset_pwd.id,
                    ref: this.modal.form.last_reset_pwd.ref,
                    txt: this.modal.form.last_reset_pwd.txt,
                    val: this.modal.form.last_reset_pwd.val,
                    disable: this.modal.form.last_reset_pwd.disable,
                    type: this.modal.form.last_reset_pwd.type,
                },
                // 建立人
                {
                    id: this.modal.form.create_by.id,
                    ref: this.modal.form.create_by.ref,
                    txt: this.modal.form.create_by.txt,
                    val: this.modal.form.create_by.val,
                    disable: this.modal.form.create_by.disable,
                    type: this.modal.form.create_by.type,
                },
                // 建立時間
                {
                    id: this.modal.form.create_time.id,
                    ref: this.modal.form.create_time.ref,
                    txt: this.modal.form.create_time.txt,
                    val: this.modal.form.create_time.val,
                    disable: this.modal.form.create_time.disable,
                    type: this.modal.form.create_time.type,
                },
                // 最後修改人
                {
                    id: this.modal.form.update_by.id,
                    ref: this.modal.form.update_by.ref,
                    txt: this.modal.form.update_by.txt,
                    val: this.modal.form.update_by.val,
                    disable: this.modal.form.update_by.disable,
                    type: this.modal.form.update_by.type,
                },
                // 最後修改時間
                {
                    id: this.modal.form.update_time.id,
                    ref: this.modal.form.update_time.ref,
                    txt: this.modal.form.update_time.txt,
                    val: this.modal.form.update_time.val,
                    disable: this.modal.form.update_time.disable,
                    type: this.modal.form.update_time.type,
                },
                // 停用人
                {
                    id: this.modal.form.disable_by.id,
                    ref: this.modal.form.disable_by.ref,
                    txt: this.modal.form.disable_by.txt,
                    val: this.modal.form.disable_by.val,
                    disable: this.modal.form.disable_by.disable,
                    type: this.modal.form.disable_by.type,
                },
                // 停用時間
                {
                    id: this.modal.form.disable_time.id,
                    ref: this.modal.form.disable_time.ref,
                    txt: this.modal.form.disable_time.txt,
                    val: this.modal.form.disable_time.val,
                    disable: this.modal.form.disable_time.disable,
                    type: this.modal.form.disable_time.type,
                }
            ]
            // 隠藏按鈕
            this.modal.btn_is_show = false
            // 顯示Modal
            this.$refs[this.modal.ref].show()
        },
        setup: function() {
            let self = this
            // 讀取使用中的部門
            self.axios(
                {
                    method: "POST",
                    url: self.urls.sel_dept,
                    data: {
                        disable: 0,
                    },
                }
            ).then(function(response){
                var code = response.data.code
                var msg = response.data.msg

                if(typeof(code) !== "undefined") {
                    if(code < 0) {
                        self.make_toast(
                            self.toast.err_title,
                            msg,
                            self.toast.err_type
                        )
                    }
                } else {
                    let dept_list = response.data.data
                    for(let i = 0; i < dept_list.length; i++) {
                        self.modal.form.dept.options.push({
                            "val": dept_list[i]["_id"],
                            "txt": dept_list[i]["desc2"]
                        })
                    }
                }
            }).catch(function(error) {
                self.make_toast(
                    self.toast.err_title,
                    error,
                    self.toast.err_type
                )
            })
            // 讀取使用中的角式
            self.axios(
                {
                    method: "POST",
                    url: self.urls.sel_role,
                    data: {
                        disable: 0
                    },
                }
            ).then(function(response) {
                var code = response.data.code
                var msg = response.data.msg

                if(typeof(code) !== "undefined") {
                    if(code < 0) {
                        self.make_toast(
                            self.toast.err_title,
                            msg,
                            self.toast.err_type
                        )
                    }
                } else {
                    let role_list = response.data.data
                    for(let i = 0; i < role_list.length; i++) {
                        self.modal.form.role.options.push({
                            "val": role_list[i]["_id"],
                            "txt": role_list[i]["desc2"]
                        })
                    }
                }
            }).catch(function(error) {
                self.make_toast(
                    self.toast.err_title,
                    error,
                    self.toast.err_type
                )
            })
        },
    },
    mounted: function() {
        this.sel_for_table(
            1,
            this.search,
            this.disable_sel_val,
            this.table.order_by,
            this.table.order_desc,
        )
        this.setup()
    }
}
</script>

<style lang="css" scoped>
    /* For modal */
    @import url(
        "https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap&subset=chinese-traditional"
    );

    .font {
        font-family: "Noto Sans TC", sans-serif;
    }

    .label {
        font-size: 20px;
    }

    .title {
        font-size: 30px;
    }
</style>
