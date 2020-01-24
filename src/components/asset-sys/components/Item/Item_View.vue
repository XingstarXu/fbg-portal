<template>
<div>
   <publicDialogTable ref="child" >        
          <template v-slot:body>
             <div>
                <b-container class="bv-example-row">
                  <b-row class="mb-3">
                    <b-col>
                        <b-input-group prepend="搜索" class="mt-3" label-cols-sm="4">
                              <b-form-input v-model="search.searchText"></b-form-input>
                              <b-input-group-append>
                              <b-button variant="outline-success" @click="textSearch" >Search</b-button>
                              </b-input-group-append>
                        </b-input-group>
                    </b-col>
                  </b-row>
                </b-container>               
             </div>
          </template>

  </publicDialogTable> 
  

</div>


</template>
<script>

//import { required, minLength, helpers } from 'vuelidate/lib/validators'
export default {
  name:"asDialog",
  data(){
    return{

      isDisabled:false,//控制輸入項是否可以編輯
      selectBy:"",//窗體的操作類型 vendor:按供應商查詢; warahouse:按倉庫查詢
      continueSaver:false, //是否繼續保存標示
      options_Vendor:[],
      options_warehouse:[],
      rows:[],
      columns: [
            {
                label: "項目編號",
                key: "item_code",
                sortable: true,
            },
            {
                label: "項目名稱",
                key: "item_desc2",
                sortable: true,
            },
            {
                label:"數量",
                key:"qty"
            },
            {
              label:"金額",
              key:"amt"
            },
            {
                label:"圖片",
                key:"img"
            }

        ],
        selected:[],
        sysSelecteds:[],
        importCount:0,
        parentTable:null,
        searchData:{},
        search:{
          searchText:"",
          warehouseId:"",
          vendorId:""
        },
        modalTitel:""

    }
  },
  methods:{
    beforeOpen(){
      //this.$v.$reset();
      this.continueSaver=false
      this.$refs.child.dialogSize="lg"
      this.$refs.child.tableRows=[]
      this.$refs.child.tableColumns=this.columns
      this.$refs.child.perPage=0//DB分頁
      this.$refs.child.modal_titel=this.modalTitel
      this.$refs.child.tableConfig.totalRows=this.$refs.child.tableRows.length
      this.$refs.child.tableConfig.totalPage=Math.ceil(this.$refs.child.tableConfig.totalRows / this.$refs.child.tableConfig.perPage)
      this.search.searchText=""
    },

    badingData(){
            let self=this
            this.searchLink=this.$parent.$parent.getAssetLink
            this.searchData={
                            "website_code" : "",
                            "security_id" : "",               
                            "page":self.$refs.child.tableConfig.currentPage,
                            "num_of_page":self.$refs.child.tableConfig.perPage,
                            "search":self.search.searchText,
                            "warehouse_id":self.search.warehouseId,
                            "vendor_id":self.search.vendorId,
                            "order_by":"",
                            "order_desc":false
            }
            this.$refs.child.badingData(this)
        
      },

     textSearch(){
         this.badingData()
     },
     setModalDialogName(strName){
       this.$refs.child.myModalDialog=strName
     },

      onRowClicked(){
      },
      onRowSelected(){
      },
      isSelected(){
      },
      selectAll(){
      },
      unSelectAll(){
      },
      //清除所有當前頁面的選擇項
      clearSelectCurrentPage(){
      },
      rowClass(){
      },
      showSelectRow(){
      }
           

  },
  components:{

  },
  mounted(){
    
  },
  // validations: {
  //   editData: {
  //     desc1:{
  //       required
  //     },
  //     desc2:{
  //       required
  //     },  
  //     address:{
  //       required
  //     },
  //     phone:{
  //       required,
  //       minLength:minLength(8)
  //     },
  //     email:{
  //       required,
  //       isEmail: helpers.regex('alpha', /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/)
  //     },
                      
  //   },


  // }
  
}
</script>