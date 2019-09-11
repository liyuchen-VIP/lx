// 作用 加载该项目下所有要依赖的资源文件或js模块
//      实例化根实例
// render() 是入口选项之一
// 作用 渲染APP组件
// mount 渲染后挂载到 #app 的容器内

import Vue from 'vue'
import App from './App.vue'
import '@/styles/index.css'

import router from './router'

// 导element-ui包
import ElementUI from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入axios包
import axios from '@/api/axios'

import Components from '@/components'

// 挂在到vue原型上 全局使用
Vue.prototype.axios = axios
// 在全局注册组件
Vue.use(ElementUI)
Vue.use(Components)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
