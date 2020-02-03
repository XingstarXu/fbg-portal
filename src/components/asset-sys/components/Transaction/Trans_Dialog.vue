<template>
<div>
  <transItemDialog ref="trItemDialog"/>
  <assetDialog ref="assetDialog"/>
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
                                <model-list-select :list="options_Vendor" 
                                    v-model="editData.vendor_id" 
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
                                {{editData.warehouse_desc2}}

                            </template>
                            <template v-else>
                                    <model-list-select :list="options_warehouse"  
                                       v-model="editData.warehouse_id"  
                                       :isError= "$v.editData.warehouse_id.$error"               
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
                                {{editData.pr_no}}

                            </template>
                            <template v-else>
                                  <b-form-input v-model="editData.pr_no" 
                                            :class="{ 'is-invalid': $v.editData.pr_no.$error,'is-valid':!$v.editData.pr_no.$invalid }"
                                            :disabled="isDisabled"
                                  ></b-form-input>   
                                  <div v-if="$v.editData.pr_no.$error" class="invalid-feedback d-block">
                                      <span>發票號是必要的</span>
                                  </div>                                  
                            </template>                       


                    </b-col> 
                    <b-col lg="2" style="text-align:right" >
                             上傳發票:

                    </b-col> 
                    <b-col lg="3">

                          <template v-if="isDisabled">
                              <div v-if="isPDF(editData.invoice_doc)">
                                 <b-link @click="openFile">查看發票</b-link>
                              </div>
                              <div v-else>
                                   無發票文件
                              </div>
                                 

                            </template>
                            <template v-else>
                                                
                  
                                  <uploadFile ref="doc"/>
                                    <div v-if="$v.editData.invoice_doc.$error" class="invalid-feedback d-block">
                                      <span>上傳發票是必要的</span>
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
                  <b-col md=4 offset-md="4">
                     <h3> 總金額: {{editData.total_amt}}</h3>                  
                  </b-col>                   
                  <b-col>
                    <template v-if="!isDisabled">
                        <b-button variant="success" align="right" @click="showNewDialog" :disabled="isDisabled||isEditRow">
                            <font-awesome-icon icon="plus-square" />
                            新增入倉資產
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
                        <template v-else>
                              <b-button  variant="info" @click="showAssetDialog(myData)" id="v1" size="sm" >資產明細</b-button> 
                               
                        </template>                        
                  </template>
          </template>


          <template v-slot:diyColumn2="myData2">
            <template v-if="isEdit(myData2.data.index)">
                  <b-form-input v-model="myData2.data.item.qty" size="sm" @change="amtChange(myData2.data.item)" type="number" id="tooltip-qty"></b-form-input>
                      <b-tooltip :show.sync="tooltip_show" target="tooltip-qty" placement="top" variant="danger">
                        請輸入正整數
                      </b-tooltip>
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

          <!--金額-->
          <template v-slot:diyColumn5="myData5">
            <template v-if="isEdit(myData5.data.index)">
                  <b-form-input v-model="myData5.data.item.price" size="sm" @change="amtChange(myData5.data.item)" type="number"></b-form-input>
            </template>
            <template v-else>
                  <p>{{myData5.data.item.price}}</p>   
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
import uploadFile from "./update-file"
import transItemDialog from "../../components/Transaction/Trans_Item_Dialog"
import assetDialog from "../../components/Asset/Asset_Dialog"
import { ModelListSelect } from 'vue-search-select'
import { required } from 'vuelidate/lib/validators'
export default {
  name:"trDialog",
  data(){
    return{
      saveText:"保存",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      parentTable:null,//父窗體
      delMsg:"",//刪除提示信息
      tooltip_show:true, //正整數提示顯示標記
      isEditRow:false,  //編輯狀態標記
      isDisabled:false,//控制輸入項是否可以編輯
      operation:"",//窗體的操作類型 add:新增， update:更改
      editData:{},//表頭資訊集
      editItem:{},//需要的編輯行資訊集
      details_details:{},//明細資訊集
      deleteItem:{},//刪除行的資訊集       
      options_Vendor:[],
      options_warehouse:[],
      columns: [

            {
                label: "資產名稱",
                key: "item_desc2",
                sortable: true,
            },
            {
                label: "單價",
                key: "editColumn4",
            },
            {
                label:"數據量",
                key:"editColumn"
            },

            {
                label: "金額",
                key: "amt",

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
    //顯示明細資料時，設置要顯示的內容
    setData(editRow,detailes){
          this.editData={
                        code:editRow.code,
                        trans_date:editRow.trans_date,
                        vendor_id:editRow.vendor_id,
                        vendor_desc2: editRow.vendor_desc2,
                        warehouse_id:editRow.warehouse_id,
                        warehouse_desc2: editRow.warehouse_desc2,
                        pr_no:editRow.pr_no,
                        remark:editRow.remark,
                        total_amt: editRow.total_amt,
                        qty:editRow.qty,
                        void:editRow.void,
                        update_by:editRow.update_by,
                        create_by:editRow.create_by,
                        invoice_doc:editRow.invoice_doc
                        };
          this.$refs.child.tableRows=[]
          detailes.forEach(
            dItem=>{
                     
                      this.details_details={
                          item_id: dItem.item_id,
                          item_code:dItem.item_code,
                          item_desc2:dItem.item_desc2,
                          qty: dItem.qty,
                          price: dItem.price,
                          amt: dItem.amt,
                          remark:dItem.remark,
                          asstes:dItem.asset_list
                      }
                      this.$refs.child.tableRows.push(this.details_details)


          })
          //分頁設置
          this.$refs.child.tableConfig.totalRows=this.$refs.child.tableRows.length
          this.$refs.child.tableConfig.totalPage=Math.ceil(this.$refs.child.tableConfig.totalRows / this.$refs.child.tableConfig.perPage)
    },
    //保存數據
    saveData(){

      //如果是新增時，要將上傳發票的文件值給保存變量中，以便進行驗證及保存。
      if(this.operation=="add"){
          this.editData.invoice_doc=this.$refs.doc.file
      }


      this.$v.$touch()//驗證數據
      //判斷是否有效的數據，如果存在無效的數據即會作出相應的提示及不會進行保存
      if(this.$v.$invalid){
            return
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
        this.$refs.child.tableRows.forEach(trItem=>{
             if(trItem.qty<=0){
                invalidText="資料未完整，請在紅色提示處錄入完整數據!"
                detailesInvalid=true
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
        }
      }
    },
    //保存新增數據
    addData(){
        //let self=this
        //Header表取值
        let header_new={
                          vendor_id:this.editData.vendor_id,
                          warehouse_id: this.editData.warehouse_id,                        
                          pr_no:this.editData.pr_no,
                          qty:this.editData.qty,
                          total_amt:this.editData.total_amt,
                          remark:this.editData.remark

              };
        //Details表取值
        let detailsRows=this.$refs.child.tableRows
        //保存連接的參數
        let formData = new FormData() 
        formData.append("website_code", "")
        formData.append("security_id", "")
        formData.append("header",JSON.stringify(header_new))
        formData.append("details",JSON.stringify(detailsRows))
        formData.append("invoice_doc", this.editData.invoice_doc)//上傳文檔，需要獨立的參數進行傳遞。
        this.$refs.child.saveData(this,this.$parent.addLink,formData)

    },
    //獲取倉庫資訊
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
    //獲取供應商資訊
    getVendor(){
    let self=this
    let securityID=this.$refs.child.getSecurityID()
    let websiteCode=this.$refs.child.getWebsiteCode()
    let searchData={
    website_code : websiteCode,
    security_id : securityID,
    "disable":0
    }
    this.$http.post(this.$parent.getVendorLink,searchData
                  )
                  .then(
                    function(response){
                      let res=response.data
                      self.options_Vendor=res.data
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
    //數量及金額輸入值的處理
    amtChange(item){
      item.qty=Number(item.qty)
      item.price=Number(item.price)
      item.amt=item.qty*item.price
      item.amt=Number(item.amt)
      this.editData.total_amt=0
      this.$refs.child.tableRows.forEach(item=>{
        this.editData.total_amt=Number(this.editData.total_amt)+Number(item.amt)
        this.editData.total_amt=Number(this.editData.total_amt)
        this.editData.qty=this.editData.qty+item.qty
      })

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
                this.editData.total_amt=this.editData.total_amt-this.$refs.child.tableRows[i].amt
                this.editData.qty=this.editData.qty-this.$refs.child.tableRows[i].qty
              }

      }
      //更新分頁數據
      this.$refs.child.tableConfig.totalRows=this.$refs.child.tableRows.length
      this.$refs.child.tableConfig.totalPage=Math.ceil(this.$refs.child.tableConfig.totalRows / this.$refs.child.tableConfig.perPage)
      this.$refs.delItem.closeDialog()
    },
    //顯示資產明細
    showAssetDialog(item){
        this.$refs.assetDialog.search=item.data.item.item_code
        this.$refs.assetDialog.rows=item.data.item.asstes
        this.$refs.assetDialog.isPerPage=true//採用自動分面功能
        this.$bvModal.show('AssetDialog')
    },
    showNewDialog(){
        this.$bvModal.show('TransItemDialog')
    }, 
    isPDF(invoice_doc){
        return invoice_doc.indexOf(".pdf") >= 0

    },

//公共插件提供的公用方法>>>>>>
    beforeOpen(){
          this.$v.$reset()
          this.$refs.child.dialogSize="xl"
          this.$refs.child.tableColumns=this.columns
          this.parentTable=this.$parent.$refs.trTable//設置父窗體 
          this.$refs.child.perPage=5//設置為自動分頁（0:DB分頁 >0：自動分頁）
          this.isEditRow=false//編輯行狀態標識
          this.isSaveDisabled=false//保存時的狀設定
          this.isDisabled=false //默認請況所有控件可以編輯
          this.isSaveDisabled=false//保存制禁用標識 
          switch (this.operation) {
          case "add": //如果是新增時初始化變量
              this.editData={
                code:"",
                trans_date:"",
                vendor_id:"",
                vendor_desc2: "",
                warehouse_id:"",
                warehouse_desc2: "",
                pr_no:"",
                invoice_doc:"newfile", 
                remark:"",
                total_amt: 0,
                qty:0,
                void:0,
                update_by:"",
                create_by:""
              }
              this.editItem={
                editIndex:-1,
                remarkValue:"",
                qtyValue:0,
                priceValue:"",
                amtValue:""              
              }
              

              this.$refs.child.tableRows=[]
              this.$refs.child.tableConfig.totalRows=this.$refs.child.tableRows.length
              this.$refs.child.tableConfig.totalPage=Math.ceil(this.$refs.child.tableConfig.totalRows / this.$refs.child.tableConfig.perPage) 
                                
              break
            case "detalis": //如果是查詢詳細即禁止編輯
              this.isDisabled=true
              this.isSaveDisabled=true//保存制禁用標識            
              break;
          }

          this.badingData()
          this.getWareHouse()
          this.getVendor()
          //this.openFile()
      },

      editRow(item){
          //保留原有的值    
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
          this.isEditRow=true
        
      },

      editRowOK(item){
        //正整數正則表達式
        let isInt=/^-?[0-9]\d*$/
        //如果不是正整數時，則會提示用戶輸入正整數。
        if(!isInt.test(item.data.item.qty)){
          this.tooltip_show=!this.tooltip_show
        }else{
          this.editItem.editIndex=-1
          this.$refs.child.unselectRow(item.data.index)
          this.$refs.child.selectRow(item.data.index)
          this.isEditRow=false
        }

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
          this.isEditRow=false
      },
      rowClass(item){
            if (!item) return
            if (item.qty<=0){
                return 'table-danger'
            } 
      },

      badingData(){
      },    
      onRowClicked(){
      },
      onRowSelected(){
      },
      isSelected(){
      },
      openFile(){
        let fileLink="http://192.168.12.26:9090/asset-sys/read-doc/"
        let securityID=this.$refs.child.getSecurityID()  //"3257a4fd95e74538b8058bbe3e99958a"
        let websiteCode=this.$refs.child.getWebsiteCode()//"WEB01"
        console.log(this.editData.invoice_doc)
        this.axios(
            {
              method: "POST",
              url: fileLink,
              data: {
                website_code : websiteCode,
                security_id : securityID,
                invoice_doc : this.editData.invoice_doc,
              },
              // responseType: "Blob",
              responseType: "arraybuffer",
            }
        )
        .then(
            function(response){
              // 為 PDF 檔案建立一條 URL
              const fileUrl = URL.createObjectURL(
                new Blob([response.data], {type: "application/pdf"})
              )
              // 開啟一個新視窗，瀏覽 PDF
              window.open(fileUrl)
            }
        )
        .catch(
            function(){
              //console.log(error)
            }
        )
      }
//<<<<<公共插件提供的公用方法

  },
  components:{
    transItemDialog,
    ModelListSelect,
    assetDialog,
    uploadFile

  },
  mounted(){
    this.$refs.child.modal_titel="入倉管理"
    this.$refs.trItemDialog.setModalDialogName("TransItemDialog")
    this.$refs.assetDialog.setModalDialogName("AssetDialog")
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
      invoice_doc:{
        required
      },
      pr_no:{
        required

      }

     
                      
    },

  }
  
}
</script>
