import { cookies } from './api'

// App
const headerTitleKey = 'kk-header-title'
export const getHeaderTitle = () => cookies().get(headerTitleKey)
export const setHeaderTitle = (headerTitle: string) =>
  cookies().set(headerTitleKey, headerTitle)

// User
const tokenKey = 'kk-nuxt-token'
export const getToken = () => cookies().get(tokenKey)
export const setToken = (token: string) => cookies().set(tokenKey, token)
export const removeToken = () => cookies().remove(tokenKey)

const userKey = 'nuxt-user-info'
export const getStorage = (key: string = userKey) => cookies().get(key)
export const setStorage = (value: any, key: string = userKey) =>
  cookies().set(key, value)
export const removeStorage = (key: string = userKey) => cookies().remove(key)

// 加密
export function compile(code: any) {
  let c = String.fromCharCode(code.charCodeAt(0) + code.length)
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
  }
  return btoa(c)
}

// 解密
export function uncompile(code: any) {
  code = atob(code)
  let c = String.fromCharCode(code.charCodeAt(0) - code.length)
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
  }
  return c
}
