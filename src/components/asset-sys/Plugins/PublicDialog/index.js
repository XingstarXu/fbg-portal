import publicDialog from './PublicDialog'
import publicDialogTable from './PublicDialogTable'
import publicDelete from './PublicDelete'
let dialog={}
dialog.install=function(Vue){
    Vue.component(publicDialog.name,publicDialog)
    Vue.component(publicDialogTable.name,publicDialogTable)
    Vue.component(publicDelete.name,publicDelete)
}
export default dialog