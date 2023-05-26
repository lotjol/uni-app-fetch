/// <reference types="@dcloudio/types" />
/// <reference types="@dcloudio/types" />
type Override<P, S> = Omit<P, keyof S> & S;
interface Config {
    /**
     * 自定义加载提示
     */
    loading?: {
        title: string;
        mask?: boolean;
    };
    /**
     * 接口服务器地址
     */
    baseURL?: string;
    /**
     * 请求/响应拦截器
     */
    intercept?: {
        request?(options: UniApp.RequestOptions): void;
        response?(result: UniApp.RequestSuccessCallbackResult & {
            config: UniApp.RequestOptions;
        }): any;
    };
}
interface UniFetch<T = any> {
    /**
     * 自定义加载提示
     */
    loading?: {
        title: string;
        mask?: boolean;
    };
    /**
     * 接口服务器地址
     */
    baseURL?: string;
    /**
     * 请求/响应拦截器
     */
    intercept: {
        request(options: UniApp.RequestOptions): void;
        response(result: UniApp.RequestSuccessCallbackResult & {
            config: UniApp.RequestOptions;
        }): any;
    };
    /**
     * 构造方法？？
     */
    <U>(options: UniApp.RequestOptions): Promise<Override<T, {
        data: U;
    }>>;
    /**
     * GET 方法请求
     */
    get<U>(url: string, data?: object): Promise<Override<T, {
        data: U;
    }>>;
    /**
     * POST 方法请求
     */
    post<U>(url: string, data?: object): Promise<Override<T, {
        data: U;
    }>>;
    /**
     * PUT 方法请求
     */
    put<U>(url: string, data?: object): Promise<Override<T, {
        data: U;
    }>>;
    /**
     * DELETE 方法请求
     */
    delete<U>(url: string, data?: object): Promise<Override<T, {
        data: U;
    }>>;
}
declare function createUniFetch<T = any>(config?: Config): UniFetch<T>;
export { UniFetch, createUniFetch };
declare const _default: UniFetch<{
    code: number;
    message: string;
    data: any;
}>;
export default _default;
//# sourceMappingURL=index.d.ts.map