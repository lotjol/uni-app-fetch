import Vue from 'vue'
import { createUniFetch } from '../../../dist'

// 接口规范响应的数据
interface responseData {
  code: number
  message: string
  data: any
}

declare module 'vue/types/vue' {
  interface Vue {
    fetch: typeof uniFetch
  }
}

const uniFetch = createUniFetch<responseData>({
  loading: { title: '正在加载...' },
  baseURL: 'https://t1ps66c7na.hk.aircode.run',
  intercept: {
    // 请求拦截器
    request(options) {
      Object.assign({}, options.header, {
        Authorization: 'Bearer token',
      })
    },
    // 响应拦截器
    response(result) {
      return result.data
    },
  },
})

export default uniFetch
