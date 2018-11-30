import api from './api'
import * as config from 'config/index'
import mixin from './mixin'
import directive from './directive'
import db from './db'
import globalConfigs from 'src/globalConfigs'
import components from 'components/index'
import {Mock} from 'utils/index'
export default {
  install: (Vue) => {
    Vue.use(components)
    document.title = config.TITLE
    Vue.prototype.$config = config
    Vue.prototype.$api = api
    Vue.prototype.$auth = localStorage.auth ? JSON.parse(localStorage.auth) : []
    Vue.prototype.$db = db

    // 初始化数据库
    db.initDB('db', globalConfigs.tables.schemas).then(res => {
      if (!res) {
        Object.keys(globalConfigs.tables.datas).forEach(key => {
          db.add(key, globalConfigs.tables.datas[key])
        })
      }
    })

    // 注入mock拦截
    Object.keys(globalConfigs.mocks).forEach(key => {
      const { type, template } = globalConfigs.mocks[key]
      key = '^' + key
      Mock.mock(new RegExp(key), type, template)
    })
    // 3. 注入组件
    Vue.mixin(mixin)
    // 注册一个全局自定义指令 `v-auth`
    Object.keys(directive).forEach(key => {
      Vue.directive(key, directive[key])
    })
  }
}
