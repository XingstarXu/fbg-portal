<template>
<div>
  <publicDelete ref="child" >           
          <template v-slot:body>
            <b-container>
               <b-row>
                 <b-col  lg="2">
                </b-col>
                 <b-col  lg="8">
                   <h6>是否確認刪除{{deleteData.code}}入倉單？</h6>
                 </b-col>
               </b-row>
               <b-row>
                     <b-col lg="3" style="text-align:right">
                             刪除原因:                   
                    </b-col>                     
                     <b-col lg="8" >
                                  <b-form-input v-model="$v.deleteData.void_reason.$model"  
                                                :class="{ 'is-invalid': $v.deleteData.void_reason.$error,'is-valid':!$v.deleteData.void_reason.$invalid }"
                                  ></b-form-input> 
                                   <div v-if="$v.deleteData.void_reason.$error" class="invalid-feedback d-block">
                                      <span>刪除原因是必要的</span>
                                  </div>                                                                   
                    </b-col>                   
               </b-row>
            </b-container>

              

          </template>
          <template v-slot:okbutten >
                 <b-button variant="primary"
                           size="sm"
                           class="float-right"
                           :disabled="isSaveDisabled"
                           @click="save"
                 >
                 {{saveText}}
                 </b-button>
          </template>


  </publicDelete>

</div>
</template>
<script>
import { required } from 'vuelidate/lib/validators';
export default {
  name:"shDelete",
  data(){
    return{
      saveText:"確認",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      isDisabled:false,
      deleteData:{_id:"", 
                  code:"", 
                  void_reason:""
                 },
      saveData:{},
      parentTable:null


    }
  },
  methods:{
    save(){
            this.$v.$touch();
            if(this.$v.$invalid){
               return;
            }
            this.parentTable=this.$parent.$refs.trTable
            this.saveData={_id:this.deleteData._id,
                          void_by:"jx.xu", 
                          void_reason: this.deleteData.void_reason
                          }            
            this.$refs.child.saveData(this,this.$parent.voidLink,this.saveData)
    },
    setData(deleteRow){
                this.deleteData={
                                _id: deleteRow.item.header._id,
                                code: deleteRow.item.header.code,
                                void_reason: deleteRow.item.header.void_reason
                              };
    },
 
  },
  components:{
  },
  mounted(){
    this.$refs.child.modal_titel="取消訂單"


  },
  validations: {
    deleteData: {
      void_reason:{
        required
      }
                     
    },
  }
  
}
</script>