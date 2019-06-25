const __publicPath = "./resource/"
Vue.prototype.publicPath = __publicPath
export const publicPath = __publicPath

const __onlinePath = process.env.NODE_ENV === 'production' ? '//julone.julystudy.cn/' : '/api/';
export const onlinePath = __onlinePath