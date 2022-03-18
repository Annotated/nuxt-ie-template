import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { NuxtCookies } from 'cookie-universal-nuxt'

export type Method = 'get' | 'GET' | 'post' | 'POST'

let $axios: NuxtAxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance
}

let $cookies: NuxtCookies

export function initializeCookies(cookiesInstance: NuxtCookies) {
  $cookies = cookiesInstance
}

export const cookies = () => $cookies

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params?: any) {
  return request(url, 'get', params, undefined)
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url: string, data?: any) {
  return request(url, 'post', undefined, data)
}

const request = (url: string, method: Method, params: any, data: any) => {
  return $axios.$request({ url, method, params, data })
}
