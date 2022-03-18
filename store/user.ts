import sha1 from 'crypto-js/sha1'

import {
  Module,
  VuexModule,
  Mutation,
  Action,
  config
} from 'vuex-module-decorators'
import { getToken, setToken, removeToken } from '@/utils/cookies'

import {
  LoginCode,
  LoginOauth,
  LoginPassword,
  UserInfoType
} from '~/interfaces/model/userModel'
import user from '~/api/user'

config.rawError = true

@Module({
  name: 'user',
  namespaced: true,
  stateFactory: true
})
export default class User extends VuexModule {
  public token: string = ''
  public userInfo: UserInfoType | null = null

  public get username() {
    return this.userInfo?.userName
  }

  public get photo() {
    return this.userInfo?.photo
  }

  @Mutation
  public SET_TOKEN(token: string) {
    this.token = token
    setToken(token)
  }

  @Mutation
  public SET_USERINFO(userInfo: UserInfoType | null) {
    this.userInfo = userInfo
  }

  @Action
  public SetToken() {
    this.SET_TOKEN(getToken() || '')
  }

  @Action({ commit: 'SET_TOKEN' })
  public ResetToken() {
    removeToken()
    return ''
  }

  @Action
  public async Login(loginInfo: LoginCode) {
    try {
      const code = loginInfo.code
      const mobile = btoa(loginInfo.mobile)
      const { token } = await user.loginCode({ mobile, code })
      this.SET_TOKEN(token)
      // 获取用户信息
      this.GetUserInfo()
    } catch (e) {
      return Promise.reject(e)
    }
  }

  /**
   * 密码登录
   * @param { string } param.mobile 手机号进行 base64 加密
   * @param { string } param.password 密码需要经过sha1 加密
   */
  @Action
  public async LoginPassword(param: LoginPassword) {
    try {
      const mobile = btoa(param.mobile)
      const password = encrypt(param.password)
      const { token } = await user.loginPassword({ mobile, password })
      this.SET_TOKEN(token)
      // 获取用户信息
      this.GetUserInfo()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @Action
  public async GetUserInfo() {
    try {
      const res = await user.getUserInfo()
      this.SET_USERINFO(res)
    } catch (e) {}
  }

  @Action
  public async LoginOauth(loginType: string) {
    try {
      const data: LoginOauth = { loginType }
      return await user.loginOauth(data)
    } catch (e) {}
  }

  @Action
  public async RetrievePassword({ mobile, code, password }: LoginCode) {
    const mobileBase64 = window.btoa(mobile)
    const passwordSha1 = encrypt(password!)
    await user.retrievePassword({
      mobile: mobileBase64,
      code,
      password: passwordSha1
    })
  }

  @Action
  public async LogOut() {
    try {
      await user.logout()
      removeToken()
      this.SET_TOKEN('')
      this.SET_USERINFO(null)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

// 计算字符串的 hash 散列
const encrypt = (content: string) => sha1(content).toString()
