// 封装axios

import axios from 'axios'
import JSONBig from 'json-bigint'

// // 创建axios对象
const instance = axios.create({
  // 基准路径
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  transformResponse: [(data) => {
    // JSONBig.parse处理格式
    // data数据可能没有  为null
    if (data) {
      // 有数据去转化
      return JSONBig.parse(data)
    }
    // 没有数据 返回空数据
    return data
  }]
})

// 设置请求拦截器
instance.interceptors.request.use(config => {
  const user = window.sessionStorage.getItem('login')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response && error.response.status === 401) {
    location.hash = '/login'
  }
  return Promise.reject(error)
})

export default instance
