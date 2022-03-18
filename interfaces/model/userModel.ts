/**
 * @description: 获取用户信息
 */
 export interface UserInfoType {
  userName: string
  mobile: string
  email: string
  photo: string
  userId: string
  trueName: string
}


export interface LoginPassword {
  mobile: string
  password: string
}

/**
 * 验证码登录类型
 */
export interface LoginCode {
  mobile: string
  code: number | undefined
  password?: string
}

/**
 * 获取验证码类型
 */

export interface CodeType {
  mobile: string,
  scene: string
}

/**
 * 第三方认证登录
 */
export interface LoginOauth {
  nickName?: string
  photo?: string
  openId?: string
  unionId?: string
  loginType: string
  identityToken?: string
}