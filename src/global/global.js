import { publicPath,onlinePath } from  './base'
import filters from './filters'
import components from './components'
import directives from './directives'
import {getStorage,getUserIcon,isAdmin} from '@/others/methods'
import store from '@/store'

Vue.use(filters);
Vue.use(components);
Vue.use(directives);

//Third Plugin
Vue.use(VueAwesomeSwiper)

export default {
    getUserIcon:getUserIcon,
    isAdmin:isAdmin,
    publicPath:publicPath,
    onlinePath:onlinePath
}

