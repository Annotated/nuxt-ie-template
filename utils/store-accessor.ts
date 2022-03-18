import { Store, ActionTree } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import App from '~/store/app'
import User from '~/store/user'

interface RootState {
  UserModule: User
  appModule: App
}

// eslint-disable-next-line import/no-mutable-exports
let AppModule: App, UserModule: User

function initialiseStores(store: Store<any>): void {
  AppModule = getModule(App, store)
  UserModule = getModule(User, store)
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit() {
    UserModule.SetToken()
    // https://nuxtjs.org/docs/directory-structure/store/
    // 异步操作必须返回 Promise 或利用异步/等待来允许 nuxt 服务器等待它们
    await UserModule.GetUserInfo()
  }
}

export { initialiseStores, AppModule, UserModule }
