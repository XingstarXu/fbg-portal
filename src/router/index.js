import Vue from "vue"

// 導入及註冊 vue-router
import VueRouter from "vue-router"
Vue.use(VueRouter)

import Index from "@/components/index"
import Main from "@/components/main"
import Profile from "@/components/profile"
import AssetSysAssetCard from "@/components/Asset_Card_View"
// UserAuth
import UserAuth from "@/components/user-auth/user-auth"
import Login from "@/components/user-auth/login"
import ForgetPwd from "@/components/user-auth/forget-pwd"
import ResetPwd from "@/components/user-auth/reset-pwd"
// // Fbrel 廳團對數
import Fbrel from "@/components/fbrel/fbrel"
// // AssetSys 資產管理
import AssetSysItem from "@/components/asset-sys/Index/Item/Item_Index"
import AssetSysItemType from "@/components/asset-sys/Index/ItemType/ItemType_Index"
import AssetSysItemUnit from "@/components/asset-sys/Index/ItemUnit/ItemUnit_Index"
import AssetSysStoreHouse from "@/components/asset-sys/Index/StoreHouse/StoreHouse_Index"
import AssetSysTransaction from "@/components/asset-sys/Index/Transaction/Trans_Index"
import AssetSysTransferTransaction from "@/components/asset-sys/Index/TransferTransaction/Transfer_Index"
import AssetSysVendor from "@/components/asset-sys/Index/Vendor/Vendor_Index"
import AssetSysDiscard from "@/components/asset-sys/Index/Discard/Discard_Index"
import AssetSysAsset from "@/components/asset-sys/Index/Asset/Asset_Index"

import TST from "@/test/main.vue"



// // ActSys 帳號管理
import ActSysUser from "@/components/act-sys/user"
import ActSysDept from "@/components/act-sys/dept"
import ActSysRole from "@/components/act-sys/role"

export default new VueRouter({
    mode: "history",
    routes: [
        // Index
        {
            path: "/",
            name: "Index",
            component: Index,
        },
        {
            path: "/AssetCard/:id",
            name:"AssetSysAssetCard",
            component:AssetSysAssetCard,

        },       
        { // User Auth
            path: "/user-auth",
            name: "UserAuth",
            component: UserAuth,
            redirect: { name: "Login" },
            children: [
                { // Login
                    path: "/login",
                    name: "Login",
                    component: Login
                },
                { // Forget Password
                    path: "/forget-pwd",
                    name: "ForgetPwd",
                    component: ForgetPwd
                },
                { // Reset Password
                    path: "/reset-pwd/:applyID",
                    name: "ResetPwd",
                    component: ResetPwd
                },
            ]
        },
        {
            // Main
            path: "/main",
            name: "Main",
            component: Main,
            redirect: { name: "Profile" },
            children: [
                { // Profile
                    path: "/profile",
                    name: "Profile",
                    component: Profile
                },
                { // ActSysUser
                    path: "/act-sys/user",
                    name: "ActSysUser",
                    component: ActSysUser,
                },
                { // ActSysDept
                    path: "/act-sys/dept",
                    name: "ActSysDept",
                    component: ActSysDept,
                },
                { // ActSysRole
                    path: "/act-sys/role",
                    name: "ActSysRole",
                    component: ActSysRole,
                },
                { // Fbrel
                    path: "/fbrel",
                    name: "Fbrel",
                    component: Fbrel
                },
                { // AssetSys_item
                    path: "/asset-sys/item",
                    name: "AssetSysItem",
                    component: AssetSysItem
                },
                { // AssetSys_type
                    path: "/asset-sys/itemType",
                    name: "AssetSysItemType",
                    component: AssetSysItemType
                }, 
                { // AssetSys_Unit
                    path: "/asset-sys/itemUnit",
                    name: "AssetSysItemUnit",
                    component: AssetSysItemUnit
                }, 
                {// AssetSys_StoreHouse
                    path:"/asset-sys/StoreHouse",
                    name:"AssetSysStoreHouse",
                    component:AssetSysStoreHouse

                },
                {// AssetSys_Transaction
                    path:"/asset-sys/Transaction",
                    name:"AssetSysTransaction",
                    component:AssetSysTransaction

                },
                {// AssetSys_TransferTransaction
                    path:"/asset-sys/Transfer",
                    name:"AssetSysTransfer",
                    component:AssetSysTransferTransaction

                },
                {// AssetSys_Vendor
                    path:"/asset-sys/Vendor",
                    name:"AssetSysVendor",
                    component:AssetSysVendor

                },
                {// AssetSys_Discard
                    path:"/asset-sys/Discard",
                    name:"AssetSysDiscard",
                    component:AssetSysDiscard

                },
                {// AssetSys_Asset
                    path:"/asset-sys/Asset",
                    name:"AssetSysAsset",
                    component:AssetSysAsset

                },                                  
                {// test
                    path:"/test",
                    name:"test",
                    component:TST

                },

            ]
        },

    ]
})
