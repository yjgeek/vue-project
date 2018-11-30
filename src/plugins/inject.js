import api from './api'
import * as config from 'config/index'
import mixin from './mixin'
import directive from './directive'
import db from './db'
import tableModel from 'src/tables'
import components from 'components/index'
import 'src/mocks'
export default {
  install: (Vue) => {
    Vue.use(components)
    document.title = config.TITLE
    Vue.prototype.$config = config
    Vue.prototype.$api = api
    Vue.prototype.$auth = localStorage.auth ? JSON.parse(localStorage.auth) : []
    Vue.prototype.$db = db
    // 初始化数据库
    db.initDB('db', tableModel.tables).then(res => {
      if (!res) {
        Object.keys(tableModel.datas).forEach(key => {
          db.add(key, tableModel.datas[key])
        })
      }
    })
    // 3. 注入组件
    Vue.mixin(mixin)
    // 注册一个全局自定义指令 `v-auth`
    Object.keys(directive).forEach(key => {
      Vue.directive(key, directive[key])
    })
  }
}
