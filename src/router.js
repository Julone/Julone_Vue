import NotFound from './views/NotFound'
import vm from './main'
import app from './App';
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: ()=>import('./views/Home.vue'), alias:['/home','/index','/index.html','/index.htm'] },
    { path: '/comment', name: 'comment', component: ()=>import('./views/Comment.vue'), meta: { closeCanvas: true } },
    { path: '/links', name: 'links', component:() => import('./views/Links.vue'), alias:['/link'] },
    { path: '/user', name: 'user', component: ()=>import('./views/User.vue'), },
    { path: '/about', name: 'about', component:() => import('./views/About.vue'), alias:['/link'], meta: { closeCanvas: true } },
    { path: '/copyright', name:'copyright', component:() => import('./views/Copyright.vue'), },
    { path: '/score', name: 'score', component: ()=>import('./views/Score.vue'), meta:{noScroll:true}},
    { path: '/more', name: 'more', component: ()=>import('./views/More.vue'),meta:{noScroll:true} },    
    { path: '/findpass', name: 'findpass', component: ()=>import('./views/FindPass.vue'), },
    { path: '/login', name: 'login', component: ()=>import('./views/Login.vue'), alias:['/reg'],meta:{noScroll:true} },
    { path: '/news', name:'news', component:()=>import('./views/News.vue') },

    //error
    { path: '/error=:state', name: 'error', component: NotFound },
    { path: '*', component: NotFound},
  ],
})
router.beforeEach((to, from, next) => {
  if(to.meta.noScroll == true){
    document.body.style.overflow = 'hidden'
  }

  next();
})
router.afterEach((to, from) => {
  if(to.meta.closeCanvas){
    document.querySelector('#bottom-canvas').style.display ="none"
  }
})
export default router;