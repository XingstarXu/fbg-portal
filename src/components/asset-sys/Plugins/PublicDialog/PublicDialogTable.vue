<template>
<div>
  
  <b-modal :id="myModalDialog" content-class="shadow" :title="modal_titel" @show="beforeOpen" @hide="cardCloseDo" 
                            @close="closeDialog" 
                            :cancel-disabled="cancelDisabled"
                            :cancel-title="cancelText"
                            :hide-header-close="isHideCloseButten"
                            :size="dialogSize"
                            header-bg-variant="primary"
                            header-text-variant="light"
                            >

      <b-container class="bv-example-row">
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

     <div slot="modal-footer" class="w-100" >
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
    }
  },
  methods:{
    //打開對話框前
    beforeOpen (e) {  
       this.isAoutoClose=false//設置為手動關閉標識（false:手動關閉）
       this.cancelDisabled=false//禁用Cancel制標識
       this.isHideCloseButten=false//顯示關閉制標識
       this.$parent.beforeOpen(e)//調用父窗體的方法，用來處理不同窗體特有的處理
       this.dismissCountDown=0//初始化提示的顯示
       
    },
      //關閉對話框前時的處理
    cardCloseDo(bvModalEvt){
          if(!this.isAoutoClose)//如果不是手動關閉即不會關閉對話框（即防止點擊背景時自動關閉）
          {
            bvModalEvt.preventDefault()
              return
          }

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
            let run=0
            this.closeControl(controlDialog)//調用公用窗體的confirmData方法，用禁用相關的按鈕。         
            this.$http.post(saveLink,
                            saveData)
                          .then(function(response){
                              if(response.data.code>0)
                              {
                                self.showAlert(response.data.msg,"success")
                                run=1

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
            return run
        },


    countDownChanged(dismissCountDown) {
          this.dismissCountDown = dismissCountDown
        },
    showAlert(showText,showVariant) {
          this.dismissCountDown = this.dismissSecs
          this.alert_text=showText
          this.alert_variant=showVariant
        },
    badingData(){
        //console.clear()
        this.$parent.badingData()//調用父級的綁定數據方法，以應用不同的處理。
       },
    rowClass(item) {
         return this.$parent.rowClass(item)
       },

    pageChange (page) {
        this.tableConfig.currentPage = page;
        this.$parent.textSearch(); //調用父級的查詢方法，以應用不同的處理。
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

      }

  },

  
}
</script>