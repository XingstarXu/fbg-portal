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
                                    <b-form-select v-model="isISO" :options="isoOptions" @change="textSearch"></b-form-select>
                            </b-input-group> 
                        </b-col>
                    </b-row>                    
                </b-container>                
               

                  
            </template>
            <template v-slot:buttenAdd>
              <b-button variant="success" align="right" @click="showNewDialog">
                   <font-awesome-icon icon="plus-square" />
                   新增資產
               </b-button>
            </template>

            <template v-slot:diyColumn="myItem">
                  <!--<b-button @click="showEditDialog(myItem.data.item,myItem.data.index)" variant="info"><i class="fas fa-edit" ></i></b-button>-->
                  <b-button @click="showEditDialog(myItem.data.item,myItem.data.index)" variant="info"><font-awesome-icon  icon="edit" /></b-button>
            </template>

             <template v-slot:diyColumn2="myItem2">
                  <div v-if="myItem2.data.item.iso==1">
                     <font-awesome-icon icon="check" style="color:#00EB00"/>
                  </div>
                  <div v-else>
                     <font-awesome-icon icon="times" style="color:#E60000"/>
                  </div>
                  
            </template>           

            <template v-slot:photoColumn="myphoto" class="photoImg">
                  <b-img :src="getImage(myphoto.data.item)" width="80" height="80"/>
            </template>
           
        </publicTable>
   </div>
</template>
<script>
export default {
    name:'item',
    data(){
        return{
            rows:[],
            columns: [{
                            label: "項目編號",
                            key: "item_code",
                            sortable: true,
                        },
                        {
                            label: "項目名稱(英)",
                            key: "item_desc1",
                            sortable: true,
                        },
                        {
                            label: "項目名稱(中)",
                            key: "item_desc2",
                            sortable: true,
                        },
                        {
                            label:"數量",
                            key:"qty"
                           
                        }, 
                        {
                            label:"總額",
                            key:"amt"
                        }, 
                        {
                            label:"ISO",
                            key:"opColumn2"
                        },                                            
                        {
                            label:"操作",
                            key:"opColumn"
                        }
                        ,                                              
                        {
                            label:"圖片",
                            key:"photoColumn"
                        }
                    ],
            isISO:-1, 
            isDisable:-1,
            isoOptions:[{value:1 ,text:"ISO"},{value:0 ,text:"非ISO"},{value:-1 ,text:"全部"}],
            disableOptions:[{value:0,text:"使用"},{value:1,text:"停用"},{value:-1,text:"全部"}],
            searchText:"",
            searchLink:"",
            searchData:{}

        }
    },
    methods:{
       showEditDialog(editRow,index){
           this.$refs.child.selectRow(index);
           this.$parent.$refs.itDialog.setData(editRow);
           this.$parent.$refs.itDialog.operation="update";
           this.$bvModal.show('ModalDialog');
       },
       showNewDialog(){
           this.$parent.$refs.itDialog.operation="add"
           this.$bvModal.show('ModalDialog');
       },
       showDelete(deleteRow){
           this.$parent.$refs.itDelete.deleteData=deleteRow;    
           this.$bvModal.show('ModalDelete');
       },
        setValue(value){
                //this.config.search=value.toUpperCase();
                this.searchText=value;

        },      
        textSearch(){
                this.searchLink=this.$parent.searchLink
                this.searchData={
                            "website_code":"",
                            "security_id":"",                    
                            "page":"",
                            "num_of_page":"",
                            "search":this.searchText,
                            "iso":this.isISO,
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
        getImage(item){
              return "data:image/jpeg;base64," + item.img
        }
    },
    components:{
    },
    mounted:function(){
        this.$refs.child.columns=this.columns;
        this.$refs.child.config.title="資產管理"
        this.textSearch();

        
    }

}
</script>

