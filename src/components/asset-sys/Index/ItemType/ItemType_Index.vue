<template>
<div>

    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"
             loader="Dots"
    
    >
    </loading>
    <TypeTable ref="tyTable"/>
    <TypeDialog ref="tyDialog"/>
    
</div>
</template>

<script>
import TypeTable from "../../components/ItemType/Type_Table";
import TypeDialog from "../../components/ItemType/Type_Dialog";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    name:"sh_index",
    data(){
        return{
            isLoading: false,
            fullPage: true,
            containerName:null,
            addLink:"http://192.168.12.26:9090/asset-sys/cre-item-type/",
            updateLink:"http://192.168.12.26:9090/asset-sys/upd-item-type/",
            searchLink:"http://192.168.12.26:9090/asset-sys/sel-item-type-for-table/",
            
            //checkCodeUnique:"http://192.168.12.26:9090/asset-sys/check-item-code/",
        

        }
    },
    components:{
        TypeTable,
        TypeDialog,
        Loading

    }
}
</script>