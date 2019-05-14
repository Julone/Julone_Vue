// import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import global from './global/global'

Vue.prototype.global = global

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
