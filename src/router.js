// 创建路由对象 及 配置路由规则 和 其他路由配置
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Image from '@/views/image'
import NotFound from '@/views/404'
import Article from '@/views/article'
import Publish from '@/views/publish'
import Fans from '@/views/fans'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: Login },

    { path: '/home',
      name: '',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: Image },
        { path: '/publish', name: 'publish', component: Publish },
        { path: '/fans', name: 'fans', component: Fans }
      ]
    },
    { path: '*', name: '404', component: NotFound }
  ]
})

// 设置前置导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to, from)
  if (to.path === from.path) {
    console.log(123)
    return
  }
  const user = window.sessionStorage.getItem('login')
  if (to.path !== '/login' && !user) return next('/login')
  next()
})

export default router
