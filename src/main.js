import App from './App'
import router from './router'
import store from './store'
import {setTime} from '@/others/methods'

Vue.filter('timerify',function(val){
    return setTime(val)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
