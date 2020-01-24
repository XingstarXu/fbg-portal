<template>
    <div id="testApp">
        <b-nav vertical>
        <tree-menu :label="tree.label"  :nodes="tree.nodes" :depth="0" :isRoot="true"></tree-menu>
        </b-nav>
    </div>
</template>
<script>
import TreeMenu from './TreeMenu.vue'
let tree = 
{
    label:'Root1',
    isRoot:true,
    depth:0,
    nodes:
[
{
    label: 'menu_1',
    isRoot:true,
    depth:0,
    nodes: [
        {
            label: 'item11',
            isRoot:false,
            depth:1,
            nodes: [
                    {
                    label: 'item11.1',
                    isRoot:false,
                    depth:2,
                    },
                    {
                        label: 'item11.2',
                        isRoot:false,
                        depth:1,
                        nodes: [
                            {
                            label: 'item11.2.1',
                            isRoot:false,
                            depth:3,
                            }
                        ]
                }
            ]
        }, 
        {
            label: 'item12' ,
            isRoot:false,
            depth:1,
        }
    ]


},
{
    label: 'menu_2',
    isRoot:true,
    depth:0,
    nodes: [
        {
            label: 'item21',
            depth:1,
            nodes: [
                    {
                    label: 'item21.1',
                    isRoot:false,
                    depth:2,
                    },
                    {
                        label: 'item21.2',
                        isRoot:false,
                        nodes: [
                            {
                            label: 'item21.2.1',
                            isRoot:false,
                            depth:3,
                            }
                        ]
                }
            ]
        }, 
        {
            label: 'item22' ,
            isRoot:false,
            depth:1,
        }
    ]

}

]
}
export default {
    name:"testApp",
    data(){
        return{
           tree
        }
    },
    methods:{
        getData(){
        //    var tabNameList = [
        //         "主頁面",
        //         // "帳號管理",
        //         "部門",
        //         "角色",
        //         "廳團對數",
        //         "測試"

        //     ]
        //     var tabUrls = [
        //         "/profile",
        //         // "/act-sys/user",
        //         "/act-sys/dept",
        //         "/act-sys/role",
        //         "/fbrel",
        //         "/test" 

        //     ]

            // var childTab=[
            //     {
            //         "parent":"asset",
            //         "name":"資產管理",
            //         "url":"/asset-sys/item"
            //     },
            //     {
                    
            //         "parent":"asset",
            //         "name":"資產類型",
            //         "url":"/asset-sys/itemType"
            //     },                
            //     {
                    
            //         "parent":"asset",
            //         "name":"資產單位",
            //         "url":"/asset-sys/itemUnit"
            //     }, 
            //     {
                    
            //         "parent":"asset",
            //         "name":"倉庫管理",
            //         "url":"/asset-sys/StoreHouse"
            //     },               
            //     {
                    
            //         "parent":"asset",
            //         "name":"倉庫管理",
            //         "url":"/asset-sys/StoreHouse"
            //     },
            //     {
                    
            //         "parent":"asset",
            //         "name":"入倉管理",
            //         "url":"/asset-sys/Transaction"
            //     },                               
            //     {
                    
            //         "parent":"asset",
            //         "name":"轉倉管理",
            //         "url":"/asset-sys/Transfer"
            //     },
            //     {
                    
            //         "parent":"asset",
            //         "name":"供應商管理",
            //         "url":"/asset-sys/Vendor"
            //     },
            //     {
                    
            //         "parent":"asset",
            //         "name":"報銷管理",
            //         "url":"/asset-sys/Discard"
            //     }
            
            // ]

            //  for(let i = 1; i <= tabNameList.length; i++) {
            //     let item = {
            //         "tabID": "nav-item" + i,
            //         "tabName": tabNameList[i-1],
            //         "classValue": self.navItemClass.notSel,
            //         "url": tabUrls[i-1]

            //     }
            //     self.navItemList.push(item)
            // } 
        }

    },
    components: {
      TreeMenu
    }
}
</script>