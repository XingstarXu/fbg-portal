<template lang="html">
  <div class="action" id="app">
                <b-card     
                    no-body
                    style="max-width: 50rem;"
                >
                    <template v-slot:header>
                        <b-container>
                            <b-row>
                                <b-col>
                                    資產圖片
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-img v-bind="assetImg" ></b-img>
                                </b-col>                            
                            </b-row>
                        </b-container>
                    </template>
                    <b-card-body>
                        <b-card-title>資產編號:{{assetData.assetCode}}</b-card-title>
                        <b-card-text>
                            <b-container class="text-light" >
                                <b-row class="disRow">
                                    <b-col cols="4" class="p-3 bg-info descCol" >項目名稱:</b-col>
                                    <b-col cols="8" class="p-3 bg-success descCol" >{{assetData.itemDesc2}}</b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="4" class="p-3 bg-info descCol">型號:</b-col>
                                    <b-col cols="8" class="p-3 bg-success descCol">{{assetData.modelNo}}</b-col>
                                </b-row>    
                                 <b-row>
                                    <b-col cols="4" class="p-3 bg-info descCol">類型:</b-col>
                                    <b-col cols="8" class="p-3 bg-success descCol">{{assetData.typeDesc2}}</b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="4" class="p-3 bg-info descCol">單位:</b-col>
                                    <b-col cols="8" class="p-3 bg-success descCol">{{assetData.unitDesc2}}</b-col>
                                </b-row>                                                               
                                 <b-row>
                                    <b-col cols="4" class="p-3 bg-info descCol">現存倉庫:</b-col>
                                    <b-col cols="8" class="p-3 bg-success descCol">{{assetData.warehouseDesc2}}</b-col>
                                </b-row>
                                <b-row>
                                    <b-col cols="4" class="p-3 bg-info descCol">供應商:</b-col>
                                    <b-col cols="8" class="p-3 bg-success descCol">{{assetData.vendorDesc2}}</b-col>
                                </b-row> 
                               

                                                                                                                            
                            </b-container>

                        </b-card-text>
                    </b-card-body>
                </b-card>
  </div>
</template>
<script>
export default {
    data(){
        return{
            assetData:{
                qrCode:"" //需要先初始化qrCoder值,因為src的值不能為null.
                },
            assetImg: {
                center: true,
                fluidGrow: true,
                width: 30,
                height: 30,
               
            },
            assetQRCode: {
                center: true,
                fluidGrow: true,
                width: 30,
                height: 30,
                class: 'my-3'
                
            },
        
            

        }
    },
    methods:{
        beforeOpen(){

        },
        setData(assetItem){
            this.assetData={
                assetID:assetItem.asset_id,
                assetCode:assetItem.asset_code,
                itemDesc2:assetItem.item_desc2,
                warehouseDesc2:assetItem.warehouse_desc2,
                vendorDesc2:assetItem.vendor_desc2,
                modelNo:assetItem.model_no,
                typeDesc2:assetItem.type_desc2,
                unitDesc2:assetItem.unit_desc2,
                qrCode:"data:image/jpeg;base64,"+assetItem.qrcode
            }
            this.assetImg={
                center: true,
                fluidGrow:true,
                width: 20,
                height: 20,
                class: 'my-3',
                src:"https://picsum.photos/300/300/?image=41",
                thumbnail:true

            }
        },
        badingData(){
            let asset_id= this.$route.params.id
            
            let searchLink="http://192.168.12.26:9090/asset-sys/asset-info/"+asset_id+"/"
            let searchData={}
            let sef=this
            this.$http.post(searchLink,searchData)
            .then(function(response){
                let res=response.data
                if(res.data.length>0){
                   sef.setData(res.data[0])
                   sef.$bvModal.show("ModalDialog")
                }

            })
            .catch(function(error){
                console.log(error)
            })
        }
    },
    mounted(){
        this.badingData()
        
        
    }
}
</script>
<style>
.descCol{
    border: 3px solid;
    border-color:lavenderblush
}
.action {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
</style>