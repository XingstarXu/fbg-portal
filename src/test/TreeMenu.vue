<template>
    <div class="tree-menu">
        <!-- <div :style="indent" @click="toggleChildren">{{label}}</div> -->
        
         <b-nav-item 
         :style="indent" 
         @click="toggleChildren"
         class="topnav"
         > {{ label }}
        </b-nav-item>

        <template v-if="showChildren || isRoot"> 
            <tree-menu 
            v-for="(node,index) in nodes"
            :nodes="node.nodes"
            :label="node.label"
            :depth="node.depth"
            :key="index"
            >
            {{showChildren || isRoot}}
            </tree-menu>
        </template>
    </div>

</template>
<script>

export default {
    name :"tree-menu",
    props:['label','nodes','depth','isRoot'],
    data(){
        return {
            showChildren:false
        }


    },
    components:{
    },
    computed:{
        indent(){
           return { transform:`translate(${this.depth * 50 }px) `}
        }
    },
    methods:{
        toggleChildren(){
            this.showChildren=!this.showChildren
        }
    }
    
}
</script>
<style scoped>
.topnav a:hover {
  border: 3px solid yellow;
}

.topnav a.active {
  border: 3px solid red;
}
</style>