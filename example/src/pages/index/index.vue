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

import uniFetch from '../../utils/uni-fetch'

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

    // console.log(res.data)
    const res2 = await uniFetch.get<{ list: string }>('/echo')
    // res2.data

    // 用法3
    const res3 = await this.fetch.get<{ list: string }>('/echo')
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
