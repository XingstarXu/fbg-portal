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
                                            v-model.trim="$v.editData.from_wh_id.$model" 
                                            :isError= "$v.editData.from_wh_id.$error"             
                                            option-value="warehouse_id"
                                            option-text="warehouse_desc2"
                                            :isDisabled="isDisabled" 
                                        >                 
                                        </model-list-select>
                                        <div class="invalid-feedback d-block">
                                            <span v-if="$v.editData.from_wh_id.$required">原倉庫是必要的</span>
                                            <span v-if="$v.editData.from_wh_id.isSame">原倉庫與轉至倉庫不能相同</span>
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
                                        v-model.trim="$v.editData.to_wh_id.$model" 
                                        :isError= "$v.editData.to_wh_id.$error"             
                                        option-value="warehouse_id"
                                        option-text="warehouse_desc2"
                                        :isDisabled="isDisabled"
                                        
                                        >                 
                                        </model-list-select>
                                        <div  class="invalid-feedback d-block">
                                          <span v-if="$v.editData.to_wh_id.$required">轉至倉庫是必要的</span>
                                          <span v-if="$v.editData.to_wh_id.isSame">轉至倉庫與原倉庫不能相同</span>
                                        </div>                                    
                                  </template>                        
                            </b-col>                     
                      </b-row>
                      <b-row class="mb-3">
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
                              <b-button  variant="info" @click="editRow(myData)" id="v1" size="sm" :disabled="isDisabled">編輯</b-button> 
                              <b-button class="ml-3" variant="danger" @click="deleteShow(myData)" id="v1" size="sm" :disabled="isDisabled">刪除</b-button>
                        </template>
                  </template>

          </template>


          <template v-slot:diyColumn2="myData2">
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
          </template>

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
import transferItemDialog from "./Transfer_Item_Dialog";
import {ModelListSelect}  from 'vue-search-select';
import  {required}  from 'vuelidate/lib/validators';
export default {
  name:"ttDialog",
  data(){
    return{
      saveText:"保存",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      editData:{
              transfer_header_id:"",
              transfer_code:"",
              from_wh_id:"",
              from_wh_desc1:"",
              from_wh_desc2:"",
              to_wh_id:"",
              to_wh_desc1:"",
              to_wh_desc2:"",
              transfer_date:"",
              remark:"",
              qty:0,
              disable:0,
              update_by:"",
              create_by:""
        
      },
      editItem:{
              editIndex:-1,
              remarkValue:"",
              qtyValue:0,
      },

      isDisabled:false,//控制輸入項是否可以編輯
      editDisable_Disabled:false,//停用項是否可以編輯
      operation:"",//窗體的操作類型 add:新增， update:更改
      continueSaver:false, //是否繼續保存標示
      options_from_warehouse:[],
      options_to_warehouse:[],
      detailsRows:[],
      columns: [

            {
                label: "資產名稱",
                key: "item_desc2",
                sortable: true,
            },
            {
                label:"數據量",
                key:"editColumn"
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

        header_new:{
                from_wh_id:"",
                from_wh_desc1: "",
                from_wh_desc2: "",
                to_wh_id:"",
                to_wh_desc1: "",
                to_wh_desc2: "", 
                transfer_date: "",               
                qty:0,
                remark:"",
                create_by: ""
              },
           
        details_new:{
                
                item_id: "",
                item_desc1: "",
                item_desc2: "",
                qty: 0,
                remark: "",
                create_by: ""
               },
          header_update:{
                _id:"",
                code:"",
                transfer_date: "",
                from_wh_id:"",
                from_wh_desc1: "",
                from_wh_desc2: "",
                to_wh_id:"",
                to_wh_desc1: "",
                to_wh_desc2: "",  
                qty:0,
                remark:"",
                update_by: ""
              },                
          details_update:{
                transfer_details_id:"",
                item_id: "",
                item_desc1: "",
                item_desc2: "",
                qty: 0,
                remark: "",
                update_by: ""
               },
          parentTable:null,
          delMsg:"",
          deleteItem:{}

      


    }
  },
  methods:{
    saveData(){
      this.$v.$touch()
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
        //檢查明細資料的完整性
        this.$refs.child.tableRows.forEach(trItem=>{
             if(trItem.qty<=0){
                invalidText="資料未完整，請在紅色提示處錄入完整數據!"
                detailesInvalid=true;

              }
          })
          if(detailesInvalid){
             this.$refs.child.showAlert(invalidText,"danger");
            return;
          }

          this.$refs.child.confirmData();//調用公用窗體的confirmData方法，用禁用相關的按鈕。
          this.$parent.isLoading=true;//啟動加載頁面
          this.saveText="Saveing...";//保存制正在保存中的字樣
          this.isSaveDisabled=true;//禁用保存制
          switch(this.operation)
          {
            case "add":
              
              this.addData();

              break;
            case "update":
              this.updateData();
              break;


          }
      }
    },
    beforeOpen(){
        this.$v.$reset();
        this.$refs.child.dialogSize="xl"
        this.$refs.child.tableColumns=this.columns
        let newDate=new Date()
        switch (this.operation) {
         case "add": //如果是新增時初始化變量
            this.editData={
              transfer_header_id:"",
              transfer_code:"",
              from_wh_id:"",
              from_wh_desc1:"",
              from_wh_desc2:"",
              to_wh_id:"",
              to_wh_desc1:"",
              to_wh_desc2:"",
              transfer_date:newDate.toISOString().slice(0,10),
              remark:"",
              qty:0,
              disable:0,
              update_by:"",
              create_by:""
            }

            this.isSaveDisabled=false;
            this.editDisable_Disabled=true; 
            this.$refs.child.tableRows=[];  
            this.isDisabled=false; //默認請況所有控件可以編輯         
            break;
          case "detalis": //如果是查詢詳細即禁止編輯
            this.isDisabled=true; 
            this.isSaveDisabled=true;//保存制禁用標識            
            break;

          default:
            this.isSaveDisabled=false;//保存制禁用標識  
            this.isDisabled=false; //默認請況所有控件可以編輯 
            this.editDisable_Disabled=false;   
            this.continueSaver=false;
            break;
        }

        this.badingData();
        this.getWareHouse();
  
       

    },
    setData(editRow,detailes){
      //editRow.vendor_id.replace(/-/g,''),
          this.editData={
                    transfer_header_id: editRow.transfer_header_id,
                    transfer_code: editRow.transfer_code,
                    trans_date: editRow.trans_date,
                    from_wh_id: editRow.from_wh_id,
                    from_wh_desc1: editRow.from_wh_desc1,
                    from_wh_desc2: editRow.from_wh_desc2,
                    to_wh_id: editRow.to_wh_id,
                    to_wh_desc1: editRow.to_wh_desc1,
                    to_wh_desc2: editRow.to_wh_desc2,
                    remark: editRow.remark,
                    qty: editRow.qty,
                    disable: editRow.disable,
                    update_by: editRow.update_by
                   


          };
          this.$refs.child.tableRows=[]
          detailes.forEach(dItem=>{
                                  this.details_update={
                                        transfer_id:dItem.transfer_id,
                                        item_id: dItem.item_id,
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
          //獲取原倉庫的名稱資訊
          this.options_from_warehouse.forEach(
              fromItem=>{
                  if(fromItem.from_wh_id==this.editData.from_wh_id)
                  {
                        this.editData.from_wh_desc1=fromItem.from_wh_desc1
                        this.editData.from_wh_desc2=fromItem.from_wh_desc2
                  }
          })
          //獲取轉至倉的名稱資訊
          this.options_to_warehouse.forEach(
              toItem=>{
                  if(toItem.to_wh_id==this.editData.to_wh_id){
                    this.editData.to_wh_desc1=toItem.to_wh_desc1
                    this.editData.to_wh_desc2=toItem.to_wh_desc2
                  }
          })

          //Header表取值
          this.header_new={
                  from_wh_id:this.editData.from_wh_id,
                  from_wh_desc1:this.editData.from_wh_desc1,
                  from_wh_desc2:this.editData.from_wh_desc2,
                  to_wh_id:this.editData.to_wh_id,
                  to_wh_desc1:this.editData.to_wh_desc1,
                  to_wh_desc2:this.editData.to_wh_desc2, 
                  transfer_date:this.editData.transfer_date,               
                  qty:0,
                  remark:this.editData.remark,
                  create_by:"jx.xu"
                };
          //Details表取值
          this.detailsRows=this.$refs.child.tableRows
          this.detailsRows.forEach(
               detilsItem=>{
                    //統計入倉總數量
                    this.header_new.qty=Number(this.header_new.qty)+Number(detilsItem.qty);            
          })  
 
          let saveData={
                          "header":self.header_new,
                          "details":self.detailsRows

          }
          
         let s=this.$refs.child.saveData(this,this.$parent.addLink,saveData)
         if (s==1){
           this.beforeOpen()
         }
          
      },
    updateData(){
        let self=this;
        //Header處理
          //獲取原倉庫的名稱資訊
          this.options_from_warehouse.forEach(
               fromItem=>{
                    if(fromItem.from_wh_id==this.editData.from_wh_id)
                    {
                      this.editData.from_wh_desc1=fromItem.from_wh_desc1;
                      this.editData.from_wh_desc2=fromItem.from_wh_desc2;
                    }
          })
          //獲取轉至倉的名稱資訊
          this.options_to_warehouse.forEach(
               toItem=>{
                    if(toItem.to_wh_id==this.editData.to_wh_id)
                    {
                      this.editData.to_wh_desc1=toItem.to_wh_desc1;
                      this.editData.to_wh_desc2=toItem.to_wh_desc2;
                    }
          })
          //Header表更新
          this.header_update={
                  from_wh_id: this.editData.from_wh_id,
                  from_wh_desc1: this.editData.from_wh_desc1,
                  from_wh_desc2: this.editData.from_wh_desc2,
                  to_wh_id: this.editData.to_wh_id,
                  to_wh_desc1: this.editData.to_wh_desc1,
                  to_wh_desc2: this.editData.to_wh_desc2, 
                  transfer_code: this.editdata.transfer_code,
                  transfer_date: this.editData.transfer_date,               
                  qty:0,
                  remark:this.editData.remark,
                  update_by:"jx.xu"
                };
          //Details表取值
          this.detailsRows=this.$refs.child.tableRows;
          this.detailsRows.forEach(
               detilsItem=>{
                    //統計入倉總數量
                    this.header_update.qty=Number(this.header_update.qty)+Number(detilsItem.qty);

          })

          let saveData={
                        "header":self.header_update,
                        "details":self.detailsRows
          }
          
         this.$refs.child.saveData(this,self.header_update,saveData)          
      }, 

      getWareHouse(){
        let self=this;
        this.$http.post(this.$parent.getWareHouseLink,{"disable":0}
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
      badingData(){
      },
      showNewDialog(){
         this.$bvModal.show('TransferItemDialog');
      },     
      onRowClicked(){
      },
      onRowSelected(){

      },
      isSelected(){

      },
      pageChange(){
          this.editIndex=-1;
          this.$refs.child.$refs.selectTable.clearSelected();
      },
      editRow(item){
       
          this.editItem.editIndex=item.data.index;
          this.editItem.qtyValue=item.data.item.qty;
          this.editItem.remarkValue=item.data.item.remark;
          
          if(this.$refs.child.isRowSelected(item.data.index))
          {
             
            this.$refs.child.unselectRow(item.data.index);
          }
          else{
            this.$refs.child.selectRow(item.data.index);

          }
        
      },
      isEdit(index){      
          return this.editItem.editIndex==index
      },
       editRowOK(item){
          this.editItem.editIndex=-1;
          this.$refs.child.unselectRow(item.data.index);
          this.$refs.child.selectRow(item.data.index);
      },
      editRowCancel(item){
          this.editItem.editIndex=-1;
          //預先保存原有的值
          item.data.item.qty=this.editItem.qtyValue;
          item.data.item.remark=this.editItem.remarkValue;

          //清空臨時值
          this.editItem.qtyValue=0;
          this.editItem.remarkValue="";

          this.$refs.child.unselectRow(item.data.index);
          this.$refs.child.selectRow(item.data.index);
        

      },
      rowClass(item){
            if (!item) return
            if (item.warehouse_id===undefined || item.qty<=0){
                return 'table-danger'
            } 

      },

      amtChange(item){
        item.qty=Number(item.qty);
      

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
      isWHSame(value){
          let se=this
          let isSelectSame=true
          if (value === '') return false
          if(this.editData.from_wh_id==this.editData.to_wh_id & se.operation=="add")
          {
            isSelectSame=true  
          }
          else
          {
            isSelectSame=false 
          }
          return Boolean(isSelectSame)
      }

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
      transfer_date:{
        required,

      },
      invoice_no:{
        required

      }

     
                      
    },


  }
  
}
</script>