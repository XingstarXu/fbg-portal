<template>
    <div class="tree-menu">
        <!-- <div :style="indent" @click="toggleChildren">{{label}}</div> -->
        
         <b-nav-item 
         :style="indent" 
         @click="toggleChildren"
         :class="myClass"
         :to="to"        
         > 
         <font-awesome-icon v-if="isFolder" :icon="showChildren?'folder-open':'folder'"/>
         <font-awesome-icon v-if="isRoot" icon="home"/>
         {{ label }}
        </b-nav-item>

        <template v-if="showChildren"> 
            <tree-menu 
            v-for="(node,index) in nodes"
            :nodes="node.nodes"
            :label="node.label"
            :depth="node.depth"
            :key="index"
            :to="node.to"
            :myClass="node.myClass"
            :isFolder="node.isFolder"
            >
            {{showChildren}}
            </tree-menu>
        </template>
    </div>

</template>
<script>

export default {
    name :"tree-menu",
    props:['label','nodes','depth','isRoot','to','myClass','isFolder'],
    data(){
        return {
            showChildren:false,
            itemList: [],
        }


    },
    components:{
    },
    computed:{
        indent(){
           return { transform:`translate(${this.depth * 30 }px) `}
        }
    },

    methods:{
        toggleChildren(){
            this.showChildren=!this.showChildren
            let myRoot=this.$parent//整個樹型菜單
            let w=true
            
            //循環查找獲取整個樹型菜單
            while (w) {
                //如果找到置頂菜單或所選的菜單項是置頂菜單時即退出循環，查找結束。
                if( myRoot==undefined || myRoot.isRoot==true)
                {
                    break
                }
                myRoot= myRoot.$parent
            }
            //遍歷整個樹菜單，設置已選擇的選項。(所選項是置頂菜單除外)
            if(myRoot!=undefined){
                this.setSelectNotes(myRoot.nodes)
            }
            

        },

        //設置所選的菜單項的樣式（利用遞回遍歷整個樹型菜單）
        setSelectNotes(data){
            data.forEach(itemNode => {
                if(itemNode.nodes==undefined ){
                    if(itemNode.label==this.label){
                        itemNode.myClass='nav-item-sel'                       
                    }
                    else{
                        itemNode.myClass='nav-item'
                    }
                    return
                }else{
                    this.setSelectNotes(itemNode.nodes)
                }
                
            });

        }

    }
    
}
</script>

<style lang="css" scoped>
    #main {
        width: 100%;
        height: 100%;
    }
    .nav-item a{
        color: #FFFFFF;
        /* 刪除按 <b-nav-item> 後，出顯的兩條線 */
        outline: 0;
        border: none;

    }

    .nav-item a:hover {
        border: 3px solid #CCCCCC;
        color: #000000;
        background-color: #CCCCCC
    }

    .nav-item-sel a{
        border: 3px solid #CCCCCC;
        color: #000000;
        background-color: #CCCCCC
 
    }



</style>