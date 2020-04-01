<template>
  <div class="mt-4" >
        <publicDialog ref="child" >           
            <template v-slot:body>
                <b-card     
                    no-body
                    style="max-width: 15rem;height: 30rem"

                >
                    <template v-slot:header>
                        <div id="my" class="printing">
                        <!-- <b-container>
                            <b-row>
                                <b-col md="4">
                                    <b-img v-bind="assetQRCode"></b-img>
                                </b-col>  
                                <b-col md="8">
                                    {{assetData.itemDesc2}}
                                </b-col>                              
                            </b-row>
                            
                        </b-container> -->
                        <table style="width:100%">

                            <tr>
                                <td  rowspan="2"><b-img v-bind="assetQRCode"></b-img></td>
                                <td>{{assetData.itemDesc2}}</td>                                
                            </tr>
                            <tr>
                                <td >123456</td>
                            </tr>
                            <tr>
                                <td style="height:3em"></td>
                            </tr>
                            <tr>
                                <td  rowspan="2"><b-img v-bind="assetQRCode"></b-img></td>
                                <td>{{assetData.itemDesc2}}</td>                                
                            </tr>
                            <tr>
                                <td >123456</td>
                            </tr>
                            <tr>
                                <td style="height:3em"></td>
                            </tr>
                            <tr>
                                <td  rowspan="2"><b-img v-bind="assetQRCode"></b-img></td>
                                <td>{{assetData.itemDesc2}}</td>                                
                            </tr>
                            <tr>
                                <td >123456</td>
                            </tr>
                        </table>

                        </div>
                    </template>
                </b-card>
                <button @click="print">Print this component</button>
            </template>
        </publicDialog>
  </div>
</template>
<script>
import { Printd } from 'printd'

export default {
    data(){
        return{
            d:null,
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
                left: true,
                fluidGrow: true,
                width:60,
                height:60,
                class: 'my-3'
                
            },
            cssText: `
                .printing {
                    font-family: sans-serif;
                    width: 7em;
                    height:3em;
                    border: solid 1px #ccc;
                    
                    vertical-align:top;
                    
                    margin: 3em 7em;
                }

                button {
                    background-color: #f0f0f0;
                    border: solid 1px #bbb;
                    padding: 10px;
                    font-size: 15px;
                    border-radius: 5px;
                }

                pre {
                    color: #c7254e;
                }
                `

            
            

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
                left: true,
                fluidGrow: true,
                width: 60,
                height: 60,
                class: 'my-3',
                src:this.assetData.qrCode,
                //thumbnail:true
            }
        },
        print () {
            this.d.print( document.getElementById('my'),[this.cssText])
        }
    },
    mounted(){
        this.$refs.child.modal_titel="資產資訊"
        //const { Printd } = window.printd

         this.d = new Printd()


        const { contentWindow } = this.d.getIFrame()

        contentWindow.addEventListener(
        'beforeprint', () => console.log('before print event!')
        )
        contentWindow.addEventListener(
        'afterprint', () => console.log('after print event!')
        )        
    }
}
</script>
<style>
.descCol{
    border: 3px solid;
    border-color:lavenderblush
}
.printing {
  font-family: sans-serif;
  width: 10em;
  height: 24em;
  border: solid 1px #ccc;
  text-align: center;
  vertical-align:top;
  padding: 1em;
  margin: 2em auto;
}

button {
  background-color: #f0f0f0;
  border: solid 1px #bbb;
  padding: 10px;
  font-size: 15px;
  border-radius: 5px; 
}

pre {
  color: #c7254e;
}
</style>