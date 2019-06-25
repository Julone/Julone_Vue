import global from '@/global/global'
const srcCom = global.onlinePath;

const api = {
  srcCom: srcCom,
  getCom: srcCom + 'nav/getComment.php',
  postCom: srcCom + 'nav/postComment.php',
  replyCom: srcCom + 'nav/replyComment.php',
  changeInfo: srcCom + 'nav/setInfo.php',
  delCom: srcCom + 'nav/deleteComment.php',
  login: srcCom + 'nav/login.php',
  register: srcCom + 'nav/register.php',
  likeCom: srcCom + 'nav/likeComment.php',
  getReply: srcCom + 'nav/getReply.php',
  deleteReply: srcCom + 'nav/deleteReply.php',
  setTopCom: srcCom + 'nav/setTopCom.php',
  getUserInfo: srcCom + 'nav/getUserInfo.php',
  getUserCom: srcCom + 'nav/getUserCom.php'
}

import {
  webp,
  getStorage,
  setStorage,
  delStorage,
  Sound,
  mobile,
  pushHistory,
  blur
} from './others/methods'
const state = {
  ...api,
  replyState: false,
  menuState: false,
  infoState: false,
  isWebp: webp,
  isLogin: false,
  isMobile: false,
  innerWidth: 0,
  innerHeight: 0,
  scrollTop:0
}
const getters={
  isMobile:state => state.isMobile
}
const mutations = {
  toggleReply(state, val) {
    if(val){
      pushHistory(function(){
        state.replyState = false;
      })
    }
    state.replyState = val;
  },
  toggleMenu(state, val) {
    if (!state.isMobile) Sound('open');
    state.menuState = val;
    if(val){
      pushHistory(function(){
        state.menuState = false;
      })
    }
  },
  toggleInfo(state, val) {
    state.infoState = val;
    if(val){
      pushHistory(function(){
        state.infoState = false;
      })
    }
  },
  toggleLogin(state, val) {
    state.isLogin = val
  },
  isMobile(state,val) {
    if(val == 'pc'){
      state.isMobile = false;
    }else{
      state.isMobile = mobile();
    }
  },
  resize(state) {
    state.innerWidth = $(window).innerWidth();
    state.innerHeight = $(window).innerHeight();
  },
}
const actions = {
  blur({},val){
    console.log(arguments);
    if(val) 
    blur(true)
    else blur(false)
  },
  appStart({
    commit
  }) {
    commit('resize');
    commit('isMobile');
  },
  logOut({
    commit
  }) {
    commit('toggleLogin', false);
    delStorage('userId');
    delStorage('userPass');
    delStorage('userName');
    delStorage('userIcon');
    delStorage('isAdmin');
  },
  checkLoginIn({
    commit
  }) {
    if (!getStorage('userId') && !getStorage('userPass')) {
      commit('toggleLogin', false);
    } else {
      commit('toggleLogin', true);
    }
  },

  isLoginIn({
    commit,
    dispatch
  }, parm) {
    if (!getStorage('userId') && !getStorage('userPass')) {
      commit('toggleLogin', false);
      dispatch('blur',true)
      parm.that.$confirm(`<div class="j_confirm">
                            注册登录后,才可以继续操作!
                          </div>`, '', {
        distinguishCancelAndClose: true,
        dangerouslyUseHTMLString:true,
        confirmButtonText: '确定登录',
        cancelButtonText: '以后再说',
        customClass:'blurDialog',
        // iconClass: 'el-icon-bell',
        // cancelButtonClass: 'el-icon-close',
        // confirmButtonClass: 'el-icon-check',
        // roundButton: true,
      }).then(() => {
        parm.confirmCB()
      }).catch(() => {
        parm.cancelCB()
      }).then(e=>{
        dispatch('blur',false)
      })
    } else {
      commit('toggleLogin', true);
      parm.loginCB();
    }
  },
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})