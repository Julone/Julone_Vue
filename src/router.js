import Home from './views/Home.vue'
import Comment from './views/Comment'
import NotFound from './views/NotFound'
import Score from './views/Score'
import More from './views/More'
import Login from './views/Login'
import News from './views/News.vue'
import Music from './views/Music.vue'
import Video from './views/Video.vue'
import Stulist from './views/Stulist.vue'
import Blog from './views/Blog.vue'
import FindPass from './views/FindPass.vue'

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      alias:['/home','/index','/index.html','/index.htm']
    },
    {
      path: '/stulist',
      name: 'stulist',
      component:()=>import('./views/Stulist.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component:Blog
    },
    {
      path: '/food',
      name: 'food',
      component:()=>import('./views/Food.vue')
    },
    {
      path: '/comment',
      name: 'comment',
      component: Comment,
    },
    {
      path: '/findpass',
      name: 'findpass',
      component: ()=>import('./views/FindPass.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: ()=>import('./views/User.vue'),
    },
    {
      path: '/links',
      name: 'links',
      component:() => import('./views/Links.vue'),
      alias:['/link']
    },
    {
      path: '/score',
      name: 'score',
      component: Score,
    },
    {
      path: '/more',
      name: 'more',
      component: More,
    },
    {
      path: '/reg',
      name: 'reg',
      component: Login,
      alias:['/login']
    },
    {
      path: '/error=:state',
      name: 'error',
      component: NotFound
    },
    {
      path:'/news',
      name:'news',
      component:()=>import('./views/News.vue')
    },
    {
      path:'/copyright',
      name:'copyright',
      component:() => import('./views/Copyright.vue'),
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
})

export default router;