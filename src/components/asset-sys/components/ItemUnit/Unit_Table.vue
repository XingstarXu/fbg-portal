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
                                   <b-form-select v-model="isDisable" :options="disableOptions" @change="textSearch"></b-form-select>
                            </b-input-group> 
                        </b-col>
                    </b-row>                    
                </b-container>  

            </template>
            <template v-slot:buttenAdd>
              <b-button variant="success" align="right" @click="showNewDialog">
                   <font-awesome-icon icon="plus-square" />
                   新增資產單位
               </b-button>
            </template>

            <template v-slot:diyColumn="myItem">
                  <b-button @click="showEditDialog(myItem.data.item,myItem.data.index)" variant="info"><font-awesome-icon  icon="edit" /></b-button>
            </template>
           
        </publicTable>
   </div>
</template>
<script>
export default {
    name:'item',
    data(){
        return{
            rows:[
                  ],
            columns: [ {
                            label: "單位名稱(英)",
                            key: "unit_desc1",
                            sortable: true,
                        },
                        {
                            label: "單位名稱(中)",
                            key: "unit_desc2",
                            sortable: true,
                        }, 
                        {
                            label:"操作",
                            key:"opColumn"
                        }
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
           this.$parent.$refs.UnDialog.setData(editRow);
           this.$parent.$refs.UnDialog.operation="update";
           this.$bvModal.show('ModalDialog');
       },
       showNewDialog(){
           this.$parent.$refs.UnDialog.operation="add"
           this.$bvModal.show('ModalDialog');
       },
       setValue(value){
                //this.config.search=value.toUpperCase();
                this.searchText=value;

        },        
       badingData(){
            this.searchLink=this.$parent.searchLink
            this.searchData={
                        "website_code":"",
                        "security_id":"",                    
                        "page":"",
                        "num_of_page":"",
                        "search":this.searchText,
                        "disable":this.isDisable,
                        "order_by":"",
                        "order_desc":false
            }
            this.$refs.child.badingData(this)//調用公用表的綁定方法


       },
     textSearch(){
            this.badingData()
     },
     //停用或取消記錄時的行樣式
     rowClass(item) {
        
        if (!item) return
        if (item.disable === 1 ){
            return 'table-danger'
        } 
     },    
    },
    components:{
    },
    mounted:function(){
        this.$refs.child.columns=this.columns;
        this.$refs.child.config.title="資產單位管理"
        this.textSearch();

        
    }

}
</script>

