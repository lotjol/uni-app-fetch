declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '../../../../src/index' {
  export interface ResponseResultData<T = any> {
    code: number
    message: string
    data: T
  }
}
