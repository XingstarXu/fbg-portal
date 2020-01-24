<template>
<div>
  <discardItemDialog ref="dsItemDialog"/>
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
                                        {{editData.warehouse_desc2}}
                                  </template>
                                  <template v-else>
                                        <model-list-select 
                                            :list="options_warehouse"  
                                            v-model="editData.warehouse_id" 
                                            :isError= "$v.editData.warehouse_id.$error"             
                                            option-value="warehouse_id"
                                            option-text="warehouse_desc2"
                                            :isDisabled="isDisabled||isDisabled_wh_id" 
                                        >                 
                                        </model-list-select>

                                        <div v-if="$v.editData.warehouse_id.$error" class="invalid-feedback d-block">
                                            <span>原倉庫是必要的</span>
                                        </div> 
                                 
                                  </template>                    
                            </b-col>
                            <!-- <b-col lg="2" style="text-align:right">
                                  報銷日期:                       
                            </b-col>  
                            <b-col lg="3">
                                    <template v-if="isDisabled">
                                        {{editData.transfer_date}}
                                    </template>
                                    <template v-else>
                                          <b-form-input type="date" v-model.trim="$v.editData.discard_date.$model"
                                                  :class="{ 'is-invalid': $v.editData.discard_date.$error,'is-valid':!$v.editData.discard_date.$invalid }"
                                                  :disabled="isDisabled"
                                          ></b-form-input> 
                                          <div v-if="$v.editData.discard_date.$error" class="invalid-feedback d-block">
                                              <span>轉倉日期是必要的</span>
                                          </div>                                   
                                    </template>                        
                            </b-col>                     -->
                      </b-row>
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
                              <b-button variant="success" align="right" @click="showNewDialog" :disabled="isDisabled">
                                  <i class="far fa-plus-square"></i> 
                                  新增報銷資產
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
                              <b-button  variant="info" @click="editRow(myData)" id="v1" size="sm" :disabled="isDisabled">編輯</b-button> 
                              <b-button class="ml-3" variant="danger" @click="deleteShow(myData)" id="v1" size="sm" :disabled="isDisabled">刪除</b-button>
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

          <!-- <template v-slot:diyColumn2="myData2">
                <template v-if="isEdit(myData2.data.index)">
                      <b-form-input v-model="myData2.data.item.qty" size="sm" @change="amtChange(myData2.data.item)" type="number"></b-form-input>
                </template>
                <template v-else>
                      <p>{{myData2.data.item.qty}}</p>   
                </template>
          </template>

          <template v-slot:diyColumn3="myData3">
                <template v-if="isEdit(myData3.data.index)">
                      <b-form-input v-model="myData3.data.item.remark" size="sm" ></b-form-input>
                </template>
                <template v-else>
                      <p>{{myData3.data.item.remark}}</p>   
                </template>
          </template> -->

          <template v-slot:okbutten >
              <template v-if="isSaveDisabled==false">
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
import discardItemDialog from "./Discard_Item_Dialog";
import {ModelListSelect}  from 'vue-search-select';
import  {required}  from 'vuelidate/lib/validators';
export default {
  name:"dsDialog",
  data(){
    return{
      saveText:"保存",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      editData:{
              discard_header_id:"",
              discard_code:"",
              warehouse_id:"",
              warehouse_desc2:"",
              discard_date:"",
              remark:"",
              void:0
      },
      editItem:{
              editIndex:-1,
              remarkValue:""
      },

      isDisabled:false,//控制輸入項是否可以編輯
      editDisable_Disabled:false,//停用項是否可以編輯
      operation:"",//窗體的操作類型 add:新增， update:更改
      continueSaver:false, //是否繼續保存標示
      options_warehouse:[],
      detailsRows:[],
      columns: [

            {
                label: "資產名稱",
                key: "item_desc2",
                sortable: true,
            },
            {
                label:"資產編號",
                key:"asset_code"
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

        header_new:{},
        details_new:{},
        details_update:{},
        parentTable:null,
        delMsg:"",
        deleteItem:{},
        isDisabled_wh_id:false
    }
  },
  methods:{
    saveData(){
      this.$v.$touch()
      if(this.$v.$invalid){
            
            return;
      }
      else{
        let detailesInvalid=false//明細資料的驗證標識
        let invalidText=""//出錯的提示內容

        if(this.$refs.child.tableRows.length<=0){
            invalidText="沒有任何資產入庫，請加入資產項目！"
            this.$refs.child.showAlert(invalidText,"danger")
            return;

        }
        //檢查明細資料的完整性
        // this.$refs.child.tableRows.forEach(trItem=>{
        //      if(trItem.qty<=0){
        //         invalidText="資料未完整，請在紅色提示處錄入完整數據!"
        //         detailesInvalid=true;

        //       }
        //   })
          if(detailesInvalid){
             this.$refs.child.showAlert(invalidText,"danger")
            return;
          }

          switch(this.operation)
          {
            case "add":
              this.addData()
              break
          }
      }
    },

    setData(editRow,detailes){
      //editRow.vendor_id.replace(/-/g,''),
          this.editData={
                    discard_header_id:editRow.discard_header_id,
                    discard_code:editRow.discard_code,
                    warehouse_id:editRow.warehouse_id,
                    warehouse_desc2:editRow.warehouse_desc2,
                    discard_date:editRow.discard_date,
                    remark:editRow.remark,
                    void:editRow.void             
          };
          this.$refs.child.tableRows=[]
          console.log(detailes)
          console.log(this.$refs.child.perPage)
          detailes.forEach(dItem=>{
                                  this.details_update={
                                        discard_header_id:dItem.discard_header_id,
                                        asset_id: dItem.asset_id,
                                        asset_code:dItem.asset_code,
                                        item_desc1: dItem.item_desc1,
                                        item_desc2: dItem.item_desc2,
                                        qty: dItem.qty,
                                        remark: dItem.remark,
                                        update_by: dItem.update_by
                                  }
                                  this.$refs.child.tableRows.push(this.details_update)


          })


    },

    addData(){
        let self=this;
        //Header處理
        //Header表取值
        this.header_new={
                warehouse_id:this.editData.warehouse_id,
                remark:this.editData.remark,
              }
        //Details表取值
        this.detailsRows=this.$refs.child.tableRows

        //獲取安全Cookies
        let securityID=""
        if(self.$cookies.isKey("security_id")) {
            securityID = self.$cookies.get("security_id")
        }
        else {
            // 轉至「登入」頁面
            self.$router.replace("/login")
            return
        }

        let saveData={
                        "website_code": "WEB01",
                        "security_id": securityID,         
                        "header":self.header_new,
                        "details":self.detailsRows

        }
        
        let s=this.$refs.child.saveData(this,this.$parent.addLink,saveData)
        if (s==1){
          this.beforeOpen()
        }
          
      },
    
      getWareHouse(){
        let self=this;
        this.$http.post(this.$parent.getWareHouseLink,{"disable":0}
                      )
                      .then(
                        function(response){
                          let res=response.data;
                          self.options_warehouse=res.data;
                        }
                      )
                      .catch(
                        function(){
                          //console.log(error)
                        }
                      )
      },

      isEdit(index){      
          return this.editItem.editIndex==index
      },

      rowClass(item){
            if (!item) return
            if (item.asset_id===undefined){
                return 'table-danger'
            } 

      },

      //顯示刪除對話框
      deleteShow(delItem){       
        this.deleteItem=delItem.data.item
        this.delMsg="是否移除【"+this.deleteItem.item_desc2+"】這條項目？"
        this.$bvModal.show('ItemDele')

      },
     //刪除已選項
      deleteRow(){
        for(let i in this.$refs.child.tableRows)
        {
               if(this.deleteItem.item_id==this.$refs.child.tableRows[i].item_id)
               {
                  this.$refs.child.tableRows.splice(i, 1)
               }

        }
        //更新分頁數據
        this.$refs.child.tableConfig.totalRows=this.$refs.child.tableRows.length
        this.$refs.child.tableConfig.totalPage=Math.ceil(this.$refs.child.tableConfig.totalRows / this.$refs.child.tableConfig.perPage)
        this.$refs.delItem.closeDialog()
      },
       showNewDialog(){
         this.$v.editData.warehouse_id.$touch()
         //驗證是否有選擇原倉庫，如果沒有選擇則不能添加資產。
         if(!this.$v.editData.warehouse_id.$error){
            this.$refs.dsItemDialog.search.warehouseId=this.editData.warehouse_id
            this.$bvModal.show('DiscardItemDialog')
            this.$refs.dsItemDialog.badingData()
         }

      },         

//公共插件提供的公用方法>>>>>>  
      beforeOpen(){
          this.$v.$reset()
          this.$refs.child.dialogSize="xl"
          this.$refs.child.tableColumns=this.columns
          this.isDisabled_wh_id=false
          this.parentTable=this.$parent.$refs.dsTable
          this.$refs.child.perPage=5//設置為是自動分頁
          let newDate=new Date()
          switch (this.operation) {
          case "add": //如果是新增時初始化變量
              this.editData={
                discard_header_id:"",
                discard_code:"",
                warehouse_id:"",
                warehouse_desc2:"",
                discard_date:newDate.toISOString().slice(0,10),
                remark:"",
                void:0
              }

              this.isSaveDisabled=false
              this.editDisable_Disabled=true
              this.$refs.child.tableRows=[]  
              this.isDisabled=false //默認請況所有控件可以編輯         
              break
            case "detalis": //如果是查詢詳細即禁止編輯
              this.isDisabled=true 
              this.isSaveDisabled=true//保存制禁用標識            
              break

            default:
              this.isSaveDisabled=false//保存制禁用標識  
              this.isDisabled=false //默認請況所有控件可以編輯 
              this.editDisable_Disabled=false   
              this.continueSaver=false
              break
          }
          this.$refs.child.tableConfig.totalRows=this.$refs.child.tableRows.length
          this.$refs.child.tableConfig.totalPage=Math.ceil(this.$refs.child.tableConfig.totalRows / this.$refs.child.tableConfig.perPage)         
              this.badingData()
          this.getWareHouse()
    
        

      },

      pageChange(){
          this.editIndex=-1;
          this.$refs.child.$refs.selectTable.clearSelected()
      },
      editRow(item){
       
          this.editItem.editIndex=item.data.index
          this.editItem.remarkValue=item.data.item.remark
          
          if(this.$refs.child.isRowSelected(item.data.index))
          {
             
            this.$refs.child.unselectRow(item.data.index)
          }
          else{
            this.$refs.child.selectRow(item.data.index)
          }
        
      },    
      editRowOK(item){
          this.editItem.editIndex=-1
          this.$refs.child.unselectRow(item.data.index)
          this.$refs.child.selectRow(item.data.index)
      },
      editRowCancel(item){
          this.editItem.editIndex=-1
          //預先保存原有的值
          item.data.item.remark=this.editItem.remarkValue
          //清空臨時值
          this.editItem.remarkValue="";
          this.$refs.child.unselectRow(item.data.index)
          this.$refs.child.selectRow(item.data.index)
        

      },
      onRowClicked(){
      },
      onRowSelected(){
      },
      isSelected(){
      },  
      badingData(){
      },        


  },
  components:{
    discardItemDialog,
    ModelListSelect

  },
  mounted(){
    this.$refs.child.modal_titel="報銷管理"
    this.$refs.child.serverModel=false;//分頁時不會在DB時獲取數據
    this.$refs.dsItemDialog.setModalDialogName("DiscardItemDialog")
    this.$refs.child.selectMode="single"
    this.$refs.delItem.myName="ItemDele"//設置本對話框內的【Item刪除對話框】的名稱，以區分Trans_Delete的名稱
    this.$refs.delItem.modal_titel="刪除已選擇資產項"//設置本對話框內的【Item刪除對話框】的標題

  },
  validations: {
    editData: {
      warehouse_id:{
        required

      }, 
      discard_date:{
        required,
      },
     
                      
    },


  }
  
}
</script>