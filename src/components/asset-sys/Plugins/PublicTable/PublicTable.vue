<template>
   <div>
        <b-container fluid class="bv-example-row">
        <b-row >
                <b-col md="12"  class="p-3 bg-info text-center" ><h3>{{this.config.title}}</h3></b-col>
        </b-row>

        <b-row class="mb-3">
            <b-col md="12" style="text-align: left">
                <slot name="searchAdd">
                </slot>
             </b-col>

        </b-row>
        <b-row class="mb-3">

                <b-col md="6" style="text-align: left">
                     <div>
                        總頁數  <b>{{config.totalPage}}</b>頁， 
                        每頁顯示 <b>{{config.perPage}}</b>條記錄，
                        總記錄數  <b>{{config.totalRows}}</b>條
                     </div>                 
                </b-col>

                <b-col md="6" style="text-align: right">
                    <b-container fluid >
                        <b-row>
                            <b-col>
                                <slot name="buttenAdd">
                                </slot>
                            </b-col>
                        </b-row>
                    </b-container>  
                </b-col>
              

        </b-row>

        <b-row class="align-content">
            <b-col md="12">
                <b-table :items="rows" :fields="columns"  
                :sort-by.sync="config.sortBy"
                :sort-desc.sync="config.sortDesc"
                sortClass="sort-icon-left"
                :tbody-tr-class="rowClass"
                no-border-collapse:true
                selectable
                select-mode="single"
                ref="publicTable"
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
                <template v-slot:cell(opColumn)="data" >
                        <slot name="diyColumn" v-bind="{data}">

                        </slot>
                        
                </template>
                <template v-slot:cell(opColumn2)="data" >
                        <slot name="diyColumn2" v-bind="{data}">

                        </slot>
                        
                </template>


                <template v-slot:cell(photoColumn)="data">
                        <slot name="photoColumn" v-bind="{data}">

                        </slot>
                </template>

                </b-table>      
            </b-col>

        </b-row>
        </b-container>
   </div>
</template>
<script>

export default {
    name:'publicTable',
    data(){
        return{
            rows:[],
            columns: [],
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
            isPageChange:false
        }
    },
    methods:{
            rowClass(item) {
                return this.$parent.rowClass(item)//調用父級的綁定數據方法，以應用不同的處理。
            },

            pageChange (page) {
                this.config.currentPage = page
                this.isPageChange=true
                this.$parent.textSearch(); //調用父級的查詢方法，以應用不同的處理。
            },

            selectRow(index){
                this.$refs.publicTable.selectRow(index)
            },
            badingData(publicTable){
                    let self=this
                    let searchLink=publicTable.searchLink
                    let searchData=publicTable.searchData
                    publicTable.$parent.isLoading=true
                    //當加載數據時，如果不是改變當前頁時的即將當前頁還原為第一頁。解決查詢數據時當前頁沒有改變的問題。
                    if(!this.isPageChange){
                        self.config.currentPage=1
                        searchData.page=self.config.currentPage
                    }
                    this.isPageChange=false
                    this.$http.post(searchLink,searchData)
                                .then(function(response){
                                    let res=response.data
                                    self.rows = res.data
                                    publicTable.$parent.isLoading=false
                                    self.config.totalPage=res.total_page
                                    self.config.totalRows=res.records

                                })
                                .catch(function(){
                                    //console.log(error);
                                    publicTable.$parent.isLoading=false
                                })



            },            

    },
    components:{

    },

}
</script>
<style lang="scss">

#columnDispay{
  display: none
}
</style>
