<template lang="html">
    <div id="main">
        <b-container fluid class="h-100">
            <b-row class="h-100">
                <!--
                    <b-col> 加 class="p-0" 目的是，把 BootstrapVue 預設的
                    padding 值設置為數 。
                -->
                <b-col xl="2" class="p-0 d-none d-xl-block">
                    <!-- 首先 d-none 隠藏, 當螢幕處於 lg 大小時顯示 -->
                    <div id="nav-slider" class="d-none d-xl-block">
                        <div id="title-table">
                            <div id="title-cell">
                                <div id="title">
                                    Future Bright Group
                                </div>
                            </div>
                        </div>
                        <div id="line-ctn"><div id="line"></div></div>
                        <b-nav vertical>
                            <b-nav-item
                                v-for="(item, index) in navItemList"
                                :key="index"
                                @click="changeTxtCol(item.tabID)"
                                :ref="item.tabID"
                                :link-classes="item.classValue"
                                :to="item.url"> {{ item.tabName }}
                            </b-nav-item>
                        </b-nav>
                    </div>
                </b-col>

                <b-col xl="10" lg="12" class="p-0">
                    <div class="nav-bar">
                        <!--
                          toggleable:
                          type:
                          variant:
                          fixed:
                        -->
                        <b-navbar toggleable="xl" type="light">
                            <b-navbar-brand>
                                <b-button
                                    class="ml-2"
                                    variant="outline-secondary"
                                    @click="toLogout()">登出
                                </b-button>
                                <b-button
                                    class="ml-2"
                                    variant="outline-danger"
                                    @click="toChangePwd()">更改密碼
                                </b-button>
                            </b-navbar-brand>
                            <b-navbar-toggle
                                target="nav-collapse">
                            </b-navbar-toggle>
                            <b-collapse
                                id="nav-collapse" is-nav>
                                <b-navbar-nav class="d-xl-none d-lg-block">
                                    <b-nav-item
                                        v-for="(item, index) in navItemList"
                                        :key="index"
                                        :to="item.url"
                                    > {{ item.tabName }}
                                    </b-nav-item>
                                </b-navbar-nav>
                            </b-collapse>
                        </b-navbar>
                    </div>
                    <!-- 網頁內容 -->
                    <div id="nav-content">
                        <router-view></router-view>
                    </div>
                </b-col>
            </b-row>
        </b-container>

        <LogoutAccount
            :ref="logoutAccount.ref"
            :securityID="securityID">
        </LogoutAccount>
        <ChangePwd
            :ref="changePwd.ref"
            :securityID="securityID">
        </ChangePwd>

    </div>
</template>

<script>
    import LogoutAccount from "@/components/user-auth/app-logout-account"
    import ChangePwd from "@/components/user-auth/app-change-pwd"

    export default {
        name: "Main",
        data() {
            return {
                navItemClass: {
                    sel: "nav-item-sel",
                    notSel: "nav-item",
                },
                navItemList: [],
                securityID: "",
                logoutAccount: {
                    ref: "logoutAccount",
                },
                changePwd: {
                    ref: "changePwd"
                },
                component: {
                    login: "/login"
                }
            }
        },
        methods: {
            changeTxtCol(tabID) {
                for(let i=0; i < this.navItemList.length; i++) {
                    let item = this.navItemList[i]
                    if(item.tabID == tabID) {
                        item.classValue = this.navItemClass.sel
                    } else {
                        item.classValue = this.navItemClass.notSel
                    }
                }
            },
            toLogout() {
                let self = this

                if(self.$cookies.isKey("security_id")) {
                    self.securityID = self.$cookies.get("security_id")

                    let logoutAccount = self.$refs[self.logoutAccount.ref]
                    logoutAccount.show()
                }
                else {
                    // 轉至「登入」頁面
                    self.$router.replace(self.component.login)
                    return
                }
            },
            toChangePwd() {
                let self = this

                if(self.$cookies.isKey("security_id")) {
                    self.securityID = self.$cookies.get("security_id")

                    let changePwd = self.$refs[self.changePwd.ref]
                    changePwd.show()
                }
                else {
                    // 轉至「登入」頁面
                    self.$router.replace(self.component.login)
                    return
                }
            },
        },
        mounted: function() {
            let self = this

            if(self.$cookies.isKey("security_id")) {
                self.securityID = self.$cookies.get("security_id")
            }
            else {
                // 轉至「登入」頁面
                self.$router.replace(self.component.login)
                return
            }

            var tabNameList = [
                "主頁面",
                // "帳號管理",
                "部門",
                "角色",
                "廳團對數",
                "資產管理",
                "資產類型",
                "資產單位",
                "倉庫管理",
                "入倉管理",
                "轉倉管理",
                "供應商管理"

            ]
            var tabUrls = [
                "/profile",
                // "/act-sys/user",
                "/act-sys/dept",
                "/act-sys/role",
                "/fbrel",
                "/asset-sys/item",
                "/asset-sys/itemType",
                "/asset-sys/itemUnit",
                "/asset-sys/StoreHouse",
                "/asset-sys/Transaction",
                "/asset-sys/Transfer",
                "/asset-sys/Vendor"

            ]

            for(let i = 1; i <= tabNameList.length; i++) {
                let item = {
                    "tabID": "nav-item" + i,
                    "tabName": tabNameList[i-1],
                    "classValue": self.navItemClass.notSel,
                    "url": tabUrls[i-1]
                }
                self.navItemList.push(item)
            }
            // 指向「主面頁」
            self.navItemList[0].classValue = self.navItemClass.sel
        },
        components: {
            LogoutAccount,
            ChangePwd
        }
    }
</script>

<style lang="css" scoped>
    #main {
        width: 100%;
        height: 100%;
    }

    #nav-bar {
        background-color: #F4F3EF;
    }

    #nav-slider {
        width: 100%;
        height: 100%;

        background-color: #212120;
    }

    #nav-content {
        width: 100%;
        height: 93%;
        background-color: #F4F3EF;
        border-top: 1px solid #CCCCCC;
        padding: 10px;
    }

    #title-table {
        display: table;
        height: 63px;
        width: 100%;
        overflow: hidden;
    }

    #title-cell {
        display: table-cell;
        vertical-align: middle;
    }

    #title {
        color: #FFFFFF;
        font-size: 20px;
        text-align: center;
        width: 100%;
    }

    #line-ctn {
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
    }

    #line {
        width: 100%;
        border-top: 1px solid #CCCCCC;
    }

    .nav-item {
        color: #FFFFFF;
        /* 刪除按 <b-nav-item> 後，出顯的兩條線 */
        outline: 0;
        border: none;
        -moz-outline-style: none;
    }

    .nav-item:hover {
        color: #CCCCCC;
    }

    .nav-item-sel {
        color: #41B883;
        /* 刪除按 <b-nav-item> 後，出顯的兩條線 */
        outline: 0;
        border: none;
        -moz-outline-style: none;
    }

</style>
