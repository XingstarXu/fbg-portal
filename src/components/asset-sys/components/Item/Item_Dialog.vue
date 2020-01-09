<template>
<div>
  <publicDialog ref="child" >           
          <template v-slot:body>

             <b-form-group 
                label-cols-sm="3"
                label="資產名稱(英):" 
                label-align-sm="right"
                label-for="nested-street"
            >
                 <b-form-input v-model.trim="$v.editData.item_desc1.$model" :class="{ 'is-invalid': $v.editData.item_desc1.$error,'is-valid':!$v.editData.item_desc1.$invalid }"></b-form-input>
                  <div class="valid-feedback" >資產名稱正確(英)</div>
                  <div class="invalid-feedback">
                      <span v-if="!$v.editData.item_desc1.required">資產名稱必要的</span>
                  </div>                
             </b-form-group>

             <b-form-group 
                label-cols-sm="3"
                label="資產名稱(中):" 
                label-align-sm="right"
                label-for="nested-street"
            >
                 <b-form-input v-model.trim="$v.editData.item_desc2.$model" :class="{ 'is-invalid': $v.editData.item_desc2.$error,'is-valid':!$v.editData.item_desc2.$invalid }"></b-form-input>
                  <div class="valid-feedback" >資產名稱正確(中)</div>
                  <div class="invalid-feedback">
                      <span v-if="!$v.editData.item_desc2.required">資產名稱必要的</span>
                  </div>                
             </b-form-group>

             <b-form-group 
                label-cols-sm="3"
                label="型號:" 
                label-align-sm="right"
                label-for="nested-street"
            >
                 <b-form-input v-model="editData.model_no"></b-form-input>             
             </b-form-group>


             <b-form-group 
                 label-cols-sm="3"
                 label="資產類型:"
                 label-align-sm="right"
                 label-for="nested-street"
                 
             >
                <!-- <b-form-select v-model.trim="$v.editData.type_id.$model" :options="options_Type"  
                :class="{ 'is-invalid': $v.editData.type_id.$error,'is-valid':!$v.editData.type_id.$invalid }" ></b-form-select> 
                
                <div class="valid-feedback" >資產類型正確</div>
                <div class="invalid-feedback">
                   <span v-if="!$v.editData.type_id.required">資產類型必要的</span>
                </div>                   -->
                <model-list-select :list="options_Type"  v-model.trim="$v.editData.type_id.$model" 
                                   :isError= $v.editData.type_id.$error                       
                                   option-value="type_id"
                                   option-text="type_desc2"
                                   >                 
                </model-list-select>

                <div v-if="$v.editData.type_id.$error" class="invalid-feedback d-block">
                   <span>資產類型必要的</span>
                </div>


             </b-form-group>

             <b-form-group 
                  label-cols-sm="3" 
                  label="資產單位:" 
                  label-align-sm="right"
                  label-for="nested-street"
             >


                 <!-- <b-form-select v-model.trim="$v.editData.unit_id.$model" :options="options_Unit" :class="{ 'is-invalid': $v.editData.unit_id.$error,'is-valid':!$v.editData.unit_id.$invalid }"></b-form-select>
                 <div class="valid-feedback" >資產單位正確</div>
                 <div class="invalid-feedback">
                   <span v-if="!$v.editData.unit_id.required">資產單位必要的</span>
                 </div>   -->

                <model-list-select :list="options_Unit"  v-model.trim="$v.editData.unit_id.$model" 
                                   :isError= $v.editData.unit_id.$error                       
                                   option-value="unit_id"
                                   option-text="unit_desc2"
                                   >                 
                </model-list-select>

                <div v-if="$v.editData.unit_id.$error" class="invalid-feedback d-block">
                   <span>資單位是型必要的</span>
                </div>


             </b-form-group>    

             <b-form-group 
                  label-cols-sm="3"
                  label="ISO:"
                  label-align-sm="right" 
                  class="mb-0"
             >
             <b-form-checkbox
                v-model="editData.iso"
                class="pt-2"
                value=1
                unchecked-value=0
             ></b-form-checkbox>

             </b-form-group> 



             <b-form-group 
                  label-cols-sm="3"
                  label="photo"
                  label-align-sm="right"
                  class="mb-0"
             >
             <div class="clearfix">
                 
                  
                  <b-img thumbnail fluid :src="photoBase64" alt="assets photo" ></b-img>
                  <b-form-file
                     v-model="photoFile"
                     :state="Boolean(photoFile)"
                     placeholder="Choose a file or drop it here..."
                     drop-placeholder="Drop file here..."
                     accept=".jpg, .png, .gif"
                     :file-name-formatter="formatNames"
                     @change="previewImage"
                  >
                  
                  </b-form-file>
                  <!-- {{editData.photoFile?editData.photoFile.name:"NULL"}} -->
                <div v-if="photoError" class="invalid-feedback d-block">
                   <span>{{photoErrorText}}</span>
                </div>

             </div>
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
import { required } from 'vuelidate/lib/validators'
import { ModelListSelect } from 'vue-search-select'
// import { saveAs } from 'file-saver'
export default {
  name:"itDialog",
  data(){
    return{
      saveText:"Save",//保存制名稱
      isSaveDisabled:false,//保存制禁用標識
      editData:{
        item_id:"",
        item_desc1:"",
        item_desc2:"",
        item_code:"",
        unit_id:"",
        type_id:"",
        model_no:"",
        iso:0,
        img:"",
        qty:0
      },
      isDisabled:false,
      operation:"",
      options_Type: [],
      options_Unit: [],
      options_Vendor: [],     
      photoPath:"/assetsPhoto/",
      photoFile:null,
      photoBase64:"",
      photoErrorText:"",
      photoError:false,
      editDisable_Disabled:false,//停用項是否可以編輯
      continueSaver:false, //是否繼續保存標示
      addData:{},
      updateData:{},
      parentTable: this.$parent.$refs.itTable

    }
  },
  methods:{
    saveData(){
        this.$v.$touch()
        if(this.$v.$invalid){
              
              return
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

            this.addData={   "item_desc1":this.editData.item_desc1, 
                             "item_desc2":this.editData.item_desc2, 
                             "qty":this.editData.qty, 
                             "unit_id":this.editData.unit_id, 
                             "type_id":this.editData.type_id, 
                             "model_no":this.editData.model_no, 
                             "img":this.editData.img, 
                             "iso":this.editData.iso,
                             "create_by":"jx.xu" 
                         }
            this.updateData={
                              "item_id":this.editData.item_id,
                              "item_desc1":this.editData.item_desc1,
                              "item_desc2":this.editData.item_desc2, 
                              "item_code":this.editData.item_code,
                              "qty":this.editData.qty, 
                              "unit_id":this.editData.unit_id, 
                              "type_id":this.editData.type_id, 
                              "model_no":this.editData.model_no, 
                              "img":this.editData.img, 
                              "iso":this.editData.iso,
                              "update_by":"jx.xu"        
                            }   
           // if(this.photoFile){
          //       var fn=this.photoFile.name;
          //       //fn=response.data.item_code+fn.substring(fn.indexOf("."))
          //       fn="/assetsPhoto/"+'test.jpg'
          //       var FileSaver = require('file-saver');
          //       FileSaver.saveAs(this.photoFile, fn);

          // }                           
                            
            switch(this.operation)
            {
              case "add":
                this.$refs.child.saveData(this,this.$parent.addLink,this.addData)
                //self.savePhoto()

                break;
              case "update":
                this.$refs.child.saveData(this,this.$parent.updateLink,this.updateData)
                //self.savePhoto()
                break;


            }
        }
    },

    beforeOpen(){
      this.$v.$reset()
      this.continueSaver=false
      this.isDisabled=true
      this.$parent.isLoading=false
      this.editDisable_Disabled=false
      //this.parentTable=this.$parent.$refs.itTable 
      if(this.operation=="add")
      {
          this.editData={
                          item_id:"",
                          item_desc1:"",
                          item_desc2:"",
                          item_code:"",
                          unit_id:"",
                          type_id:"",
                          model_no:"",
                          iso:0,
                          img:"1000006.jpg",
                          qty:0

                        }
          this.isDisabled=false
          this.editDisable_Disabled=true
      }
      //靜態資源文件需要放在public文件夾中才能動態讀取到。
      this.photoPath="/assetsPhoto/"+this.editData.img
      this.photoBase64=this.photoPath
      this.getType()
      this.getUnit()


    },
     
    getType(){
      let self=this
      this.$http.post(this.$parent.getTypeLink,{"disable":0}
                    )
                    .then(
                      function(response){
                        let res=response.data
                        
                        self.options_Type=res.data


                      }
                    )
                    .catch(
                      function(error){
                        console.log(error)
                      }
                    )
    },
    getUnit(){
      let self=this
      this.$http.post(this.$parent.getUnitLink,{"disable":0}
                    )
                    .then(
                      function(response){
                        let res=response.data                      
                        self.options_Unit=res.data

                      }
                    )
                    .catch(
                      function(error){
                        console.log(error)
                      }
                    )
    },

    setData(editRow){
                this.editData={
                          item_id:editRow.item_id,
                          item_desc1:editRow.item_desc1,
                          item_desc2:editRow.item_desc2,
                          item_code:editRow.item_code,
                          unit_id:editRow.unit_id,
                          type_id:editRow.type_id,
                          model_no:editRow.model_no,
                          iso:editRow.iso,
                          img:editRow.img,
                          qty:editRow.qty

                        }

    },
    formatNames(files){
      if(files.length===1){
        return files[0].name
      }else{
        return 'NewAssetsPhoto'
      }

    },
    //上傳文件時，自動顯示所上傳的文件圖片
    previewImage(ev){
      let _this = this
      var input=ev.target
      if(input.files && input.files[0]){
          if (input.files[0].size/(1024*1024) >1) 
          { 
            _this.photoErrorText="上傳的圖片不可大於5M！" 
            _this.photoError=true
            return false
          }
          console.log(input.files[0])
          console.log(input.files[0].name.substring(input.files[0].name.indexOf(".")))
           var reader = new FileReader()
           reader.onload = function (e) { 
                  var base64 = e.target.result 
                  _this.photoBase64 = base64
                 }
           reader.readAsDataURL(input.files[0])
      }

    },

    //**待測試是否可以上傳文件到指定路徑**
    savePhoto(){
      let self=this;
      let formData=new FormData()
      formData.append("attachment",this.photoFile)
      var url="assetsPhoto"
      this.$http.post(url,formData,{
        headers:{'Content-Type':'multipart/form-data'}
      }).then(function(){
        self.$refs.child.shoAlert("Photo saveed success!","success")


      }).catch(function(error){
          self.$refs.child.showAlert(error,"danger")        
      })
    },
    setModalDialogName(strName){
       this.$refs.child.myModalDialog=strName
     },
 
  },
  components:{
    ModelListSelect
  },
  mounted(){
    this.$refs.child.modal_titel="資產管理"
  },
  validations: {
    editData: {
      item_desc1:{
          required,
         },
      item_desc2:{
        required
      },
      type_id:{
        required
      },
      unit_id:{
        required
      }
      

    },

  }
  
}
</script>