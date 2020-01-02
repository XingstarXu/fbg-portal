<template>
<div>
  <publicDialog ref="child" >           
          <template v-slot:body>
            <b-form-group
              label-cols-sm="4"
              label="倉庫編號:"
              label-align-sm="right"
              label-for="nested-street"
            >               
                 <b-form-input v-model.trim="$v.editData.warehouse_code.$model" :disabled="isDisabled" 
                    :class="{ 'is-invalid': $v.editData.warehouse_code.$error,'is-valid':!$v.editData.warehouse_code.$invalid }"
                    @input="setCode($event)"
                     ></b-form-input>
                 <div class="valid-feedback" >倉庫編號正確</div>
                 <div class="invalid-feedback">
                   <span v-if="!$v.editData.warehouse_code.required">倉庫編號是必須的</span>
                   <span v-if="!$v.editData.warehouse_code.isUnique">倉庫號已存</span>
                   <span v-if="!$v.editData.warehouse_code.minLength | !$v.editData.warehouse_code.maxLength">倉庫編號長度必需為{{$v.editData.warehouse_code.$params.minLength.min}} 至 {{$v.editData.warehouse_code.$params.maxLength.min}}位</span>
                 </div>
                 

             </b-form-group>
             <b-form-group
              label-cols-sm="4"
              label="倉庫名稱(英):"
              label-align-sm="right"
              label-for="nested-street"
             >                
                 <b-form-input v-model.trim="$v.editData.warehouse_desc1.$model" :class="{ 'is-invalid': $v.editData.warehouse_desc1.$error,'is-valid':!$v.editData.warehouse_desc1.$invalid }"></b-form-input>
                  <div class="valid-feedback" >倉庫名稱(英文)正確</div>
                 <div class="invalid-feedback">
                   <span v-if="!$v.editData.warehouse_desc1.required">倉庫名稱(英文)必要的</span>
                 </div>                
             </b-form-group>

             <b-form-group
              label-cols-sm="4"
              label="倉庫名稱(中):"
              label-align-sm="right"
              label-for="nested-street"
             >               
                 <b-form-input v-model.trim="$v.editData.warehouse_desc2.$model"  :class="{ 'is-invalid': $v.editData.warehouse_desc2.$error,'is-valid':!$v.editData.warehouse_desc2.$invalid }"></b-form-input>
                <div class="valid-feedback" >倉庫名稱(中文)正確</div>
                 <div class="invalid-feedback">
                   <span v-if="!$v.editData.warehouse_desc2.required">倉庫名稱(中文)必要的</span>
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
               ></b-form-checkbox>
               <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide variant="warning" solid>
                    <template v-slot:toast-title>
                       <div class="d-flex flex-grow-1 align-items-baseline">
                         <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
                         <strong class="mr-auto">Notice!</strong>
                       </div>
                    </template>
                     你即將會停用此倉庫！如不是停用此倉庫請取消這選項，否則請按繼續保存.
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
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name:"shDialog",
  data(){
    return{
      saveText:"保存",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      editData:{
        warehouse_id:"",
        warehouse_code:"",
        warehouse_desc1:"",
        warehouse_desc2:"",
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
            
            this.addData={  "warehouse_code":this.editData.warehouse_code, 
                            "warehouse_desc1":this.editData.warehouse_desc1, 
                            "warehouse_desc2":this.editData.warehouse_desc2, 
                            "create_by":"jx.xu"
                         }
            this.updateData={
                            "warehouse_id": this.editData.warehouse_id,
                            "warehouse_code":this.editData.warehouse_code, 
                            "warehouse_desc1":this.editData.warehouse_desc1, 
                            "warehouse_desc2":this.editData.warehouse_desc2, 
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
      this.isDisabled=true  
      this.editDisable_Disabled=false
      this.parentTable=this.$parent.$refs.shTable      
      if(this.operation=="add")
      {
          this.editData={
            warehouse_id:"",
            warehouse_code:"",
            warehouse_desc1:"",
            warehouse_desc2:"",
            disable:0
          }
          this.isDisabled=false 
          this.editDisable_Disabled=true 
      }
    },
  

      // 封装axios请求，返回promise, 用于驗證是否唯一。
    getCodeUnique (data) {
      return new Promise((resolve, reject) => {
        this.axios.post(this.$parent.checkCodeUnique, {
          "warehouse_code":data
        }).then((res) => {
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    },

    setCode(value){
      this.editData.warehouse_code=value.toUpperCase();

    },
    setData(editRow){
                  this.editData={
                          warehouse_id:editRow.warehouse_id,
                          warehouse_code:editRow.warehouse_code,
                          warehouse_desc1:editRow.warehouse_desc1,
                          warehouse_desc2:editRow.warehouse_desc2,
                          disable:editRow.disable

                          }
    }

  },
  components:{

  },
  mounted(){
    this.$refs.child.modal_titel="倉庫管理"
  },
  validations: {
    editData: {
      warehouse_code:{
          required,
          minLength: minLength(1),
          maxLength: minLength(3),
          async isUnique (value) {//驗證是否唯一
            let se=this
            let isCodeUnique=false
            if (value === '') return true
            try {
              let res = await se.getCodeUnique(value)

              // 等拿到返回数据res后再进行处理
              if(res.data.res==0 | se.operation=="update")
              {
                isCodeUnique=true  
              }
              else
              {
                isCodeUnique=false 
              }
             
           } catch (err) {
             //console.log(err)
             isCodeUnique=true
           
           } 
            return Boolean(isCodeUnique)

          }
         },
      warehouse_desc1:{
        required
      },
      warehouse_desc2:{
        required
      }      
    },


  }
  
}
</script>