import { Plugin } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { NuxtCookies } from 'cookie-universal-nuxt'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { initializeAxios, initializeCookies } from '~/utils/api'

import { getToken } from '~/utils/cookies'

const requestId = Math.floor(Math.random() * (1000 - 1) + 1)

/**
 * axios 配置
 * @param {*} param0 nuxt 的上下文（项目中依赖的所有信息）
 *  $axios 请求
 *  redirect 重定向
 *  route 路由(当前正在跳转的路由对象, 可以从里面获取name,path,params,query等)
 *  store vuex的状态数据
 */
const axios: Plugin = ({
  $axios,
  $cookies
}: {
  $axios: NuxtAxiosInstance
  $cookies: NuxtCookies
}) => {
  initializeAxios($axios)
  initializeCookies($cookies)

  // 基本配置
  $axios.defaults.timeout = 10000

  // 请求拦截
  $axios.onRequest((config: AxiosRequestConfig) => {
    config.headers = {
      'Content-Type': 'application/json',
      'kk-request-id': requestId,
      'kk-version': '1.0.0',
      'kk-from': 'web',
      'kk-os': process.client ? navigator.userAgent : '',
      'kk-modle': process.client ? navigator.userAgent : '',
      'kk-ip': '',
      'kk-token': getToken() || ''
    }
    return config
  })

  // 响应拦截
  $axios.interceptors.response.use((response: AxiosResponse<any>) => {
    const { data, status } = response
    /** 请求有响应 */
    if (status === 200) {
      if (data.code === '10000') {
        return Promise.resolve(data)
      } else {
        return Promise.reject(data.code)
      }
    } else {
      const __text = getErrorCode2text(response)
      return Promise.reject(new Error(__text))
    }
  })
}

/**
 * get status code
 * @param {AxiosResponse} response Axios  response object
 */
const getErrorCode2text = (response: AxiosResponse): string => {
  /** http status code */
  const code = response.status
  /** notice text */
  let message: string
  switch (code) {
    case 400:
      message = '未登录'
      break
    case 401:
      message = '用户没有权限（令牌、用户名、密码错误）!'
      break
    case 403:
      message = '用户得到授权，但是访问是被禁止的!'
      break
    case 404:
      message = '访问资源不存在'
      break
    case 408:
      message = '请求超时'
      break
    case 500:
      message = '位置错误'
      break
    case 501:
      message = '承载服务未实现'
      break
    case 502:
      message = '网关错误'
      break
    case 503:
      message = '服务暂不可用'
      break
    case 504:
      message = '网关超时'
      break
    case 505:
      message = '暂不支持的 HTTP 版本'
      break
    default:
      message = '位置错误'
  }
  return message
}

export default axios
