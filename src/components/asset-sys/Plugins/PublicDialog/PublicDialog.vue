<template>
<div >
  
  <b-modal id="ModalDialog" content-class="shadow" :title="modal_titel" @show="beforeOpen" @hide="cardCloseDo" 
                            @close="closeDialog" 
                            :cancel-disabled="cancelDisabled"
                            :cancel-title="cancelText"
                            :hide-header-close="isHideCloseButten"
                            :size="dialogSize"
                            header-bg-variant="primary"
                            header-text-variant="light"
                            
                            >
     <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="alert_variant"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
     >
      {{alert_text}} {{ dismissCountDown }} seconds...
     </b-alert>
     <div style="text-align:left">
        <slot name="body" ></slot>
     </div>

     <div slot="modal-footer" class="w-100" >
        <b-button
          variant="danger"
          size="md"
          class="float-left"
          :disabled="cancelDisabled"
          @click="closeDialog"
          >
            關閉
        </b-button>
        <slot name="okbutten" >
          
        </slot>
      </div>

  </b-modal>
</div>
</template>
<script>

export default {
  name:"publicDialog",
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
      dialogSize:"md"


    }
  },
  methods:{
    //打開對話框前
  beforeOpen (e) {    
       this.isAoutoClose=false;//設置為手動關閉標識（false:手動關閉）
       this.cancelDisabled=false;//禁用Cancel制標識
       this.isHideCloseButten=false;//顯示關閉制標識
       this.dismissCountDown=0;
       this.$parent.beforeOpen(e);//調用父窗體的方法，用來處理不同窗體特有的處理

    },
     //關閉對話框前時的處理
    cardCloseDo(bvModalEvt){

         if(!this.isAoutoClose)//如果不是手動關閉即不會關閉對話框（即防止點擊背景時自動關閉）
         {
             bvModalEvt.preventDefault();
             return;
         }

    },
    //手動關閉對話框
    closeDialog(){

         this.isAoutoClose=true//標志為手動關閉。
         this.$root.$emit('bv::hide::modal', 'ModalDialog')
     },

    openConterl(thisParent){

        this.cancelDisabled=false;
        this.isHideCloseButten=false;
        thisParent.$parent.isLoading=false;//關閉加載頁面
        thisParent.isSaveDisabled=false;//啟用保存制
        thisParent.saveText="保存"//保存制保存的字樣
                          
     },

    closeControl(thisParent){
         this.isHideCloseButten=true
         this.cancelDisabled=true
         thisParent.$parent.isLoading=true;//啟動加載頁面
         thisParent.saveText="Saveing...";//保存制正在保存中的字樣
         thisParent.isSaveDisabled=true;//禁用保存制

     },
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
    showAlert(showText,showVariant) {
        this.dismissCountDown = this.dismissSecs;
        this.alert_text=showText;
        this.alert_variant=showVariant;
      },

    saveData(controlDialog,saveLink,saveDate){
          let self=this;
          this.closeControl(controlDialog);//調用公用窗體的confirmData方法，用禁用相關的按鈕。         
          this.$http.post(saveLink,
                          saveDate)
                        .then(function(response){
                            if(response.data.code>0)
                            {
                              self.showAlert(response.data.msg,"success");

                            }
                            else{
                              self.showAlert(response.data.msg,"danger");

                            }

                            self.openConterl(controlDialog);//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                            controlDialog.parentTable.textSearch();

                        })
                        .catch(function(error){
                            //console.log(error);
                            self.showAlert(error,"danger");
                            self.openConterl(controlDialog);//調用公用窗體的closeConfirm方法，用啟用相關的按鈕。
                            controlDialog.parentTable.textSearch();
                        })
      },
  }
  
}
</script>