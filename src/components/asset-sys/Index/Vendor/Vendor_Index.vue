<template>
<div>

    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"
             loader="Dots"
    
    >
    </loading>
    <VendorTable ref="veTable"/>
    <VendorDialog ref="veDialog"/>

    
</div>
</template>

<script>
import VendorTable from "../../components/Vendor/Vendor_Table";
import VendorDialog from "../../components/Vendor/Vendor_Dialog";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    name:"sh_index",
    data(){
        return{
            isLoading: false,
            fullPage: true,
            containerName:null,
            addLink:"http://192.168.12.26:9090/asset-sys/cre-vdr/",
            updateLink:"http://192.168.12.26:9090/asset-sys/upd-vdr/",
            searchLink:"http://192.168.12.26:9090/asset-sys/sel-vdr-for-table/",


        }
    },
    components:{
        VendorTable,
        VendorDialog,
        Loading

    }
}
</script>