import updatePhoto from './update-photo'
let upload={}
upload.install=function(Vue){
    Vue.prototype.$Image=Vue.prototype.image
    Vue.prototype.$isHaveImage = function () {
        let re=false
        if (Vue.prototype.$Image!=null) {
            re=true
        } else {
            re=false
        }
        return re
      }
    Vue.component(updatePhoto.name,updatePhoto)
}
export default upload