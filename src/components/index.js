// 导入要封装成插件的组件
import Bread from '@/components/bread.vue'
import Channel from '@/components/channel.vue'
import Images from '@/components/images.vue'

// 封装成插件形式
// 导出     当使用 Vue.use 的时候,  会执行插件中的配置对象的 install函数
// install  安装
export default {

  // 当用Vue.use注册插件时，调用install方法时会传入 vue对象 不用额外导入

  install (Vue) {
    //   这里接收vue对象
    //   在 vue 下注册所有组件
    // 传值  第一个是组件名
    // 这里的 name 就是使用时的组件名 要在该组件中大data return中定义

    // 第二个是组件配置对象 就是导入的大写的名字
    Vue.component(Bread.name, Bread)
    Vue.component(Channel.name, Channel)
    Vue.component(Images.name, Images)
  }
}
