import { post } from '~/utils/api'

import {
  LoginPassword,
  CodeType,
  LoginCode,
  UserInfoType,
  LoginOauth
} from '~/interfaces/model/userModel'
import { Result } from '~/interfaces/common'

export default {
  /**
   * 获取用户信息
   * @returns
   */
  getUserInfo(): Promise<UserInfoType> {
    return post('/dev/userBaseInfoProt')
  },
  /**
   * 密码登录
   * @param params
   * @returns
   */
  loginPassword(params: LoginPassword) {
    return post('/dev/loginPassword', params)
  },

  /**
   * 获取手机验证码
   * @param params
   * @returns
   */
  getCodeByMobile(params: CodeType) {
    return post('/dev/sms/sendCode', params)
  },

  /**
   * 验证码登录
   * @param params
   * @returns
   */
  loginCode(params: LoginCode) {
    return post('/dev/loginSms', params)
  },

  /**
   * 认证登录
   * @param params
   * @returns
   */
  loginOauth(params: LoginOauth) {
    return post('/dev/oauth/login', params)
  },

  /**
   * 忘记密码
   * @param params
   * @returns
   */
  retrievePassword(params: LoginCode): Promise<Result<any>> {
    return post('/dev/forgetPassword', params)
  },

  /**
   * 退出登录
   * @returns
   */
  logout() {
    return post('/dev/logoutProt')
  }
}
