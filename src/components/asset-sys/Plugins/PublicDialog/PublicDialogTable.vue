<template>
<div>
  
  <b-modal :id="myModalDialog"  @show="beforeOpen" @hide="cardCloseDo" 
                            @close="closeDialog" 
                            :cancel-disabled="cancelDisabled"
                            :cancel-title="cancelText"
                            :hide-header-close="isHideCloseButten"
                            :size="dialogSize"
                            header-bg-variant="primary"
                            header-text-variant="light"
                            >

      <b-container class="bv-example-row font">
        <b-row>
          <b-col>
           <slot name="body"></slot>
          </b-col>
        </b-row>
        <b-row >
          <b-col style="text-align:left">
                <div>
                    總頁數  <b>{{tableConfig.totalPage}}</b>頁， 
                    每頁顯示 <b>{{tableConfig.perPage}}</b>條記錄，
                    總記錄數  <b>{{tableConfig.totalRows}}</b>條
                </div>
          </b-col>

          <b-col style="text-align:right">

                <slot name="diyButton">

                </slot>

          </b-col>
        </b-row>
        <b-row>
          <b-col>
              <b-table :items="tableRows" :fields="tableColumns"  
              :sort-by.sync="tableConfig.sortBy"
              :sort-desc.sync="tableConfig.sortDesc"
              sortClass="sort-icon-left"
              :tbody-tr-class="rowClass"
              no-border-collapse:true
              striped hover
              selectable
              :select-mode="selectMode"
              @row-clicked="onRowClicked"
              @row-selected="onRowSelected"
              :per-page="perPage"
              :current-page="tableConfig.currentPage"
              @change="pageChange"            
              ref="selectTable"
             
              >
                  <template v-slot:table-caption>
                      <b-pagination
                      v-model="tableConfig.currentPage"
                      :total-rows="tableConfig.totalRows"
                      :per-page="tableConfig.perPage"
                      @change="pageChange"
                      align="right"
                      size="sm"
                      class="my-0"
                      first-text="<<"
                      prev-text="<"
                      next-text=">"
                      last-text=">>"
                      
                      >
                      </b-pagination>

                  </template>
                         
                   <template v-slot:cell(selectcolumn)="{item}">
                    <template v-if="isSelected(item)">
                      <span aria-hidden="true">&check;</span>
                      <span class="sr-only">Selected</span>
                    </template>
                    <template v-else>
                      <span aria-hidden="true">&nbsp;</span>
                      <span class="sr-only">Not selected</span>
                    </template> 
                  </template>                                                        
                  <template v-slot:cell(opcolumn)="data">
                          <slot name="diyColumn" v-bind="{data}">
                          </slot>
                  </template>

                  <template v-slot:cell(editColumn)="data">
                     <slot name="diyColumn2" v-bind="{data}">
                    </slot>
                  </template>

                  <template v-slot:cell(editColumn2)="data">
                     <slot name="diyColumn3" v-bind="{data}">
                    </slot>
                  </template>

                   <template v-slot:cell(editColumn3)="data">
                     <slot name="diyColumn4" v-bind="{data}">
                    </slot>
                  </template>  

                  <template v-slot:cell(editColumn4)="data">
                     <slot name="diyColumn5" v-bind="{data}">
                    </slot>
                  </template>

                   <template v-slot:cell(editColumn5)="data">
                     <slot name="diyColumn6" v-bind="{data}">
                    </slot>
                  </template>  

                  <template v-slot:foot(footCloumn1)="data">
                    <slot name="footColumn1" v-bind="{data}">
                    </slot>
                  </template>  
                  <template v-slot:foot(footCloumn1)="data">
                    <slot name="footColumn1" v-bind="{data}">
                    </slot>
                  </template>
                  <!--詳細內容-->
                  <template v-slot:row-details="data">
                    <slot name="detailsRow" v-bind="{data}">
                    </slot>

                  </template>                 


              </b-table>  
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <slot name="selectButton">

            </slot>
          </b-col>
        </b-row>

      </b-container>

      <template v-slot:modal-title class="font">
        <div class="font title">
            {{modal_titel}}
        </div>
      </template> 
      <div slot="modal-footer" class="w-100 font" >
        <b-container>
          <b-row>
            <b-col cols="2" style="text-align:left">
                <b-button
                  variant="danger"
                  size="md"
                  class="float-left"
                  :disabled="cancelDisabled"
                  @click="closeDialog"
                  >
                    關閉
                </b-button>
            </b-col>
            <b-col cols="8" style="text-align:center">
                <b-alert
                  :show="dismissCountDown"
                  dismissible
                  :variant="alert_variant"
                  @dismissed="dismissCountDown=0"
                  @dismiss-count-down="countDownChanged"
                >
                  {{alert_text}} {{ dismissCountDown }} seconds...
                </b-alert>
            
            </b-col>
            <b-col cols="2" style="text-align:right">
                <slot name="okbutten">
                  
                </slot>
            </b-col>
            </b-row>
          </b-container>
        </div>

  </b-modal>
</div>
</template>
<script>
export default {
  name:"publicDialogTable",
  data(){
    return{
      modal_titel:"",
      isAoutoClose:false,//手動關閉標志。
      isHideCloseButten:true,
      cancelDisabled:false,
      cancelText:"Cancel",
      alert_text:"",
      alert_variant:"",
      dismissSecs: 5,
      dismissCountDown: 0,
      dialogSize:"md",
      tableColumns:[],
      tableRows:[], 
      tableConfig:{
                sortBy:"",
                sortDesc:false,
                totalRows:0,
                currentPage:1,
                perPage: 5,
                pageOptions: [5, 10, 15],
                title:"",
                search:"",
                isDisable:0,
                totalPage:0
      },
      opTableColumn:"",
      myModalDialog:"ModalDialog",
      selectMode:"multi",
      isSelectAll:0,
      perPage:0,//用於是否使用表的自動分頁功能
      isPageChange:false
    }
  },
  methods:{
    //打開對話框前
    beforeOpen (e) {  

       this.initData()
       this.$parent.beforeOpen(e)//調用父窗體的方法，用來處理不同窗體特有的處理
    },

    initData(){
       this.isAoutoClose=false//設置為手動關閉標識（false:手動關閉）
       this.cancelDisabled=false//禁用Cancel制標識
       this.isHideCloseButten=false//顯示關閉制標識
       this.dismissCountDown=0//初始化提示的顯示
       this.perPage=5//初始化是否自動分頁標識（0：自動分頁 >0：DB分頁【默認】）
       this.isPageChange=false//分頁改變標識，用於判斷是否分頁分頁而引起的查詢。
    },

    //關閉對話框前時的處理
    cardCloseDo(bvModalEvt){
          if(!this.isAoutoClose)//如果不是手動關閉即不會關閉對話框（即防止點擊背景時自動關閉）
          {
            bvModalEvt.preventDefault()
              return
          }
          this.initData()//初始化數據
          

      },
      //手動關閉對話框
    closeDialog(){

          this.isAoutoClose=true//標志為手動關閉。
          this.$root.$emit('bv::hide::modal', this.myModalDialog)
      },


    openConterl(thisParent){

          this.cancelDisabled=false
          this.isHideCloseButten=false
          thisParent.$parent.isLoading=false//關閉加載頁面
          thisParent.isSaveDisabled=false//啟用保存制
          thisParent.saveText="保存"//保存制保存的字樣
                            
      },

    closeControl(thisParent){
          this.isHideCloseButten=true
          this.cancelDisabled=true
          thisParent.$parent.isLoading=true//啟動加載頁面
          thisParent.saveText="Saveing..."//保存制正在保存中的字樣
          thisParent.isSaveDisabled=true//禁用保存制

        },
    saveData(controlDialog,saveLink,saveData){
            let self=this
            this.closeControl(controlDialog)//調用公用窗體的confirmData方法，用禁用相關的按鈕。     
            
            //獲取安全Cookies
            let securityID=this.getSecurityID()
            let websiteCode=this.getWebsiteCode()
            if(Object.prototype.toString.call(saveData)=="[object FormData]")
            {
              saveData.append("website_code", websiteCode)//公共參數
              saveData.append("security_id", securityID)//公共參數
            }else{
              saveData.website_code=websiteCode
              saveData.security_id=securityID

            }
            this.$http.post(saveLink,
                            saveData)
                          .then(function(response){
                              if(response.data.code>0)
                              {
                                self.showAlert(response.data.msg,"success")
                                

                              }
                              else{
                                self.showAlert(response.data.msg,"danger")

                              }

                              self.openConterl(controlDialog)//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                              controlDialog.parentTable.textSearch()

                          })
                          .catch(function(error){
                              //console.log(error)
                              self.showAlert(error,"danger")
                              self.openConterl(controlDialog)//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                              controlDialog.parentTable.textSearch()
                          })

        },


    countDownChanged(dismissCountDown) {
          this.dismissCountDown = dismissCountDown
        },
    showAlert(showText,showVariant) {
          this.dismissCountDown = this.dismissSecs
          this.alert_text=showText
          this.alert_variant=showVariant
        },
    badingData(publicTable){
          let self=this
          let searchLink=publicTable.searchLink
          let searchData=publicTable.searchData
          publicTable.$parent.isLoading=true
          
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
          //當加載數據時，如果不是改變當前頁時的即將當前頁還原為第一頁。解決查詢數據時當前頁沒有改變的問題。
          if(!this.isPageChange){
              self.tableConfig.currentPage=1            
          }
          this.isPageChange=false
          searchData.security_id=securityID
          searchData.website_code="WEB01"
          searchData.page=self.tableConfig.currentPage
          searchData.num_of_page=self.tableConfig.perPage,          
          this.$http.post(searchLink,searchData)
                      .then(function(response){
                          let res=response.data
                          self.tableRows = res.data
                          publicTable.$parent.isLoading=false
                          self.tableConfig.totalPage=res.total_page
                          self.tableConfig.totalRows=res.records

                      })
                      .catch(function(){
                          //console.log(error);
                          publicTable.$parent.isLoading=false
                      })
       },
    rowClass(item) {
         return this.$parent.rowClass(item)
       },

    pageChange (page) {
      this.tableConfig.currentPage = page;
      this.isPageChange=true
      //如果不是自動分頁，則需要從DB獲取數據
      if(this.perPage===0){       
        this.$parent.textSearch(); 
      }

      },       
// 處理已選擇行的記錄。刪除已選擇行的記錄
    onRowClicked(item){
         this.$parent.onRowClicked(item)
      },
// 處理已選擇行的記錄。保存已選擇行的記錄
    onRowSelected(items){
         this.$parent.onRowSelected(items)
      },

  //處理已選行的樣式，已選擇則顯示√，否則顯示不顯示     
    isSelected(citem){       
        return this.$parent.isSelected(citem)
      },   
    selectAll(){
        this.$refs.selectTable.selectAllRows()
      },
    unSelectAll(){
        this.$refs.selectTable.clearSelected()
      },
    selectRow(index){
        this.$refs.selectTable.selectRow(index)
      },
    unselectRow(index){
        this.$refs.selectTable.unselectRow(index)
      },
    isRowSelected(index){
        return this.$refs.selectTable.isRowSelected(index)

      },
    getSecurityID(){
           let securityID=""
          if(self.$cookies.isKey("security_id")) {
              securityID = self.$cookies.get("security_id")
          }
          else {
              // 轉至「登入」頁面
              self.$router.replace("/login")
              
          }
          return securityID

    },
    getWebsiteCode(){
      return "WEB01"
    }  

  },

  
}
</script>
<style lang="css" scoped>
    /* For modal */
    @import url(
        "https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap&subset=chinese-traditional"
    );

    .font {
        font-family: "Noto Sans TC", sans-serif;
    }

    .label {
        font-size: 20px;
    }

    .title {
        font-size: 30px;
    }
</style>