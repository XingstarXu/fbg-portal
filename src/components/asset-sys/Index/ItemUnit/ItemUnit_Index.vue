<template>
<div>

    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"
             loader="Dots"
    
    >
    </loading>
    <UnitTable ref="UnTable"/>
    <UnitDialog ref="UnDialog"/>
    
</div>
</template>

<script>
import UnitTable from "../../components/ItemUnit/Unit_Table";
import UnitDialog from "../../components/ItemUnit/Unit_Dialog";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    name:"un_index",
    data(){
        return{
            isLoading: false,
            fullPage: true,
            containerName:null,
            addLink:"http://192.168.12.26:9090/asset-sys/cre-item-unit/",
            updateLink:"http://192.168.12.26:9090/asset-sys/upd-item-unit/",
            searchLink:"http://192.168.12.26:9090/asset-sys/sel-item-unit-for-table/",
            //checkCodeUnique:"http://192.168.12.26:9090/asset-sys/check-item-code/",
        

        }
    },
    components:{
        UnitTable,
        UnitDialog,
        Loading

    }
}
</script>