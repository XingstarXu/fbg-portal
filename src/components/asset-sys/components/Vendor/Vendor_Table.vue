<template>
   <div>
        <ItemViewDialog ref="itDialog"/>
        <publicTable ref="child" >
            <template v-slot:searchAdd>
                 <b-container fluid >
                    <b-row>
                        <b-col >
                            <b-input-group prepend="搜索" class="mt-3">
                                <b-form-input v-model="searchText" @input="setValue($event)"></b-form-input>
                                <b-input-group-append>
                                     <b-button variant="outline-success" @click="textSearch" >Search</b-button>
                                </b-input-group-append>
                            </b-input-group>                  
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="2">
                            <b-input-group prepend="篩選" class="mt-3">
                                     <b-form-select v-model="isDisable" :options="disableOptions" @change="textSearch"></b-form-select>
                            </b-input-group> 
                        </b-col>                   
                    </b-row>                    
                </b-container>  

            </template>
            <template v-slot:buttenAdd>
              <b-button variant="success" align="right" @click="showNewDialog">
                   <font-awesome-icon icon="plus-square" />
                   新增供應商
               </b-button>
            </template>

            <template v-slot:diyColumn="myItem">
                  <b-button @click="showEditDialog(myItem.data.item,myItem.data.index)" variant="primary"><font-awesome-icon  icon="edit" /></b-button> | 
                  <b-button @click="showAssetDialog(myItem.data.item)" variant="info">項目明細</b-button>
            </template>

            

            
        </publicTable>




   </div>
</template>
<script>
 import ItemViewDialog from "../Item/Item_View"
export default {
    name:'Vendor',
    data(){
        return{
            columns: [

                        {
                            label: "供應商名稱(英)",
                            key: "vendor_desc1",
                            sortable: true,
                        },
                        {
                            label: "供應商名稱(中)",
                            key: "vendor_desc2",
                            sortable: true,
                        },
                        {
                            label:"電話",
                            key:"phone"
                        },
                        {
                            label:"郵箱",
                            key:"email"

                        },
                        {
                            label: "操作",
                            key: "opColumn",

                        }, 
                    ],

                isDisable:-1,
                disableOptions:[{value:1 ,text:"停用"},{value:0 ,text:"啟用"},{value:-1 ,text:"全部"}],
                searchText:"",
                searchLink:"",
                searchData:{},                
        }
    },
    methods:{
       showEditDialog(editRow,index){
           this.$refs.child.selectRow(index)
           this.$parent.$refs.veDialog.setData(editRow);
           this.$parent.$refs.veDialog.operation="update";
           this.$bvModal.show('ModalDialog');

           

       },
       showNewDialog(){
           this.$parent.$refs.veDialog.operation="add"
           this.$bvModal.show('ModalDialog');



       },
       showDelete(deleteRow){
           this.$parent.$refs.veDelete.deleteData=deleteRow;    
           this.$bvModal.show('ModalDelete');



       },
        setValue(value){
                //this.config.search=value.toUpperCase();
                this.searchText=value;

        }, 

        textSearch(){

            this.searchLink=this.$parent.searchLink
            this.searchData={
                        "page":this.$refs.child.config.currentPage,
                        "num_of_page":this.$refs.child.config.perPage,
                        "search":this.searchText,
                        "disable":this.isDisable,
                        "order_by":"",
                        "order_desc":false
            }
            this.$refs.child.badingData(this);//調用公用表的綁定方法
        },
        //停用或取消記錄時的行樣式
        rowClass(item) {
            
            if (!item) return
            if (item.disable === 1 ){
                return 'table-danger'
            } 
        },
        showAssetDialog(item){
            this.$refs.itDialog.search.vendorId=item.vendor_id
            this.$refs.itDialog.modalTitel=item.vendor_desc2+" 供應商資產明細"
            this.$bvModal.show('ItemViewDialog')
            this.$refs.itDialog.badingData()
        },

     
    },
    components:{
        ItemViewDialog
    },
    mounted:function(){
        this.$refs.child.columns=this.columns;
        this.$refs.child.config.title="供應商管理"
        this.$refs.itDialog.setModalDialogName("ItemViewDialog")
        this.textSearch()
 
    }
    
}
</script>
