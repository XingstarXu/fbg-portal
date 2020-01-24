<template>
<div>
   <ItemDialog ref="itDialog"/>
   <publicDialogTable ref="child" >    
          <template v-slot:body>
             <div>
                <b-container class="bv-example-row">
                  <b-row class="mb-3">
                    <b-col>
                        <b-input-group prepend="搜索" class="mt-3" label-cols-sm="4">
                              <b-form-input v-model="search"></b-form-input>
                              <b-input-group-append>
                              <b-button variant="outline-success" @click="textSearch" >Search</b-button>
                              </b-input-group-append>
                        </b-input-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-button @click="showItemNewDialog" variant="info"> 添加新資產 </b-button>
                    </b-col>
                  </b-row>
                </b-container>               
             </div>


          </template>
          <template v-slot:selectButton="myItem">
            <b-button @click="selectAll">頁全選</b-button>
            <b-button @click="unSelectAll" class="ml-3">取消全部選擇</b-button>
          </template>
          <template v-slot:okbutten >
                      <b-button 
                                variant="primary"
                                size="sm"
                                class="float-right"
                                :disabled="isSaveDisabled"
                                @click="saveData"
                      >
                      {{saveText}}  
                      </b-button>
          </template>
          

  </publicDialogTable> 
  

</div>


</template>
<script>
//import { required, minLength, helpers } from 'vuelidate/lib/validators'
import ItemDialog from "../Item/Item_Dialog"
export default {
  name:"trDialog",
  data(){
    return{
      saveText:"加入",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      isDisabled:false,//控制輸入項是否可以編輯
      editDisable_Disabled:false,//停用項是否可以編輯
      operation:"",//窗體的操作類型 add:新增， update:更改
      options_Vendor:[],
      options_warehouse:[],
      rows:[],
      columns: [
            {
              label:"選擇",
              key:"selectColumn"
            },
            {
                label: "資產號",
                key: "item_code",
                sortable: true,
            },
            {
                label: "資產名稱",
                key: "item_desc2",
                sortable: true,
            },
            {
                label:"數量",
                key:"qty"
            },
            {
                label:"圖片",
                key:"img"
            }

        ],
        search:"",
        selected:[],
        importCount:0,
        parentTable:null,
        searchData:{},
        addLink:"http://192.168.12.26:9090/asset-sys/cre-item/",
        getTypeLink:"http://192.168.12.26:9090/asset-sys/sel-item-type/",
        getUnitLink:"http://192.168.12.26:9090/asset-sys/sel-item-unit/",
        getVendonLink:"http://192.168.12.26:9090/asset-sys/sel-vdr/"

    }
  },
  methods:{
    saveData(){
      let selItem={}   
      this.importCount=0
      this.selected.forEach(
        item=>{
                const rowsIds = this.$parent.$refs.child.tableRows.map(rowItem => rowItem.item_id)
                if(!rowsIds.includes(item.item_id))
                {
                  selItem={"item_id":item.item_id,"item_desc1":item.item_desc1,"item_desc2":item.item_desc2,"warehouse_id":item.warehouse_id,"warehouse_desc1":item.warehouse_desc1,"warehouse_desc2":item.warehouse_desc2,"qty":0,"price":0,amt:0,"remark":"","create_by":""}
                  this.$parent.$refs.child.tableRows.push(selItem)
                  this.importCount=this.importCount+1
                }

        }
      )
      this.$parent.$refs.child.tableConfig.totalRows=this.$parent.$refs.child.tableRows.length
      this.$parent.$refs.child.tableConfig.totalPage=Math.ceil(this.$parent.$refs.child.tableConfig.totalRows / this.$parent.$refs.child.tableConfig.perPage)
      let msg="已選加入"+this.importCount+"資產。"
      if(this.importCount<=0){
        msg="沒有任何資產加入"
        this.$refs.child.showAlert(msg,"danger")
      }
      else{
        this.$refs.child.showAlert(msg,"success")

      }
    },
    beforeOpen(){
      //this.$v.$reset();
      this.continueSaver=false
      this.$refs.child.dialogSize="lg"
      this.$refs.child.tableRows=[]
      this.selected=[]
      this.$parent.$refs.child.tableRows.forEach(
           item=>{
                this.selected.push(item)
      })
      this.$refs.child.perPage=0
      this.$refs.child.tableConfig.totalRows=this.$refs.child.tableRows.length
      this.$refs.child.tableConfig.totalPage=Math.ceil(this.$refs.child.tableConfig.totalRows / this.$refs.child.tableConfig.perPage)
      
    },

    badingData(){
            let self=this
            this.searchData={
                            "page":this.$refs.child.tableConfig.currentPage,
                            "num_of_page":this.$refs.child.tableConfig.perPage,
                            "search":this.search,
                            "iso":-1,
                            "order_by":"",
                            "order_desc":false
            }
            this.$http.post(this.$parent.$parent.getItemLink,this.searchData)
                        .then(function(response){
                            let res=response.data
                            self.$refs.child.tableRows = res.data
                            self.$refs.child.tableColumns=self.columns
                            self.isLoading=false
                            self.$refs.child.tableConfig.totalRows=res.records
                            self.$refs.child.tableConfig.totalPage=Math.ceil(res.records / self.$refs.child.tableConfig.perPage)
                            self.showSelectRow()//顯示被選中的行樣式

                        })
                        .catch(function(){
                            //console.log(error)
                            self.isLoading=false
                        })
        
      },

    textSearch(){
         this.badingData()
     },
    setModalDialogName(strName){
       this.$refs.child.myModalDialog=strName
     },

    onRowClicked(item){
        for(let i in this.selected){
          if(this.selected[i].item_id==item.item_id){
            this.selected.splice(i, 1)
            break;
          }
        }
      },
    onRowSelected(items){
        if(this.selected.length==0){
           items.forEach(item => {
             this.selected.push(item)
          })         
        }else{
          items.forEach(item => {
                const selectedIds = this.selected.map(selectedItem => selectedItem.item_id)
                if (!selectedIds.includes(item.item_id) ) {
                  this.selected.push(item)
                }
          })
        }
      },
    isSelected(citem){
        let re=false
        const selectedIds = this.selected.map(selectedItem => selectedItem.item_id)
        if(selectedIds.includes(citem.item_id))
        {
          re=true
        }
        return re

      },
    selectAll(){
        this.$refs.child.selectAll()

      },
    unSelectAll(){
        this.clearSelectCurrentPage()
        this.$refs.child.unSelectAll()
      },
    //清除所有當前頁面的選擇項
    clearSelectCurrentPage(){
        this.$refs.child.tableRows.forEach(item => {
            for(let i in this.selected){
               if (this.selected[i].item_id==item.item_id ) {
                    this.selected.splice(i, 1)
                    break
                    
                }
            }
        })

      },
    rowClass(){
      },
    
    showItemNewDialog(){
        this.$refs.itDialog.operation="add"
        this.$refs.itDialog.parentTable=this
        this.$bvModal.show('ItemDialog')
    },

    showSelectRow(){
      for (let index = 0; index < this.$refs.child.tableRows.length; index++) {
         this.selected.forEach(selectItme=>{
           if(selectItme.item_id==this.$refs.child.tableRows[index].item_id){
             this.$refs.child.selectTable.selectRow(index)
           }
         })      
      }
    }
           

  },
  components:{
    ItemDialog

  },
  mounted(){
    this.$refs.child.modal_titel="入倉資產選擇"
    this.$refs.child.tableColumns=this.columns
    this.$refs.itDialog.setModalDialogName("ItemDialog")
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

