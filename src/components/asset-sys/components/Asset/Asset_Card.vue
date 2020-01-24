<template>
  <div class="mt-4">
        <publicDialog ref="child" >           
            <template v-slot:body>
                <b-card     
                    no-body
                    style="max-width: 30rem;"

                >
                    <template v-slot:header>
                        <b-container>
                            <b-row>
                                <b-col>
                                    資產圖片
                                </b-col>
                                <b-col>
                                    QR Code
                                </b-col>
                            </b-row>
                            <b-row>
                                <!-- <b-col><b-img src="https://placekitten.com/380/200" v-bind="assetImg" ></b-img></b-col>
                                <b-col><b-img :src="assetData.qrCode" alt="Image" v-bind="assetQRCode"></b-img></b-col> -->
                                <b-col>
                                    <b-img v-bind="assetImg" ></b-img>
                                </b-col>
                                <b-col>
                                    <b-img v-bind="assetQRCode"></b-img>
                                </b-col>                               
                            </b-row>
                        </b-container>
                    </template>
                    <b-card-body>
                        <b-card-title>{{assetData.assetCode}}</b-card-title>
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
                    <!-- <b-card-footer>
                       <h5> QR Code</h5>
                    </b-card-footer>
                     <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom></b-card-img> 
                    <b-card-img :src="assetData.qrCode" alt="Image" bottom></b-card-img> -->

                </b-card>
            </template>
        </publicDialog>
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
                
            }

            
            

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
                width: 30,
                height: 30,
                class: 'my-3',
                src:"https://picsum.photos/300/300/?image=41",
                thumbnail:true

            },
            this.assetQRCode={
                center: true,
                fluidGrow: true,
                width: 30,
                height: 30,
                class: 'my-3',
                src:this.assetData.qrCode,
                thumbnail:true
            }
        }
    },
    mounted(){
        this.$refs.child.modal_titel="資產資訊"
    }
}
</script>
<style>
.descCol{
    border: 3px solid;
    border-color:lavenderblush
}
</style>