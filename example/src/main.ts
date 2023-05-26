import Vue from 'vue'
import App from './App.vue'
import './uni.promisify.adaptor'

// 导入模块
import uniFetch from './utils/uni-fetch'
// 挂载到应用实例
Vue.prototype.fetch = uniFetch

Vue.config.productionTip = false

const app = new (
  typeof App === 'function'
    ? App
    : Vue.extend(Object.assign({ mpType: 'app' }, App))
)()
app.$mount()
