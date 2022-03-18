import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { setHeaderTitle } from '@/utils/cookies'

@Module({
  name: 'app',
  namespaced: true,
  stateFactory: true
})
export default class App extends VuexModule {
  public title: string = 'nuxt-ie-template'

  @Mutation
  private SET_TITLE(title: string) {
    this.title = title
    setHeaderTitle(title)
  }

  @Action
  public update(title: string) {
    this.SET_TITLE(title)
  }
}
