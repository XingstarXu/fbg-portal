<template>
  <div class="mt-4" >
        <publicDialog ref="child" >         
            <template v-slot:body>

                        <!--<div id="my" class="printing">-->
                        <!--<div ref="pdfContent" id="pdfContent">
                            <b-table :items="rows" :fields="columns"  
                            ref="printTable"
                            >
                            
                                <template v-slot:table-caption>
                                    <b-pagination
                                    v-model="config.currentPage"
                                    :total-rows="config.totalRows"
                                    :per-page="config.perPage"
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
                                
                                <template v-slot:cell(opColumn)="mydata" >
                                    
                                        <b-img v-bind="{
                                                            left: true,
                                                            fluidGrow: true,
                                                            width: 10,
                                                            height: 10,
                                                            
                                                            src:'data:image/jpeg;base64,' + mydata.item.qrcode,

                                                        }"
                                        ></b-img>
                                      
                                        
                                        
                                        
                                </template>
                                 
                            </b-table>                            
                        </div>-->
           <div id="my" class="printing">             
                        <!-- <div ref="pdfContent" id="pdfContent"> -->

                         <table >

                            <tr v-for="(item,index) in assetList" :key="index">
                                    <!--<td style="height:7em">
                                        <b-img v-bind="{
                                                            left: true,
                                                            fluidGrow: true,
                                                            width: 60,
                                                            height: 60,
                                                            class: 'my-3',
                                                            src:item.qrCode,

                                                        }"
                                        ></b-img></td>
                                    <td style="height:7em">{{item.itemDesc2}}</td>-->
                                    
                                    
                                    <td style="width:40mm height:30mm">
                                                                           
                                        <b-img v-bind="{
                                                                left: true,
                                                                fluidGrow: true,
                                                                width: 60,
                                                                height: 60,
                                                                class: 'my-3',
                                                                src:item.qrCode,

                                                            }"
                                        ></b-img>

                                    </td>
                                   

                            </tr>
                        </table>
                      
                        <!-- </div> -->
 </div> 

                    <button @click="print">Print this component</button>
                    <!--<button @click="ExportSavePdf()">PDF</button>-->
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
                    width: 40mm;
                    height: 30mm                   
                    vertical-align:top;
                    margin: 0mm 0mm;
                }

                pre {
                    color: #c7254e;
                }
                `,
                assetList:[],
                rows:[],
                columns: [
                    {
                        label:"QRcode",
                        key:"opColumn"
                    }
                ],               
                config:{
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


            
            

        }
    },
    methods:{
        beforeOpen(){
            this.badingData()
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
        },
        setDataList(itemList){
            console.log(this.itemList)
            this.assetList=[]
            itemList.forEach(item => {
                 let assetDataItem={
                        assetID:item.asset_id,
                        assetCode:item.asset_code,
                        itemDesc2:item.item_desc2,
                        warehouseDesc2:item.warehouse_desc2,
                        vendorDesc2:item.vendor_desc2,
                        modelNo:item.model_no,
                        typeDesc2:item.type_desc2,
                        unitDesc2:item.unit_desc2,
                        qrCode:"data:image/jpeg;base64,"+item.qrcode
                    }
                this.assetList.push(assetDataItem)
                
            });
            console.log(this.assetList)
            

        },

        pageChange (page) {
            this.config.currentPage = page
        },
        badingData(){
            //   //獲取安全Cookies
            //   this.searchLink=this.$parent.$parent.searchLink
            //   this.searchData={
            //               "website_code":"",
            //               "security_id":"",                    
            //               "page":1,
            //               "num_of_page":1,
            //               "search":this.$parent.search,
            //               "iso":-1,
            //               "order_by":"",
            //               "order_desc":false
            //   }
            //   this.$refs.child.tableColumns=this.columns
            //   this.$refs.child.badingData(this);//調用公用表的綁定方法

            //獲取安全Cookies
            let self=this
            let securityID=""
            if(self.$cookies.isKey("security_id")) {
                securityID = self.$cookies.get("security_id")
            }
            else {
                // 轉至「登入」頁面
                self.$router.replace("/login")
                return
            }                    
            let searchLink=this.$parent.searchLink
            let searchData={
                          "website_code":"WEB01",
                          "security_id":securityID, 
                          "warehouse_id":"",                   
                          "page":1,
                          "num_of_page":1,
                          "search":self.$parent.$refs.asTable.searchText,
                          "void" : -1,
                          "order_by":"",
                          "order_desc":false
              }
            this.$parent.$parent.isLoading=true
            searchData.security_id=securityID
            searchData.website_code="WEB01"
            searchData.page=self.config.currentPage
            searchData.num_of_page=self.config.perPage
            this.$http.post(searchLink,searchData)
                        .then(function(response){                           
                            let res=response.data
                            console.log(res)
                            self.rows = res.data
                            self.$parent.isLoading=false
                            self.config.totalPage=res.total_page
                            self.config.totalRows=res.records
                            if(response.data.code<0){
                                self.$cookies.remove("security_id")
                                self.$router.replace("/")
                                
                            }
                            
                            

                        })
                        .catch(function(error){
                            self.$parent.$parent.isLoading=false
                            if(error.data.code<0){
                                self.$cookies.remove("security_id")
                                self.$router.replace("/")
                                
                            }
                        })


        
        },

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
  height: 100%;
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