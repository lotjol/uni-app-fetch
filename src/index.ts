// 工具类型
type Override<P, S> = Omit<P, keyof S> & S

interface Config {
  /**
   * 自定义加载提示
   */
  loading?: {
    title: string
    mask?: boolean
  }
  /**
   * 接口服务器地址
   */
  baseURL?: string
  /**
   * 请求/响应拦截器
   */
  intercept?: {
    request?(options: UniApp.RequestOptions): void
    response?(
      result: UniApp.RequestSuccessCallbackResult & {
        config: UniApp.RequestOptions
      }
    ): any
  }
}

interface UniFetch<T = any> {
  /**
   * 自定义加载提示
   */
  loading?: {
    title: string
    mask?: boolean
  }

  /**
   * 接口服务器地址
   */
  baseURL?: string

  /**
   * 请求/响应拦截器
   */
  intercept: {
    request(options: UniApp.RequestOptions): void
    response(
      result: UniApp.RequestSuccessCallbackResult & {
        config: UniApp.RequestOptions
      }
    ): any
  }

  /**
   * 构造方法？？
   */
  <U>(options: UniApp.RequestOptions): Promise<Override<T, { data: U }>>

  /**
   * GET 方法请求
   */
  get<U>(url: string, data?: object): Promise<Override<T, { data: U }>>

  /**
   * POST 方法请求
   */
  post<U>(url: string, data?: object): Promise<Override<T, { data: U }>>

  /**
   * PUT 方法请求
   */
  put<U>(url: string, data?: object): Promise<Override<T, { data: U }>>

  /**
   * DELETE 方法请求
   */
  delete<U>(url: string, data?: object): Promise<Override<T, { data: U }>>
}

function createUniFetch<T = any>(config?: Config) {
  // 记录 loading 的状态
  const loadingQueue: string[] = []
  /**
   * uni-request 封装
   * @param options
   * @returns
   */
  const uniFetch: UniFetch<T> = (options) => {
    // 处理基础路径
    if (!options.url.startsWith('http') && uniFetch.baseURL) {
      options.url = uniFetch.baseURL + options.url
    }

    // 调用请求拦截器
    uniFetch.intercept.request(options)

    // 是否显示加载 loading
    if (!!uniFetch?.loading && !loadingQueue.length) {
      uni.showLoading({ ...uniFetch.loading })
    }

    // 记录请求次数
    loadingQueue.push('loading')

    // 包装 Promise 对象
    return new Promise((resolve, reject) => {
      uni.request({
        ...options,
        success: (result) => {
          // 调用响应拦截器
          resolve(uniFetch.intercept.response({ ...result, config: options }))
        },
        fail: reject,
        complete: () => {
          // 记录结束的请求数量
          loadingQueue.pop()
          // 关闭加载提示框
          if (!loadingQueue.length) uni.hideLoading()
        },
      })
    })
  }

  /**
   * 初始化参数
   */
  uniFetch.loading = config?.loading
  uniFetch.baseURL = config?.baseURL
  uniFetch.intercept = {
    request: (options) => options,
    response: (result) => result,
  }
  if (config?.intercept?.request) {
    uniFetch.intercept.request = config.intercept.request
  }
  if (config?.intercept?.response) {
    uniFetch.intercept.response = config.intercept.response
  }

  // 快捷请求方法
  uniFetch.get = function (url, data = {}) {
    return uniFetch({ url, method: 'GET', data })
  }
  uniFetch.post = function (url, data = {}) {
    return uniFetch({ url, method: 'POST', data })
  }
  uniFetch.put = function (url, data = {}) {
    return uniFetch({ url, method: 'PUT', data })
  }
  uniFetch.delete = function (url, data: {}) {
    return uniFetch({ url, method: 'DELETE', data })
  }

  return uniFetch
}

export { UniFetch, createUniFetch }
export default createUniFetch<{ code: number; message: string; data: any }>()
