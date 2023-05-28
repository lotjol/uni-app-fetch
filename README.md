## uni-app-fetch v0.0.1

uni-app uni.request 网络请求的扩展，支持 Promise、拦截器和 TypeScript。

## 安装

```bash
npm install uni-app-fetch --save
```

## 使用说明

### 1. 创建实例

新建 `utils/uni-fetch.ts` 文件，参照如下代码创建实例

```javascript
import { createUniFetch } from 'uni-app-fetch'
// Typescript 相关
interface responseData {
  code: number
  message: string
  data: any
}

// #ifdef VUE2
import Vue from 'vue'
declare module 'vue/types/vue' {
  interface Vue {
    fetch: typeof uniFetch
  }
}
// #endif

// #ifdef VUE3
declare module 'vue' {
  interface ComponentCustomProperties {
    fetch: typeof uniFetch
  }
}
// #endif

// 使用自定义选项创建实例
const uniFetch = createUniFetch<responseData>({
  loading: { title: 'loading...' },
  baseURL: 'https://your.host.com',
  intercept: {
    // 请求拦截器
    request(options) {},
    // 响应拦截器
    response(result) {},
  },
})
// 模块导出
export default uniFetch
```

### 2. 应用实例

- **模块方式（适用 Vue2 和 Vue3）**

```html
<script>
   // 导入实例模块
   import uniFetch from '@/utils/uni-fetch'
  export default {
     data() {},
     async onLoad() {
       // 用法1
       const res1 = await uniFetch<{ list: string[] }>({
         url: '/echo',
         data: {}
       })
       // 用法2
       const res2 = await uniFetch.get<{ list: string[] }>('/echo', {})
     }
   }
</script>
```

- **Vue 实例方式（适用于 Vue2 和配置式 Vue3）**

```typescript
////////// Vue2 //////////
import Vue from 'vue'
import App from './App.vue'
import './uni.promisify.adaptor'
import uniFetch from './utils/uni-fetch'

// 挂到Vue实例中
Vue.prototype.fetch = uniFetch

Vue.config.productionTip = false
const app = new (
  typeof App === 'function'
    ? App
    : Vue.extend(Object.assign({ mpType: 'app' }, App))
)()
app.$mount()

////////// Vue3 //////////
import { createSSRApp } from 'vue'
import App from './App.vue'
import uniFetch from './utils/uni-fetch'

export function createApp() {
  const app = createSSRApp(App)
  // 挂到Vue实例中
  app.config.globalProperties.fetch = uniFetch
  return { app }
}
```

到组件中通过 Vue 实例进行调用：

```html
<script>
  export default {
    data() {},
    async onLoad() {
      // 用法1
      const res1 = await this.fetch<{ list: string[] }>({
        url: '/echo',
        data: {}
      })
      // 用法2
      const res2 = await this.fetch.get<{ list: string[] }>('/echo', {})
    }
  }
</script>
```

## 快捷方法

```javascript
// GET 方法请求
uniFetch.fetch.get<T>(url, data?)

// POST 方法请求
uniFetch.post<T>(url, data?)

// PUT 方法请求
uniFetch.put<T>(url, data?)

// DELETE 方法请求
uniFetch.delete<T>(url, data?)
```
