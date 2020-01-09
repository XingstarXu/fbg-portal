<template>
<div>
  <transItemDialog ref="trItemDialog"/>
  <publicDialogTable ref="child" >           
          <template v-slot:body>
             <div>
                <b-container class="bv-example-row">
                  <b-row align-h="start" class="mb-3">
                    <b-col lg="2" style="text-align:right">
                           供應商:
                    </b-col>
                    <b-col lg="3">
                            <template v-if="isDisabled">
                                {{editData.vendor_desc2}}
                            </template>
                            <template v-else>
                                <model-list-select :list="options_Vendor"  v-model.trim="$v.editData.vendor_id.$model" 
                                      :isError= "$v.editData.vendor_id.$error"             
                                    option-value="vendor_id"
                                    option-text="vendor_desc2"
                                    :isDisabled="isDisabled"
                                >                 
                                </model-list-select>
                                <div v-if="$v.editData.vendor_id.$error" class="invalid-feedback d-block">
                                  <span>供應商是必要的</span>
                                </div>                                    
                            </template>                     
                   
                    </b-col>


                    <b-col lg="2" style="text-align:right" >
                             轉入倉庫:                   

                    </b-col> 
                    <b-col lg="3">

                            <template v-if="isDisabled">
                                {{editData.trans_date}}

                            </template>
                            <template v-else>
                                    <model-list-select :list="options_warehouse"  v-model="editData.warehouse_id"                 
                                       option-value="warehouse_id"
                                       option-text="warehouse_desc2"
                                    >                 
                                    </model-list-select>
 
                                    <div v-if="$v.editData.warehouse_id.$error" class="invalid-feedback d-block">
                                      <span>轉入倉庫是必要的</span>
                                  </div>                                    
                           </template>                         
                                      
                    </b-col>                     


                  </b-row>
                  <b-row class="mb-3">
                     <b-col lg="2" style="text-align:right">
                             發票號:                   
                    </b-col>  
                    <b-col lg="3">
                            <template v-if="isDisabled">
                                {{editData.invoice_no}}

                            </template>
                            <template v-else>
                                  <b-form-input v-model.trim="$v.editData.invoice_no.$model" 
                                            :class="{ 'is-invalid': $v.editData.invoice_no.$error,'is-valid':!$v.editData.invoice_no.$invalid }"
                                            :disabled="isDisabled"
                                  ></b-form-input>                                    
                            </template>                       


                    </b-col> 
                    <b-col lg="2" style="text-align:right" >
                             入倉日期:                   

                    </b-col> 
                    <b-col lg="3">

                            <template v-if="isDisabled">
                                {{editData.trans_date}}

                            </template>
                            <template v-else>
                                                
                  
                                  <b-form-input type="date" v-model.trim="$v.editData.trans_date.$model" placeholder="Enter date"></b-form-input> 
                                    <div v-if="$v.editData.trans_date.$error" class="invalid-feedback d-block">
                                      <span>入倉時期是必要的</span>
                                  </div>                                    
                           </template>                         
                                      
                    </b-col>   
                  </b-row>

                  <b-row align-h="start" class="mb-3">
                     <b-col lg="2" style="text-align:right">
                             備註:                   

                    </b-col>                     
                     <b-col lg="8" >
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
                            <font-awesome-icon icon="plus-square" />
                            新增入倉資產
                        </b-button>
                    </template>

                  </b-col>
                  <!-- <b-col md=4 offset-md="4">

                     <h3> 總金額: {{editData.total_amt}}</h3>                  

                  </b-col>  金額暫不處理-->
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

<!-- 
          <template v-slot:diyColumn5="myData5">
            <template v-if="isEdit(myData5.data.index)">
                  <b-form-input v-model="myData5.data.item.price" size="sm" @change="amtChange(myData5.data.item)"></b-form-input>
            </template>
            <template v-else>
                  <p>{{myData5.data.item.price}}</p>   
            </template>      
          </template>      金額暫不處理-->

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

import transItemDialog from "../../components/Transaction/Trans_Item_Dialog"
import { ModelListSelect } from 'vue-search-select'
import { required } from 'vuelidate/lib/validators'
export default {
  name:"trDialog",
  data(){
    return{
      saveText:"保存",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      editData:{
        trans_id:"",
        code:"",
        trans_date:"",
        vendor_id:"",
        warehouse_id:"",
        invoice_no:"",
        delivery_no:"",
        remark:"",
        total_amt: 0,
        qty:0,
        disable:0,
        update_by:"",
        create_by:""
        
      },
      editItem:{
        editIndex:-1,
        remarkValue:"",
        qtyValue:0,
        priceValue:"",
        amtValue:""
      },

      isDisabled:false,//控制輸入項是否可以編輯
      editDisable_Disabled:false,//停用項是否可以編輯
      operation:"",//窗體的操作類型 add:新增， update:更改
      continueSaver:false, //是否繼續保存標示
      options_Vendor:[],
      options_warehouse:[],
      detailsRows:[],
      columns: [

            {
                label: "資產名稱",
                key: "item_desc2",
                sortable: true,
            },
            // {
            //     label: "單價",
            //     key: "editColumn4",
            // },
            {
                label:"數據量",
                key:"editColumn"
            },

            // {
            //     label: "金額",
            //     key: "amt",

            // },            

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
                vendor_id:"",
                vendor_desc1: "",
                vendor_desc2: "",
                warehouse_id:"",
                warehouse_desc1: "",
                warehouse_desc2: "",
                invoice_no: "",
                delivery_no: "",
                total_amt: 0,
                qty:0,
                remark:"",
                create_by: ""
              },
           
        details_new:{
                item_id: "",
                item_desc1: "",
                item_desc2: "",
                qty: 0,
                price: 0,
                amt: 0,
                remark: "",
                create_by: ""
               },
          header_update:{
                _id:"",
                code:"",
                trans_date: "",
                vendor_id:"",
                vendor_desc1: "",
                vendor_desc2: "",
                warehouse_id:"",
                warehouse_desc1: "",
                warehouse_desc2: "",                
                invoice_no: "",
                delivery_no: "",
                atotal_amt: 0,
                qty:0,
                remark:"",
                update_by: ""
              },                
          details_update:{
                _id:"",
                item_id: "",
                item_desc1: "",
                item_desc2: "",
                qty: 0,
                price: 0,
                amt: 0,
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
            invalidText="沒有任何資產入庫，請加入資產項目！"
            this.$refs.child.showAlert(invalidText,"danger")
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
             this.$refs.child.showAlert(invalidText,"danger")
            return;
          }

          switch(this.operation)
          {
            case "add":
              this.addData()
              break;
            case "update":
              this.updateData()
              break;


          }
      }
    },
    beforeOpen(){
        this.$v.$reset()
        this.$refs.child.dialogSize="xl"
        this.$refs.child.tableColumns=this.columns
        this.parentTable=this.$parent.$refs.trTable  
        let newDate = new Date()
        //date.setDate(date.getDate())
        
        switch (this.operation) {
         case "add": //如果是新增時初始化變量
            this.editData={
              trans_id:"",
              code:"",
              trans_date:newDate.toISOString().slice(0, 10),
              vendor_id:"",
              warehouse_id:"",
              invoice_no:"",
              delivery_no:"",
              remark:"",
              total_amt: 0,
              disable:0,
            }

            this.isSaveDisabled=false
            this.editDisable_Disabled=true
            this.$refs.child.tableRows=[]
            this.$refs.child.tableConfig.totalRows=this.$refs.child.tableRows.length
            this.$refs.child.tableConfig.totalPage=Math.ceil(this.$refs.child.tableConfig.totalRows / this.$refs.child.tableConfig.perPage) 
            this.isDisabled=false //默認請況所有控件可以編輯                  
            break
          case "detalis": //如果是查詢詳細即禁止編輯
            this.isDisabled=true
            this.isSaveDisabled=true//保存制禁用標識            
            break;

          default:
            this.isSaveDisabled=false//保存制禁用標識  
            this.isDisabled=false//默認請況所有控件可以編輯 
            this.editDisable_Disabled=false  
            this.continueSaver=false
            break;
        }

        this.badingData()
        this.getWareHouse()
        this.getVendor()
    },
    setData(editRow,detailes){
      //editRow.vendor_id.replace(/-/g,''),
          this.editData={
                          trans_id: editRow._id,
                          code: editRow.code,
                          trans_date: editRow.trans_date,
                          vendor_id: editRow.vendor_id,
                          vendor_desc1: editRow.vendor_desc1,
                          vendor_desc2: editRow.vendor_desc2,
                          warehouse_id: editRow.warehouse_id,
                          warehouse_desc1: editRow.warehouse_desc1,
                          warehouse_desc2: editRow.warehouse_desc2,
                          invoice_no:editRow.invoice_no,
                          delivery_no:editRow.delivery_no,
                          remark:editRow.remark,
                          total_amt: editRow.total_amt,
                          qty:editRow.qty,
                          disable:editRow.disable,
                          update_by:editRow.update_by
                        };
          this.$refs.child.tableRows=[]
          detailes.forEach(
            dItem=>{
                      this.details_update={
                            _id:dItem._id,
                            item_id: dItem.item_id,
                            item_desc1: dItem.item_desc1,
                            item_desc2: dItem.item_desc2,
                            qty: dItem.qty,
                            price: dItem.price,
                            amt: dItem.amt,
                            remark: dItem.remark,
                            update_by: dItem.update_by
                      }
                      this.$refs.child.tableRows.push(this.details_update)


          })
          this.$refs.child.tableConfig.totalRows=this.$refs.child.tableRows.length
          this.$refs.child.tableConfig.totalPage=Math.ceil(this.$refs.child.tableConfig.totalRows / this.$refs.child.tableConfig.perPage)
    },

    addData(){
        let self=this
        //Header處理
          //獲取供應商的名稱資訊
          this.options_Vendor.forEach(
               vendorItem=>{
                            if(vendorItem._id==this.editData.vendor_id)
                            {
                              this.editData.vendor_desc1=vendorItem.desc1
                              this.editData.vendor_desc2=vendorItem.desc2
                            }
          })
          //獲取倉庫的名稱資訊
          this.options_warehouse.forEach(
               warehousItem=>{
                            if(warehousItem._id==this.editData.warehouse_id)
                            {
                              this.editData.warehouse_desc1=warehousItem.desc1
                              this.editData.warehouse_desc2=warehousItem.desc2
                            }
          })

          //Header表取值
          this.header_new={
                            vendor_id:this.editData.vendor_id,
                            vendor_desc1:this.editData.vendor_desc1,
                            vendor_desc2:this.editData.vendor_desc2,
                            warehouse_id: this.editData.warehouse_id,
                            warehouse_desc1: this.editData.warehouse_desc1,
                            warehouse_desc2: this.editData.warehouse_desc2,                           
                            invoice_no:this.editData.invoice_no,
                            delivery_no:this.editData.delivery_no,
                            total_amt:0,
                            qty:0,
                            remark:this.editData.remark,
                            create_by:"jx.xu"
                };
          //Details表取值
          this.detailsRows=this.$refs.child.tableRows
          this.detailsRows.forEach(
               detilsItem=>{
                            //統計入倉總金額
                            this.header_new.total_amt=Number(this.header_new.total_amt)+Number(detilsItem.amt)
                            //統計入倉總數量
                            this.header_new.qty=Number(this.header_new.qty)+Number(detilsItem.qty)          

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
          //獲取供應商的名稱資訊
          this.options_Vendor.forEach(
               vendorItem=>{
                            if(vendorItem._id==this.editData.vendor_id)
                            {
                              this.editData.vendor_desc1=vendorItem.desc1
                              this.editData.vendor_desc2=vendorItem.desc2
                            }
          })
          //獲取倉庫的名稱資訊
          this.options_warehouse.forEach(
               warehousItem=>{
                            if(warehousItem._id==this.editData.warehouse_id)
                            {
                              this.editData.warehouse_desc1=warehousItem.desc1
                              this.editData.warehouse_desc2=warehousItem.desc2
                            }
          })          
          //Header表更新
          this.header_update={
                  _id:this.editData.trans_id,
                  code:this.editData.code,
                  trans_date:this.editData.trans_date,
                  vendor_id:this.editData.vendor_id,
                  vendor_desc1:this.editData.vendor_desc1,
                  vendor_desc2:this.editData.vendor_desc2,
                  warehouse_id:this.editData.warehouse_id,
                  warehouse_desc1:this.editData.warehouse_desc1,
                  warehouse_desc2:this.editData.warehouse_desc2,
                  invoice_no:this.editData.invoice_no,
                  delivery_no:this.editData.delivery_no,
                  total_amt:0,
                  qty:0,
                  remark:this.editData.remark,
                  update_by:"jx.xu"
                };
          //Details表取值
          this.detailsRows=this.$refs.child.tableRows
          this.detailsRows.forEach(
               detilsItem=>{
                            //統計入倉總金額
                            this.header_update.total_amt=Number(this.header_update.total_amt)+Number(detilsItem.amt)
                            //統計入倉總數量
                            this.header_update.qty=Number(this.header_update.qty)+Number(detilsItem.qty)
          })
          let saveData={
                        "header":self.header_update,
                        "details":self.detailsRows
          }
          
         this.$refs.child.saveData(this,this.$parent.updateLink,saveData)

      }, 

      getWareHouse(){
        let self=this
        this.$http.post(this.$parent.getWareHouseLink,{"disable":0}
                      )
                      .then(
                        function(response){
                          let res=response.data
                          self.options_warehouse=res.data
                        }
                      )
                      .catch(
                        function(){
                          //console.log(error)
                        }
                      )
      },

       getVendor(){
        let self=this;
        this.$http.post(this.$parent.getVendorLink,{"disable":0}
                      )
                      .then(
                        function(response){
                          let res=response.data;
                          self.options_Vendor=res.data;
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
         this.$bvModal.show('TransItemDialog')
      },     
      onRowClicked(){
      },
      onRowSelected(){

      },
      isSelected(){

      },
      editRow(item){
       
          this.editItem.editIndex=item.data.index
          this.editItem.qtyValue=item.data.item.qty
          this.editItem.remarkValue=item.data.item.remark
          this.editItem.priceValue=item.data.item.price
          this.editItem.amtValue=item.data.item.amt
          
          if(this.$refs.child.isRowSelected(item.data.index))
          {
             
            this.$refs.child.unselectRow(item.data.index)
          }
          else{
            this.$refs.child.selectRow(item.data.index)

          }
        
      },
      isEdit(index){      
          return this.editItem.editIndex==index
      },
       editRowOK(item){
          this.editItem.editIndex=-1
          this.$refs.child.unselectRow(item.data.index)
          this.$refs.child.selectRow(item.data.index)
      },
      editRowCancel(item){
          this.editItem.editIndex=-1
          //預先保存原有的值
          item.data.item.qty=this.editItem.qtyValue
          item.data.item.remark=this.editItem.remarkValue
          item.data.item.price=this.editItem.priceValue
          item.data.item.amt=this.editItem.amtValue

          //清空臨時值
          this.editItem.qtyValue=0
          this.editItem.remarkValue=""
          this.editItem.priceValue=0
          this.editItem.amtValue=0

          this.$refs.child.unselectRow(item.data.index)
          this.$refs.child.selectRow(item.data.index)
        

      },
      rowClass(item){
            if (!item) return
            if (item.qty<=0){
                return 'table-danger'
            } 

      },

      amtChange(item){
        item.qty=Number(item.qty)
        item.amt=item.qty*item.price
        

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
      }



  },
  components:{
    transItemDialog,
    ModelListSelect

  },
  mounted(){
    this.$refs.child.modal_titel="入倉管理"
    this.$refs.trItemDialog.setModalDialogName("TransItemDialog")
    this.$refs.child.selectMode="single"
    this.$refs.delItem.myName="ItemDele"//設置本對話框內的【Item刪除對話框】的名稱，以區分Trans_Delete的名稱
    this.$refs.delItem.modal_titel="刪除已選擇資產項"//設置本對話框內的【Item刪除對話框】的標題
  },

  validations: {
    editData: {
      vendor_id:{
        required
      },
      warehouse_id:{
        required
      },
      trans_date:{
        required
      },
      invoice_no:{
        required

      }

     
                      
    },


  }
  
}
</script>