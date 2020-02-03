import Vue from "vue"
import App from "./App.vue"
import router from "./router"

Vue.config.productionTip = false

// 導入及註冊 bootstrap-vue
import BootstrapVue from "bootstrap-vue"
Vue.use(BootstrapVue)
// 導入 bootstrap 及 bootstrap-vue 的 CSS 檔案
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

//導入search select 插件樣式
import 'vue-search-select/dist/VueSearchSelect.css'

//導入插件
import publicDialog from './components/asset-sys/Plugins/PublicDialog/index.js'
import publicTable from './components/asset-sys/Plugins/PublicTable/index.js'
import publicUpload from './components/asset-sys/Plugins/PublicUpload/index.js'
Vue.use(publicDialog)
Vue.use(publicTable)
Vue.use(publicUpload)

//導入驗證
import vuelidate from 'vuelidate'
Vue.use(vuelidate)


// Axios
import axios from "axios"
import VueAxios from "vue-axios"
Vue.use(VueAxios, axios)

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
    faUserCircle,
    faFilePdf,
    faSearch,
    faFileExcel,
    faPlusSquare,
    faTrashAlt,
    faPen,
    faInfoCircle,
    faTimes,
    faTools,
    faBug,
    faCaretSquareRight,
    faCaretSquareLeft,
    faEdit,
    faCheck
} from "@fortawesome/free-solid-svg-icons"
library.add(
    faUserCircle,
    faSearch,
    faFilePdf,
    faFileExcel,
    faPlusSquare,
    faTrashAlt,
    faPen,
    faInfoCircle,
    faTimes,
    faTools,
    faBug,
    faCaretSquareRight,
    faCaretSquareLeft,
    faEdit,
    faCheck
);
Vue.component("font-awesome-icon", FontAwesomeIcon)

// Cookies
import VueCookies from "vue-cookies"
Vue.use(VueCookies)

// 引入伸缩效果组件
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

Vue.use(VueSidebarMenu)

new Vue({
    router,
    render: h => h(App),
}).$mount("#app")
