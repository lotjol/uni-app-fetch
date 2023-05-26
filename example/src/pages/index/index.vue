<template>
  <view class="content">
    <image class="logo" src="../../static/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'

// 用法1
// import uniFetch from '../../../../src/index'

// uniFetch.loading = {
//   title: '正在加载...',
// }
// uniFetch.baseURL = 'https://t1ps66c7na.hk.aircode.run'
// uniFetch.intercept.request = function (options) {
//   options.header = {
//     authorization: 'Bearer fsdfadsfadsfa',
//   }
// }
// uniFetch.intercept.response = function (result) {
//   return result.data
// }

// 用法2
import { createUniFetch } from '../../../../src/index'

const uniFetch = createUniFetch<{ code: number; message: string; data: any }>({
  baseURL: 'https://t1ps66c7na.hk.aircode.run',
  intercept: {
    // 请求拦截器
    request(options) {
      options.header = Object.assign({}, options.header, {
        Authorization: 'Bearer r3fsdfasdfasasdf23324dfsfsadf',
      })
    },
    // 响应拦截器
    response(result) {
      return result.data
    },
  },
})

export default Vue.extend({
  data() {
    return {
      title: 'Hello',
    }
  },
  async onLoad() {
    const res = await uniFetch<{ list: string }>({
      url: '/echo',
      header: {
        test: 123,
      },
    })

    console.log(res.data)
    const res2 = await uniFetch.get<{ list: string }>('/echo')
    res2.data
  },
  methods: {},
})
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
