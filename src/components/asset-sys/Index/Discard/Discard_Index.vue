<template>
<div>

    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"
             loader="Dots"
    
    >
    </loading>
    <DiscardTable ref="dsTable"/>
    <DiscardDialog ref="dsDialog"/>
    <DiscardDelete ref="dsDelete"/>

    
</div>
</template>

<script>
import DiscardTable from "../../components/Discard/Discard_Table";
import DiscardDialog from "../../components/Discard/Discard_Dialog";
import DiscardDelete from "../../components/Discard/Discard_Delete";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    name:"tt_index",
    data(){
        return{
            isLoading: false,
            fullPage: true,
            containerName:null,
            addLink:"http://192.168.12.26:9090/asset-sys/ins-discard/",
            voidLink:"http://192.168.12.26:9090/asset-sys/void-discard/",
            searchLink:"http://192.168.12.26:9090/asset-sys/sel-discard-for-table/",
            getWareHouseLink:"http://192.168.12.26:9090/asset-sys/sel-wh/",          
            getItemLink:"http://192.168.12.26:9090/asset-sys/sel-item-for-table/",
            getAssetLink:"http://192.168.12.26:9090/asset-sys/sel-asset-for-table/"
        }
    },
    components:{
        DiscardTable,
        DiscardDialog,
        DiscardDelete,
        Loading
    }
}
</script>