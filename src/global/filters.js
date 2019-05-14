import {
    setTime
} from '@/others/methods'
import vm from './../main'
export default {
    install(Vue) {
        Vue.filter('timerify', function (val) {
            return setTime(val)
        }),
        Vue.filter('addFace',function(params){
            return params.replace(/«[a-zA-Z]{1,5}_56»/g, function (express) {
                return express.replace(/«/, `<img src='${vm.publicPath}face/`).replace(/»/,
                    ".gif'>")
            })
        })
        Vue.filter('removeFace',function(params){
            return params.replace(/<img src=\"[^>]{0,}face\//g, "«").replace(/.gif\">/g, "»")
        })

    }
}