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
                            <tree-menu :label="tree.label"  :nodes="tree.nodes" :depth="tree.depth" :isRoot="tree.isRoot" :id="tree.id" :myClass="tree.myClass"></tree-menu>                     
                      </b-nav>
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
    //父菜單數據
    let tree = 
    {
        id:"1",
        label:'主頁面',
        isRoot:true,
        isFolder:true,
        depth:0,
        to:"",
        myClass:"nav-item",
        nodes:[
                {
                    id:"11",
                    label: '管理系統',
                    to:"",
                    nodes: [],
                    isFolder:true,
                    isRoot:false,
                    depth:1

                },
                {
                    id:"12",
                    label: '資產系統',
                    to:"/asset-sys/Asset",
                    nodes: [],
                    isFolder:true,
                    isRoot:false,
                    depth:1

                },
                {
                    id:"13",
                    label: '5層菜單',
                    to:"",
                    nodes: [
                        {
                            id:"131",
                            label: '第3層01',
                            to:"",
                            nodes: [
                                {
                                    id:"1311",
                                    label: '第4層01_1',
                                    to:"",
                                    nodes: [],
                                    isFolder:true,
                                    isRoot:false,
                                    depth:3      
                                },
                                {
                                    id:"1312",
                                    label: '第4層01_2',
                                    to:"",
                                    nodes: [],
                                    isFolder:true,
                                    isRoot:false,
                                    depth:3                                     
                                }                         
                            ],
                            isFolder:true,
                            isRoot:false,
                            depth:2                           
                        },
                        {
                            id:"132",
                            label: '第3層02',
                            to:"",
                            nodes: [],
                            isFolder:true,
                            isRoot:false,
                            depth:2                           
                        },                        
                    ],
                    isFolder:true,
                    isRoot:false,
                    depth:1

                }

            ]
    }
    //子菜單數據
    let childrenes=[
        {
            parentId:11,
            nodes:[
                {
                    label: '部門',
                    to:"/act-sys/dept",             
                }, 
                {
                    label: '角色' ,
                    to:"/act-sys/role",

                }, 
                {
                    label: '廳團對數' ,
                    to:"/fbrel",
                }       
            ]
        },
        {
            parentId:12,
            nodes:[
                {
                    label: '資產管理',
                    to:"/asset-sys/item",
                }, 
                {
                    label: '資產類型' ,
                    to:"/asset-sys/itemType",
                }, 
                {
                    label: '資產單位' ,
                    to:"/asset-sys/itemUnit",
                }, 
                {

                    label: '倉庫管理' ,
                    to:"/asset-sys/StoreHouse",
                }, 
                {
                    label:'供應商管理' ,
                    to:"/asset-sys/Vendor",
                },         
                {
                    label: '入倉管理' ,
                    to:"/asset-sys/Transaction",
                }, 
                {

                    label: '轉倉管理' ,
                    to:"/asset-sys/Transfer",
                }, 
                {
                    label: '報銷管理' ,
                    to:"/asset-sys/Discard",
                }, 
                // {
                //     label: '測試' ,
                //     to:"/asset-sys/Asset",
                // }      
            ]
        },
        {
            parentId:1311,
            nodes:[
                {
                    label: '第5層菜單01',
                    to:"/asset-sys/itemType",
                }, 
  
            ]
        },
        {
            parentId:1312,
            nodes:[
                {
                    label: '第5層菜單02',
                    to:"/asset-sys/itemUnit",
                }, 
  
            ]
        },
        {
            parentId:132,
            nodes:[
                {
                    label: '第4層菜單02',
                    to:"/asset-sys/StoreHouse",
                }, 
  
            ]
        }     


    ]
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

            //初始化樹型菜單 by xing 2020-03-10
            setNodeItem(node){
                let reNode=node
                if(reNode.nodes==undefined || reNode.nodes.length<=0){
                    for (let index = 0; index < childrenes.length; index++) {
                        //let myItem=this.getNodeItem(item)
                        if( childrenes[index].parentId==reNode.id){                       
                            for (let i = 0; i < childrenes[index].nodes.length; i++) {
                                let nodeInfo2={
                                            id:reNode.id+String(i),
                                            depth:reNode.depth+1,
                                            isRoot:false,
                                            label: childrenes[index].nodes[i].label,
                                            to:childrenes[index].nodes[i].to,
                                            isFolder:false,
                                            myClass:"nav-item",

                                }
                                childrenes[index].nodes[i]=nodeInfo2
                                
                            }
                            reNode.nodes=childrenes[index].nodes
                            break
                        }
                        
                    }
                    return
                }
                else{
                    reNode.nodes.forEach(item=>{
                         this.setNodeItem(item)
                    })
                   
                }

            }


            
        },
        created: function(){
            //>>>>>>>初始化樹型菜單 by xing 2020-03-03
            this.tree.nodes.forEach(item => {
                this.setNodeItem(item)     

            })
           //<<<<<<<<<初始化樹型菜單 by xing 2020-03-03

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
