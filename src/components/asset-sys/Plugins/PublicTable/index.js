import publicTable from './PublicTable'
let table={}
table.install=function(Vue){
    Vue.component(publicTable.name,publicTable)
}
export default table