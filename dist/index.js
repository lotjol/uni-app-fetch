"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUniFetch = void 0;
function createUniFetch(config) {
    var _a, _b;
    // 记录 loading 的状态
    const loadingQueue = [];
    /**
     * uni-request 封装
     * @param options
     * @returns
     */
    const uniFetch = (options) => {
        // 处理基础路径
        if (!options.url.startsWith('http') && uniFetch.baseURL) {
            options.url = uniFetch.baseURL + options.url;
        }
        // 调用请求拦截器
        uniFetch.intercept.request(options);
        // 是否显示加载 loading
        if (!!(uniFetch === null || uniFetch === void 0 ? void 0 : uniFetch.loading) && !loadingQueue.length) {
            uni.showLoading(Object.assign({}, uniFetch.loading));
        }
        // 记录请求次数
        loadingQueue.push('loading');
        // 包装 Promise 对象
        return new Promise((resolve, reject) => {
            uni.request(Object.assign(Object.assign({}, options), { success: (result) => {
                    // 调用响应拦截器
                    resolve(uniFetch.intercept.response(Object.assign(Object.assign({}, result), { config: options })));
                }, fail: reject, complete: () => {
                    // 记录结束的请求数量
                    loadingQueue.pop();
                    // 关闭加载提示框
                    if (!loadingQueue.length)
                        uni.hideLoading();
                } }));
        });
    };
    /**
     * 初始化参数
     */
    uniFetch.loading = config === null || config === void 0 ? void 0 : config.loading;
    uniFetch.baseURL = config === null || config === void 0 ? void 0 : config.baseURL;
    uniFetch.intercept = {
        request: (options) => options,
        response: (result) => result,
    };
    if ((_a = config === null || config === void 0 ? void 0 : config.intercept) === null || _a === void 0 ? void 0 : _a.request) {
        uniFetch.intercept.request = config.intercept.request;
    }
    if ((_b = config === null || config === void 0 ? void 0 : config.intercept) === null || _b === void 0 ? void 0 : _b.response) {
        uniFetch.intercept.response = config.intercept.response;
    }
    // 快捷请求方法
    uniFetch.get = function (url, data = {}) {
        return uniFetch({ url, method: 'GET', data });
    };
    uniFetch.post = function (url, data = {}) {
        return uniFetch({ url, method: 'POST', data });
    };
    uniFetch.put = function (url, data = {}) {
        return uniFetch({ url, method: 'PUT', data });
    };
    uniFetch.delete = function (url, data) {
        return uniFetch({ url, method: 'DELETE', data });
    };
    return uniFetch;
}
exports.createUniFetch = createUniFetch;
exports.default = createUniFetch();
