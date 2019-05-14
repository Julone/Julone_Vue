import store from "@/store";
import router from "@/router";
import vm from '@/main'
// window.API_URL = process.env.NODE_ENV === 'production' ? 'http://julystudy.cn/' : '/navApi/';

axios.defaults.timeout = 30000
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500
}
axios.defaults.withCredentials = true
axios.interceptors.request.use(request => {
    console.log(1)
  return request
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    console.log(response)
    const status = response.status;
    const msg = response.data.msg || '未知错误,请反馈管理员'
    // let message = ;
    if(status == 500){
        vm.$toast({
            message: '连接失败, 电波无法到达',
            className: 'mytoast',
            position: 'bottom',
            duration: 2000
        });
    }else{
        if(status == 200 && response.data.code != 200){
            vm.$message({
                message: msg,
                center: true
              });
        }
        if (response.data.code == 104) {
            alert('42')
            store.dispatch('logOut');
        }
    }
    
//   const status = Number(res.status) || 200
//   const message = res.data.msg || errorCode[status] || errorCode['default']
//   if (status === 401) {
//     store.dispatch('FedLogOut').then(() => {
//       router.push({path: '/login'})
//     })
//     return
//   }

//   if (status !== 200 || res.data.code === 1) {
//     Message.error(message);
//     return Promise.reject(new Error(message))
//   }
  return response
}, error => {
  return Promise.reject(new Error(error))
})

export default axios;

