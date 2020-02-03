<template>
<div>
  <transferItemDialog ref="ttItemDialog"/>
  <publicDialogTable ref="child" >           
          <template v-slot:body>
             <div>
                 <b-container class="bv-example-row">
                      <b-row align-h="start" class="mb-3">
                            <b-col lg="2" style="text-align:right">
                                  原倉庫:
                            </b-col>
                            <b-col lg="3">
                                  <template v-if="isDisabled">
                                        {{editData.from_wh_desc2}}
                                  </template>
                                  <template v-else>
                                        <model-list-select 
                                            :list="options_from_warehouse"  
                                            v-model="editData.from_wh_id" 
                                            :isError= "$v.editData.from_wh_id.$error"             
                                            option-value="warehouse_id"
                                            option-text="warehouse_desc2"
                                            :isDisabled="isDisabled||isDisabled_wh_from" 
                                        >                 
                                        </model-list-select>
                                        <div v-if="$v.editData.from_wh_id.$error" class="invalid-feedback d-block">
                                            <span v-if="!$v.editData.from_wh_id.required">原倉庫是必要的</span>
                                            <span v-if="!$v.editData.from_wh_id.isSame">原倉庫與轉至倉庫不能相同</span>
                                        </div>                                     
                                  </template>                    
                            </b-col>
                            <b-col lg="2" style="text-align:right" >
                                    轉至倉庫:                 
                            </b-col> 
                            <b-col lg="3">
                                  <template v-if="isDisabled">
                                        {{editData.to_wh_desc2}}
                                  </template>
                                  <template v-else>
                                        <model-list-select :list="options_to_warehouse"  
                                        v-model="editData.to_wh_id" 
                                        :isError= "$v.editData.to_wh_id.$error"             
                                        option-value="warehouse_id"
                                        option-text="warehouse_desc2"
                                        :isDisabled="isDisabled"
                                        >                 
                                        </model-list-select>
                                        <div v-if="$v.editData.to_wh_id.$error" class="invalid-feedback d-block">
                                          <span v-if="!$v.editData.to_wh_id.required">轉至倉庫是必要的</span>
                                          <span v-if="!$v.editData.to_wh_id.isSame">轉至倉庫與原倉庫不能相同</span>
                                        </div>                                    
                                  </template>                        
                            </b-col>                     
                      </b-row>
                      <!-- <b-row class="mb-3">
                            <b-col lg="2" style="text-align:right">
                                  轉倉日期:                       
                            </b-col>  
                            <b-col lg="3">
                                    <template v-if="isDisabled">
                                        {{editData.transfer_date}}
                                    </template>
                                    <template v-else>
                                          <b-form-input type="date" v-model.trim="$v.editData.transfer_date.$model"
                                                  :class="{ 'is-invalid': $v.editData.transfer_date.$error,'is-valid':!$v.editData.transfer_date.$invalid }"
                                                  :disabled="isDisabled"
                                          ></b-form-input> 
                                          <div v-if="$v.editData.transfer_date.$error" class="invalid-feedback d-block">
                                              <span>轉倉日期是必要的</span>
                                          </div>                                   
                                    </template>                        
                            </b-col> 
                            <b-col lg="2" style="text-align:right">
                            </b-col>                   
                            <b-col lg="3">
                            </b-col> 
                      </b-row> -->

                      <b-row align-h="start" class="mb-3">
                            <b-col lg="2" style="text-align:right">
                                    備註:                   
                            </b-col>                     
                            <b-col lg="10" >
                                      <template v-if="isDisabled">
                                          {{editData.remark}}
                                      </template>
                                      <template v-else>
                                            <b-form-input v-model="editData.remark" :disabled="isDisabled"></b-form-input>                                  
                                      </template> 
                            </b-col>  
                      </b-row>
                </b-container>                
             </div>
          </template>
          <template v-slot:diyButton>
             <b-container>
                  <b-row class="mb-3" >
                      <b-col>
                          <template v-if="!isDisabled">
                              <b-button variant="success" align="right" @click="showNewDialog" :disabled="isDisabled||isEditRow">
                                  <i class="far fa-plus-square"></i> 
                                  新增轉倉資產
                              </b-button> 
                          </template>
                      </b-col>
                  </b-row>
              </b-container>
          </template>

          <template v-slot:diyColumn="myData">
                  <template v-if="isEdit(myData.data.index)">
                        <b-button  variant="success" @click="editRowOK(myData)" size="sm" >確認</b-button>
                        <span>&nbsp; | &nbsp;</span>
                        <b-button  variant="danger" @click="editRowCancel(myData)" size="sm" >取消</b-button>
                  </template>
                  <template v-else>
                        <template v-if="isDisabled==false">
                              <b-button  variant="info" @click="editRow(myData)" id="v1" size="sm" :disabled="isDisabled||isEditRow">編輯</b-button> 
                              <b-button class="ml-3" variant="danger" @click="deleteShow(myData)" id="v1" size="sm" :disabled="isDisabled||isEditRow">刪除</b-button>
                        </template>
                  </template>

          </template>

         <template v-slot:diyColumn3="myData3">
                <template v-if="isEdit(myData3.data.index)">
                      <b-form-input v-model="myData3.data.item.remark" size="sm" ></b-form-input>
                </template>
                <template v-else>
                      <p>{{myData3.data.item.remark}}</p>   
                </template>
          </template>

          <template v-slot:okbutten >
              <template v-if="isSaveDisabled==false && isEditRow==false">
                 <b-button 
                           variant="primary"
                           size="md"
                           class="float-right"
                           :disabled="isSaveDisabled"
                           @click="saveData"
                 >
                 {{saveText}}
                 </b-button>
              </template>
          </template>
  </publicDialogTable>

<!--資產項目刪除對話框-->
  <publicDelete ref="delItem" >           
          <template v-slot:body>
            <b-container>
               <b-row>
                 <b-col  lg="2">
                </b-col>
                 <b-col  lg="8">
                   <h6>{{delMsg}}</h6>
                 </b-col>
               </b-row>
            </b-container>
          </template>
          <template v-slot:okbutten >
                 <b-button variant="primary"
                           size="sm"
                           class="float-right"
                           :disabled="isSaveDisabled"
                           @click="deleteRow"
                 >
                 確定
                 </b-button>
          </template>
  </publicDelete>


  <!-- {{$v}} -->

</div>
</template>
<script>
import transferItemDialog from "./Transfer_Item_Dialog";
import {ModelListSelect}  from 'vue-search-select';
import  {required}  from 'vuelidate/lib/validators';
export default {
  name:"ttDialog",
  data(){
    return{
      saveText:"保存",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      parentTable:null,//父窗體
      delMsg:"",//刪除提示信息
      isDisabled:false,//控制輸入項是否可以編輯
      operation:"",//窗體的操作類型 add:新增， update:更改      
      isEditRow:false,//編輯狀態標記
      isDisabled_wh_from:false,//原倉庫的編輯標識，若已選擇了原倉庫并加入資產后，即會變成無效狀態編輯（tre)。
      editData:{},//表頭資訊集
      details_data:{},//明細資訊集
      deleteItem:{},//刪除行的資訊集
      editItem:{},//需要的編輯行資訊集
      options_from_warehouse:[],
      options_to_warehouse:[],
      columns: [
            {
                label: "資產編號",
                key: "asset_code",
                sortable: true,
            },
            {
                label: "資產名稱",
                key: "item_desc2",
                sortable: true,
            },
            {
                label:"現存倉庫",
                key:"warehouse_desc2"
            },            

            {
                label:"備註",
                key:"editColumn2"

            },
            {
              label:"操作",
              key:"opcolumn"
            }
        ],

    }
  },
  methods:{
    saveData(){
      this.$v.$touch()//驗證數據
      //判斷是否有效的數據，如果存在無效的數據即會作出相應的提示及不會進行保存
      if(this.$v.$invalid){
            
            return;
      }
      else{
        let detailesInvalid=false;//明細資料的驗證標識
        let invalidText="";//出錯的提示內容

        if(this.$refs.child.tableRows.length<=0){
            invalidText="沒有任何資產入庫，請加入資產項目！";
            this.$refs.child.showAlert(invalidText,"danger");
            return;

        }

          if(detailesInvalid){
             this.$refs.child.showAlert(invalidText,"danger");
            return;
          }

          switch(this.operation)
          {
            case "add":
              this.addData();
              break;

          }
      }
    },
    
    setData(editRow,detailes){
          this.editData={
              transfer_header_id:editRow.transfer_header_id,
              transfer_code:editRow.transfer_code,
              from_wh_id:editRow.from_warehouse_id,
              from_wh_desc2:editRow.from_warehouse_desc2,
              to_wh_id:editRow.to_warehouse_id,
              to_wh_desc2:editRow.to_warehouse_desc2,
              transfer_date:editRow.transfer_date,
              remark:editRow.remark,
              void:0,
              update_by:editRow.update_by,
              create_by:editRow.create_by                
          };
          this.$refs.child.tableRows=[]
          detailes.forEach(dItem=>{
                                  this.details_data={
                                        asset_id: dItem.asset_id,
                                        asset_code: dItem.asset_code,
                                        item_desc2: dItem.item_desc2,
                                        warehouse_desc2:dItem.warehouse_desc2,
                                        remark: dItem.remark,
                                        update_by: dItem.update_by
                                  }
                                  this.$refs.child.tableRows.push(this.details_data)


          })


    },
    //保存新增數據
    addData(){
        //Header處理
        //Header表取值
        let header_new={
                from_warehouse_id:this.editData.from_wh_id,
                to_warehouse_id:this.editData.to_wh_id,          
                remark:this.editData.remark,
                void:this.editData.void,
                create_by:"jx.xu"
              };
        //Details表取值
        let detailsRows=this.$refs.child.tableRows

          let saveData={
                          "website_code": "",
                          "security_id": "",            
                          "header": header_new,
                          "details": detailsRows

          }

        
         let s=this.$refs.child.saveData(this,this.$parent.addLink,saveData)
         if (s==1){
           this.beforeOpen()
         }
          
      },
      //獲取倉庫信息
      getWareHouse(){
        let self=this
        let securityID=this.$refs.child.getSecurityID()
        let websiteCode=this.$refs.child.getWebsiteCode()
        let searchData={
        website_code : websiteCode,
        security_id : securityID,
        "disable":0
        }
        this.$http.post(this.$parent.getWareHouseLink,searchData
                      )
                      .then(
                        function(response){
                          let res=response.data;
                          self.options_from_warehouse=res.data;
                          self.options_to_warehouse=res.data;
                        }
                      )
                      .catch(
                        function(){
                          //console.log(error)
                        }
                      )
      },


      //判斷是否編輯狀態
      isEdit(index){      
          return this.editItem.editIndex==index
      },

      //顯示刪除對話框
      deleteShow(delItem){
        this.deleteItem=delItem.data.item
        this.delMsg="是否移除【"+this.deleteItem.asset_code+"】這條項目？"
        this.$bvModal.show('ItemDele')

      },
     //刪除已選項
      deleteRow(){
        for(let i in this.$refs.child.tableRows)
        {
               if(this.deleteItem.asset_id==this.$refs.child.tableRows[i].asset_id)
               {
                  this.$refs.child.tableRows.splice(i, 1)
               }

        }
        //更新分頁數據
        this.$refs.child.tableConfig.totalRows=this.$refs.child.tableRows.length
        this.$refs.child.tableConfig.totalPage=Math.ceil(this.$refs.child.tableConfig.totalRows / this.$refs.child.tableConfig.perPage)
        this.$refs.delItem.closeDialog()
      },
      //顯示新增窗口
      showNewDialog(){
        this.$v.editData.from_wh_id.$touch()
        //驗證是否有選擇原倉庫，如果沒有選擇則不能添加資產。
        if(!this.$v.editData.from_wh_id.$error)
        {
          this.$refs.ttItemDialog.search.warehouseId=this.editData.from_wh_id
          this.$bvModal.show('TransferItemDialog')
          this.$refs.ttItemDialog.badingData()
        }
      },


      //判斷是否選擇相同的倉庫
      isWHSame(value){
          let se=this
          let isSelectSame=true
          if (value != '') {
              if(this.editData.from_wh_id==this.editData.to_wh_id & se.operation=="add")
              {
                isSelectSame=false  
              }
              else
              {
                isSelectSame=true 
              }
          }
          return Boolean(isSelectSame)
      },

//公共插件提供的公用方法>>>>>>
      
      beforeOpen(){
          this.$v.$reset();
          this.$refs.child.dialogSize="xl"
          this.$refs.child.tableColumns=this.columns
          this.parentTable=this.$parent.$refs.ttTable 
          this.isSaveDisabled=false//保存制禁用標識  
          this.isDisabled=false //默認請況所有控件可以編輯 
          this.isDisabled_wh_from=false
          this.isEditRow=false
          this.$refs.child.perPage=5//設置為不是自動分頁
          switch (this.operation) {
          case "add": //如果是新增時初始化變量
              this.editData={
                transfer_header_id:"",
                transfer_code:"",
                from_wh_id:"",
                from_wh_desc2:"",
                to_wh_id:"",
                to_wh_desc2:"",
                transfer_date:"",
                remark:"",
                void:0,
                update_by:"",
                create_by:""
              }

              this.editItem={
                editIndex:-1,
                remarkValue:""
              }
              this.$refs.child.tableRows=[]  
              break;
            case "detalis": //如果是查詢詳細即禁止編輯
              this.isDisabled=true
              this.isSaveDisabled=true//保存制禁用標識            
              break;
          }
          this.$refs.child.tableConfig.totalRows=this.$refs.child.tableRows.length
          this.$refs.child.tableConfig.totalPage=Math.ceil(this.$refs.child.tableConfig.totalRows / this.$refs.child.tableConfig.perPage)    
          this.getWareHouse();
      },
      
      editRow(item){
          this.editItem.editIndex=item.data.index;
          this.editItem.remarkValue=item.data.item.remark;
          if(this.$refs.child.isRowSelected(item.data.index))
          {
             
            this.$refs.child.unselectRow(item.data.index);
          }
          else{
            this.$refs.child.selectRow(item.data.index);

          }
          this.isEditRow=true
        
      },

      editRowOK(item){
          this.editItem.editIndex=-1;
          this.$refs.child.unselectRow(item.data.index);
          this.$refs.child.selectRow(item.data.index);
          this.isEditRow=false
      },
      editRowCancel(item){
          this.editItem.editIndex=-1;
          //預先保存原有的值
          item.data.item.remark=this.editItem.remarkValue;
          //清空臨時值
          this.editItem.remarkValue="";
          this.$refs.child.unselectRow(item.data.index);
          this.$refs.child.selectRow(item.data.index);
          this.isEditRow=false

      },
      rowClass(item){
            if (!item) return
      },
      onRowClicked(){},
      onRowSelected(){},
      isSelected(){},
      badingData(){},
//<<<<<公共插件提供的公用方法

  },
  components:{
    transferItemDialog,
    ModelListSelect

  },
  mounted(){
    this.$refs.child.modal_titel="轉倉管理"
    this.$refs.child.serverModel=false;//分頁時不會在DB時獲取數據
    this.$refs.ttItemDialog.setModalDialogName("TransferItemDialog")
    this.$refs.child.selectMode="single"
    this.$refs.delItem.myName="ItemDele"//設置本對話框內的【Item刪除對話框】的名稱，以區分Trans_Delete的名稱
    this.$refs.delItem.modal_titel="刪除已選擇資產項"//設置本對話框內的【Item刪除對話框】的標題

  },
  validations: {
    editData: {
      from_wh_id:{
        required,
        isSame (value) {//驗證是否相同
             return  this.isWHSame(value)
        }

      },
      to_wh_id:{
        required,
        isSame (value) {//驗證是否相同
             return  this.isWHSame(value)
        }
      },     
    
                      
    },


  }
  
}
</script>