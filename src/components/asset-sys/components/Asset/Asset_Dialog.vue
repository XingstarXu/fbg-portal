<template>
<div>
   <publicDialogTable ref="child" >    
          <template v-slot:body>
             <div>
                <b-container class="bv-example-row">
                  <b-row class="mb-3">
                    <b-col>
                      <template v-if="!isPerPage">
                        <b-input-group prepend="搜索" class="mt-3" label-cols-sm="4">
                              <b-form-input v-model="search"></b-form-input>
                              <b-input-group-append>
                              <b-button variant="outline-success" @click="textSearch" >Search</b-button>
                              </b-input-group-append>
                        </b-input-group>
                      </template>
                    </b-col>
                  </b-row>
                </b-container>               
             </div>


          </template>
         

  </publicDialogTable> 
  

</div>


</template>
<script>
export default {
  name:"trDialog",
  data(){
    return{
      saveText:"加入",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      isDisabled:false,//控制輸入項是否可以編輯
      editDisable_Disabled:false,//停用項是否可以編輯
      operation:"",//窗體的操作類型 add:新增， update:更改
      continueSaver:false, //是否繼續保存標示
      rows:[],
      columns: [
            {
                label: "資產編號",
                key: "asset_code",
                sortable: true,
            },
            {
                label: "資產名稱(中)",
                key: "item_desc2",
                sortable: true,
            },
            {
                label:"現存倉庫",
                key:"warehouse_desc2"
                
            }, 
            {
                label:"金額",
                key:"price"
            },                                                                                          
            {
                label:"圖片",
                key:"photoColumn"
            }

        ],
        search:"",
        selected:[],
        sysSelecteds:[],
        importCount:0,
        parentTable:null,
        isPerPage:false
        
    }
  },
  methods:{
    
    beforeOpen(){
      //this.$v.$reset();
      this.continueSaver=false
      this.$refs.child.dialogSize="lg"
      this.$refs.child.tableRows=[]
      this.$refs.child.tableConfig.totalRows=this.$refs.child.tableRows.length
      this.$refs.child.tableConfig.totalPage=Math.ceil(this.$refs.child.tableConfig.totalRows / this.$refs.child.tableConfig.perPage)
      if(this.isPerPage){
         this.$refs.child.perPage=5
      }
      else{
        this.$refs.child.perPage=0
      }
      
      this.badingData()
      
    },

    badingData(){

      //判斷是否啟用自動分頁功能，如果是自動分頁功能則不會眾數據庫中獲取數據，並且會禁用查詢功能。
      if(this.isPerPage)
      {
            this.$refs.child.tableRows=this.rows
            this.$refs.child.tableConfig.totalRows=this.rows.length
            this.$refs.child.tableConfig.totalPage=Math.ceil(this.rows.length / this.$refs.child.tableConfig.perPage)
          
      }
      else
      {
            let self=this
            //獲取安全Cookies
            let securityID=""
            if(this.$cookies.isKey("security_id")) {
                securityID = self.$cookies.get("security_id")
            }
            else {
                // 轉至「登入」頁面
                self.$router.replace("/login")
                return
            }              
            this.searchData={
                            "website_code" : "WEB01",
                            "security_id" : securityID,               
                            "page":self.$refs.child.tableConfig.currentPage,
                            "num_of_page":self.$refs.child.tableConfig.perPage,
                            "search":self.search,
                            "void":0,
                            "order_by":"",
                            "order_desc":false
            }
            this.$http.post(this.$parent.$parent.getAssetLink,this.searchData)
                        .then(function(response){
                            let res=response.data
                            self.$refs.child.tableRows = res.data
                            self.$refs.child.tableColumns=self.columns
                            self.isLoading=false
                            self.$refs.child.tableConfig.totalRows=res.records
                            self.$refs.child.tableConfig.totalPage=Math.ceil(res.records / self.$refs.child.tableConfig.perPage)
                        })
                        .catch(function(){
                            //console.log(error)
                            self.isLoading=false
                        })
      }

        
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
         

  },
  components:{
      },
  mounted(){
    this.$refs.child.modal_titel="資產明細"
    this.$refs.child.tableColumns=this.columns
  },
  
}
</script>