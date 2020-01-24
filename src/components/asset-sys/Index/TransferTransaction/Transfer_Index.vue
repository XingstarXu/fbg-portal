<template>
<div>

    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"
             loader="Dots"
    
    >
    </loading>
    <TransferTable ref="ttTable"/>
    <TransferDialog ref="ttDialog"/>
    <TransferDelete ref="ttDelete"/>

    
</div>
</template>

<script>
import TransferTable from "../../components/TransferTransaction/Transfer_Table";
import TransferDialog from "../../components/TransferTransaction/Transfer_Dialog";
import TransferDelete from "../../components/TransferTransaction/Transfer_Delete";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    name:"tt_index",
    data(){
        return{
            isLoading: false,
            fullPage: true,
            containerName:null,
            addLink:"http://192.168.12.26:9090/asset-sys/ins-transfer/",
            voidLink:"http://192.168.12.26:9090/asset-sys/void-transfer/",
            searchLink:"http://192.168.12.26:9090/asset-sys/sel-transfer-for-table/",
            getWareHouseLink:"http://192.168.12.26:9090/asset-sys/sel-wh/",          
            getItemLink:"http://192.168.12.26:9090/asset-sys/sel-item-for-table/",
            getAssetLink:"http://192.168.12.26:9090/asset-sys/sel-asset-for-table/"


        }
    },
    components:{
        TransferTable,
        TransferDialog,
        TransferDelete,
        Loading

    }
}
</script>