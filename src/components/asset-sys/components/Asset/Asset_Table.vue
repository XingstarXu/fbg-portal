<template>
    <div>
        <publicTable ref="child">
            <template v-slot:searchAdd>
                <b-container fluid>
                    <b-row>
                        <b-col>
                            <b-input-group prepend="搜索" class="md-3">
                                <b-form-input v-model="searchText">
                                </b-form-input>
                                <b-input-group-append>
                                    <b-button variant="outline-success" @click="textSearch">
                                       Search
                                    </b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-col>
                    </b-row>
                </b-container>
            </template>
            <template v-slot:buttenAdd>
              <b-button variant="success" align="right" @click="goToPrint">
                   <font-awesome-icon icon="plus-square" />
                   打印列表
               </b-button>
            </template>
            <template v-slot:diyColumn="myItem">
                <b-button @click="showCard(myItem.data.item)" variant="info"><font-awesome-icon icon="info-circle" /></b-button>
            </template>            
        </publicTable>
        
    </div>
</template>
<script>

export default {
    data(){
        return{
            rows:[],
            columns:[
                {
                    label:"資產編號",
                    key:"asset_code",
                    sortable:true
                },
                {
                    label:"項目名稱",
                    key:"item_desc2"
                },
                {
                    label:"現存倉庫",
                    key:"warehouse_desc2"
                },
                {
                    label:"供應商",
                    key:"vendor_desc2"
                },
                {
                    label:"狀態",
                    key:"void"
                },
                {
                    label: "操作",
                    key: "opColumn",
                },

            ],
            searchText:"",
            searchLink:"",
            searchData:{}

        }

    },
    methods:{
        showCard(item){
            this.$parent.$refs.asCard.setData(item)
            this.$bvModal.show("ModalDialog")
        },
        textSearch(){
            let security_id=""
            if(this.$cookies.isKey("security_id")){
                security_id=this.$cookies.get("security_id")
            }
            else{
                this.$router.replace("/login")
            }

            this.searchLink=this.$parent.searchLink
            this.searchData={
                "website_code":"WEB01",
                "security_id" : security_id,
                "warehouse_id":"",
                "page" : this.$refs.child.config.currentPage,
                "num_of_page" : this.$refs.child.config.perPage,
                "search" : this.searchText,
                "void" : -1,
                "order_by" : "",
                "order_desc" : false               

            }
            this.$refs.child.badingData(this);
        },
        rowClass(item){
            if(!item) return
            if(item.void==1){
                return "table-danger"
            }
        },
        goToPrint(){
            this.$parent.$refs.asCard.setDataList(this.$refs.child.rows)
            this.$bvModal.show("ModalDialog")
        }

    },
    components:{

    },
    mounted:function(){
        this.$refs.child.columns=this.columns
        this.$refs.child.config.title="資產資訊"
        this.textSearch()

    }
}
</script>