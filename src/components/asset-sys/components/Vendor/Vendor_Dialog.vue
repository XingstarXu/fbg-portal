<template>
<div>
  <publicDialog ref="child" >           
          <template v-slot:body>
             <b-form-group
              label-cols-sm="4"
              label="供應商名稱(英):"
              label-align-sm="right"
              label-for="nested-street"
             >                
                 <b-form-input 
                   v-model.trim="$v.editData.vendor_desc1.$model" 
                   :class="{ 'is-invalid': $v.editData.vendor_desc1.$error,'is-valid':!$v.editData.vendor_desc1.$invalid }"
                 ></b-form-input>
                  <div class="valid-feedback" >倉庫名稱(英文)正確</div>
                 <div class="invalid-feedback">
                   <span v-if="!$v.editData.vendor_desc1.required">倉庫名稱(英文)必要的</span>
                 </div>                
             </b-form-group>

             <b-form-group
              label-cols-sm="4"
              label="供應商名稱(中):"
              label-align-sm="right"
              label-for="nested-street"
             >               
                 <b-form-input 
                   v-model.trim="$v.editData.vendor_desc2.$model"  
                   :class="{ 'is-invalid': $v.editData.vendor_desc2.$error,'is-valid':!$v.editData.vendor_desc2.$invalid }"
                 ></b-form-input>
                <div class="valid-feedback" >倉庫名稱(中文)正確</div>
                 <div class="invalid-feedback">
                   <span v-if="!$v.editData.vendor_desc2.required">倉庫名稱(中文)必要的</span>
                 </div>                  
             </b-form-group>  
             
             <b-form-group
               label-cols-sm="4"
               label="電話:"
               label-align-sm="right"
               label-for="nested-street"
             >
                <b-form-input 
                  v-model.trim="$v.editData.phone.$model"
                  :class="{'is-invalid':$v.editData.phone.$error,'is-valid':!$v.editData.phone.$invalid}"
                ></b-form-input>
                <div class="valid-feedback">電話正確</div>
                <div class="invalid-feedback">
                  <span v-if="!$v.editData.phone.required">電話是必要的</span>
                  <span v-if="!$v.editData.phone.minLength">電話長度最少8位數</span>
                </div>
             </b-form-group>

             <b-form-group
               label-cols-sm="4"
               label="郵箱:"
               label-align-sm="right"
               label-for="nested-street"
             >
               <b-form-input
                  v-model.trim="$v.editData.email.$model"
                  :class="{'is-invalid' :$v.editData.email.$error,'is-valid':!$v.editData.email.$invalid}"
               ></b-form-input>

               <div class="valid-feedback">郵箱正確</div>
               <div class="invalid-feedback">
                 <span v-if="!$v.editData.email.required">郵箱是必要的</span>
                 <span v-if="!$v.editData.email.isEmail">請填寫正確的郵箱址</span>
               </div>

             </b-form-group>




             <b-form-group
             label-cols-sm="4"
             label="地址:"
             label-align-sm="right"
             label-for="nested-street"            
             >
             <b-form-textarea 
               v-model.trim="$v.editData.address.$model"
               :class="{ 'is-invalid': $v.editData.address.$error,'is-valid':!$v.editData.address.$invalid }"             
             >
             </b-form-textarea>
             <div class="valid-feedback">地址正確</div>
             <div class="invalid-feedback">
               <span v-if="!$v.editData.address.required">地址是必要的</span>
             </div>

             </b-form-group>


             <b-form-group
              label-cols-sm="4"
              label="停用:"
              label-align-sm="right"
              label-for="nested-street"
             >               
               <b-form-checkbox
                v-model="editData.disable"
                class="pt-2"
                :disabled="editDisable_Disabled"
                value=1
                unchecked-value=0
                style="text-align:left"
               ></b-form-checkbox>
               <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide variant="warning" solid>
                    <template v-slot:toast-title>
                       <div class="d-flex flex-grow-1 align-items-baseline">
                         <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
                         <strong class="mr-auto">Notice!</strong>
                       </div>
                    </template>
                     你即將會停用此供應商！如不是停用此供應商請取消這選項，否則請按繼續保存.
               </b-toast>               
                 
             </b-form-group> 



          </template>
          <template v-slot:okbutten >
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


  </publicDialog>
  <!-- {{$v}} -->

</div>
</template>
<script>
import { required, minLength, helpers } from 'vuelidate/lib/validators'
export default {
  name:"veDialog",
  data(){
    return{
      saveText:"保存",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      editData:{
        vendor_id:"",
        vendor_desc1:"",
        vendor_desc2:"",
        address:"",
        phone:"",
        email:"",
        disable:0
      },
      isDisabled:false,//控制輸入項是否可以編輯
      editDisable_Disabled:false,//停用項是否可以編輯
      operation:"",//窗體的操作類型 add:新增， update:更改
      continueSaver:false, //是否繼續保存標示
      addData:{},
      updateData:{},
      parentTable: null


      


    }
  },
  methods:{
    saveData(){
        this.$v.$touch()
        if(this.$v.$invalid){
              
              return;
        }
        else{
            if(this.editData.disable & !this.continueSaver)
            {
              this.$bvToast.show('example-toast')
              this.saveText="繼續保存"
              this.continueSaver=true
              return;
            }
            else
            {
              this.$bvToast.hide('example-toast')
              this.saveText="保存"
              this.continueSaver=false
            }
            
            this.addData={  "vendor_desc1":this.editData.vendor_desc1, 
                            "vendor_desc2":this.editData.vendor_desc2,
                            "address":this.editData.address,
                            "phone":this.editData.phone,
                            "email":this.editData.email, 
                            "create_by":"jx.xu"  
                         }
            this.updateData={
                            "vendor_id": this.editData.vendor_id, 
                            "vendor_desc1":this.editData.vendor_desc1, 
                            "vendor_desc2":this.editData.vendor_desc2,
                            "address":this.editData.address,
                            "phone":this.editData.phone,
                            "email":this.editData.email,
                            "disable":this.editData.disable, 
                            "update_by":"jx.xu"         
                            }               
            switch(this.operation)
            {
              case "add":
                this.$refs.child.saveData(this,this.$parent.addLink,this.addData)

                break;
              case "update":
                this.$refs.child.saveData(this,this.$parent.updateLink,this.updateData)
                break;


            }
        }
    },
    beforeOpen(){
      this.$v.$reset()
      this.continueSaver=false
      this.isDisabled=true;  
      this.editDisable_Disabled=false  
      this.parentTable=this.$parent.$refs.veTable   
      if(this.operation=="add")
      {
          this.editData={
            vendor_id:"",
            vendor_desc1:"",
            vendor_desc2:"",
            address:"",
            phone:"",
            email:"",
            disable:0
          }
          this.isDisabled=false 
          this.editDisable_Disabled=true 
      }

    },     
    setData(editRow){
        this.editData={
                vendor_id:editRow.vendor_id,
                vendor_desc1:editRow.vendor_desc1,
                vendor_desc2:editRow.vendor_desc2,
                address:editRow.address,
                phone:editRow.phone,
                email:editRow.email,
                disable:editRow.disable

                }
     }

  },
  components:{
  },
  mounted(){
    this.$refs.child.modal_titel="供應商管理"
  },
  validations: {
    editData: {
      vendor_desc1:{
        required
      },
      vendor_desc2:{
        required
      },  
      address:{
        required
      },
      phone:{
        required,
        minLength:minLength(8)
      },
      email:{
        required,
        isEmail: helpers.regex('alpha', /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/)
      },
                      
    },


  }
  
}
</script>