import api from './api'
import * as config from 'config/index'
import mixin from './mixin'
import directive from './directive'
import 'src/mocks'
export default {
  install: (Vue) => {
    document.title = config.TITLE
    Vue.prototype.$config = config
    Vue.prototype.$api = api
    Vue.prototype.$auth = localStorage.auth ? JSON.parse(localStorage.auth) : []

    // 3. 注入组件
    Vue.mixin(mixin)
    // 注册一个全局自定义指令 `v-auth`
    Object.keys(directive).forEach(key => {
      Vue.directive(key, directive[key])
    })
  }
}
