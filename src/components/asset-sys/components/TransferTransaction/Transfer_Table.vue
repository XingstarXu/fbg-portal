<template>
   <div>
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
                                <b-form-select v-model="isVoid" :options="disableOptions" @change="textSearch"></b-form-select>
                            </b-input-group> 
                        </b-col>
                         <b-col md="3">
                            <b-input-group prepend="轉倉日期篩選" class="mt-3">
                                 <b-form-input id="datepicker" type="date" v-model="searchDate" placeholder="輸入要查詢的轉倉日期" @change="textSearch"></b-form-input>
                            </b-input-group> 
                        </b-col>                       
                    </b-row>                    
                </b-container>  
                    
                  
            </template>
            <template v-slot:buttenAdd>
              <b-button variant="success" @click="showNewDialog">
                   <font-awesome-icon icon="plus-square" />
                   新增轉倉單
               </b-button>
            </template>

            <template v-slot:diyColumn="myItem">
                  <b-button @click="showDetailsDialog(myItem.data)" variant="info"><font-awesome-icon icon="info-circle" /></b-button>
                  |
                  <b-button @click="showDelete(myItem.data)" :variant="changeVariant(myItem.data.item.header.void)" :disabled="myItem.data.item.header.void===1"><font-awesome-icon icon="trash-alt" /></b-button>
            </template>

        </publicTable>
   </div>
</template>
<script>

export default {
    name:'Vendor',
    data(){
        return{
            columns: [

                        {
                            label: "轉倉單號",
                            key: "header.code",
                            sortable: true,
                        },                     
                        {
                            label: "原倉庫",
                            key: "header.from_wh_desc2",
                            sortable: true,
                        },
                        {
                            label: "轉至倉庫",
                            key: "header.to_wh_desc2",
                            sortable: true,
                        },                       
                        {
                            label:"日期",
                            key:"header.transfer_date"
                        },
                         {
                            label:"備註",
                            key:"header.remark",
                        },
                        {
                            label: "操作",
                            key: "opColumn",

                        }, 
                    ],

                isVoid:-1,
                disableOptions:[{value:1 ,text:"無效單"},{value:0 ,text:"正常單"},{value:-1 ,text:"全部"}],
                searchDate:"",
                searchText:"",
                searchLink:"",
                searchData:{},                  
        }
    },
    methods:{
       showEditDialog(editRow){
           this.$parent.$refs.ttDialog.setData(editRow.item.header,editRow.item.details);
        //    this.$parent.$refs.trDialog.editData=editRow;
           this.$parent.$refs.ttDialog.operation="update";
           this.$bvModal.show('ModalDialog');

           

       },
       showNewDialog(){
           this.$parent.$refs.ttDialog.operation="add"
           this.$bvModal.show('ModalDialog');



       },
       showDelete(deleteRow){
           this.$refs.child.selectRow(deleteRow.index);
           this.$parent.$refs.ttDelete.setData(deleteRow);  
           this.$bvModal.show('ModalDelete');



       },
       showDetailsDialog(editRow){
           this.$parent.$refs.ttDialog.setData(editRow.item.header,editRow.item.details);
           this.$parent.$refs.ttDialog.operation="detalis";
           this.$bvModal.show('ModalDialog');
       },
      textSearch(){
            // this.searchLink=this.$parent.searchLink
            // this.searchData={
            //         "page":this.$refs.child.config.currentPage,
            //         "num_of_page":this.$refs.child.config.perPage,
            //         "search":this.searchText,
            //         "order_by":"",
            //         "order_desc":false,
            //         "trans_date":this.searchDate,
            //         "void":this.isVoid
            // }
            // this.$refs.child.badingData(this);//調用公用表的綁定方法
      },
      //停用或取消記錄時的行樣式
      rowClass(item) {
        
        if (!item) return
        if (item.header.void===1){
            return 'table-danger'
        }

      },
     
      changeVariant(isVoid){
          let ren="";
          if(isVoid==1){
              ren="secondary";
          }else{
              ren="danger";
          }
          return ren;

      }

    },
    components:{

    },
    mounted:function(){
        this.$refs.child.columns=this.columns
        //this.$refs.child.opColumn="trans_id"//設置操作列
        this.$refs.child.config.title="轉倉管理"
        this.textSearch()

        
    },
    
}
</script>
<style lang="scss">
#columnDispay{
  display: none
}

</style>
