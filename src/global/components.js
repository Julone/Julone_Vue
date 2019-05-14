import appfoot from './../components/Footer'
import getTop from './../components/Common/Top'
export default{
    install(Vue){
        Vue.component('appfoot',appfoot);
        Vue.component('getTop',getTop)
    }
}
