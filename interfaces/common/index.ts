/**
 * Promise 返回结果的类型
 */
 export interface Result<T> extends Promise<T> {
  code: string
  msg: string
  time: string
  data: T
}