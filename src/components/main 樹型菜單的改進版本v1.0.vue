<template lang="html">
    <div id="main">
        <b-container fluid class="h-100">
            <b-row class="h-100">
                <!--
                    <b-col> 加 class="p-0" 目的是，把 BootstrapVue 預設的
                    padding 值設置為數 。
                -->
                <b-col xl="2" class="p-0 d-none d-xl-block">
                      <b-nav id="nav-slider" >
                            <tree-menu :label="tree.label"  :nodes="tree.nodes" :depth="0" :isRoot="true" ></tree-menu>                     
                      </b-nav>



                    <!-- 首先 d-none 隠藏, 當螢幕處於 lg 大小時顯示 -->
                    <!--<div id="nav-slider" class="d-none d-xl-block">
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

                    </div>-->
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
    import TreeMenu from '@/test/TreeMenu.vue'
let tree = 
{
    index:"1",
    label:'主頁面',
    isRoot:true,
    depth:0,
    to:"",
    myClass:"nav-item",
    nodes:
[
{
    index:"11",
    label: '管理系統',
    isRoot:false,
    depth:1,
    to:"",
    myClass:"nav-item",
    nodes: [
        {
            index:"111",
            label: '部門',
            isRoot:false,
            depth:2,
            to:"/act-sys/dept",
            myClass:"nav-item",

            
        }, 
        {
            index:"112",
            label: '角色' ,
            isRoot:false,
            to:"/act-sys/role",
            depth:2,
            myClass:"nav-item",

        }, 
        {
            index:"113",
            label: '廳團對數' ,
            isRoot:false,
            to:"/fbrel",
            depth:2,
            myClass:"nav-item",

        }
    ]
  


},
{
    index:"12",
    label: '資產系統',
    isRoot:true,
    depth:1,
    to:"",
    myClass:"nav-item",
    nodes: [
        {
            index:"121",
            label: '資產管理',
            depth:2,
            isRoot:false,
            to:"/asset-sys/item",
            myClass:"nav-item",
        }, 
        {
            index:"122",
            label: '資產類型' ,
            isRoot:false,
            depth:2,
            to:"/asset-sys/itemType",
            myClass:"nav-item",
        }, 
        {
            index:"123",
            label: '資產單位' ,
            isRoot:false,
            depth:2,
            to:"/asset-sys/itemUnit",
            myClass:"nav-item",
        }, 
        {
            index:"124",
            label: '倉庫管理' ,
            isRoot:false,
            depth:2,
            to:"/asset-sys/StoreHouse",
            myClass:"nav-item",
        }, 
        {
            index:"125",
            label:'供應商管理' ,
            isRoot:false,
            depth:2,
            to:"/asset-sys/Vendor",
            myClass:"nav-item",
        },         
        {
            index:"126",
            label: '入倉管理' ,
            isRoot:false,
            depth:2,
            to:"/asset-sys/Transaction",
            myClass:"nav-item",
        }, 
        {
            index:"127",
            label: '轉倉管理' ,
            isRoot:false,
            depth:2,
            to:"/asset-sys/Transfer",
            myClass:"nav-item",
        }, 
        {
            index:"128",
            label: '報銷管理' ,
            isRoot:false,
            depth:2,
            to:"/asset-sys/Discard",
            myClass:"nav-item",
        }
    ]

}

]
}
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
                },
                tree,
                myClass:"nav-item"
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

            //展开收起按钮点击 By Xing
            changeExpand(menu) {
                menu.isExpand = !menu.isExpand
                //console.log(menu.isExpand)
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
                "供應商管理" ,
                "報銷管理",
                "資產卡",
                "測試"

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
                "/asset-sys/Vendor",
                "/asset-sys/Discard",
                "/asset-sys/Asset",
                "/test" 

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

            //  for(let i = 1; i <= tabNameList.length; i++) {
            //     let item = {
            //         "tabID": "nav-item" + i,
            //         "tabName": tabNameList[i-1],
            //         "classValue": self.navItemClass.notSel,
            //         "url": tabUrls[i-1]

            //     }
            //     self.navItemList.push(item)
            // } 
            
          


            // 指向「主面頁」
            self.navItemList[0].classValue = self.navItemClass.sel
        },
        components: {
            LogoutAccount,
            ChangePwd,
            TreeMenu
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
        align: top
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
    }

    .nav-item:hover {
        border: 3px solid #CCCCCC;
        color: #000000;
        background-color: #CCCCCC
    }

    .nav-item-sel {
        border: 3px solid #CCCCCC;
        color: #000000;
        background-color: #CCCCCC
        
    }
</style>
