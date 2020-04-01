<template>
<div>

    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"
             loader="Dots"
    
    >
    </loading>
    <AssetTable ref="asTable"/>
    <AssetCard ref="asCard"/>

    
</div>
</template>

<script>
import AssetTable from "../../components/Asset/Asset_Table";
import AssetCard from "../../components/Asset/Asset_Card_Print_List_test";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    name:"as_index",
    data(){
        return{
            isLoading: false,
            fullPage: true,
            containerName:null,
            searchLink:"http://192.168.12.26:9090/asset-sys/sel-asset-for-table/",

        }
    },
    components:{
        AssetTable,
        AssetCard,
        Loading

    }
}
</script>