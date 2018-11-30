import {isArray} from 'lodash'
import {sortObj} from 'utils/index'
const contexts = require.context('views', true, /\/*\/_config\/index\.js$/)
let apis = {}
let mocks = {}
let routers = []
let menus = []
let stores = {}
let tables = {schemas: [], datas: {}}
contexts.keys().forEach(item => {
  try {
    let arr = item.split('/')
    let prefix = arr[arr.length - 3]
    let obj = contexts(item).default
    // 防止在_config下嵌套_config
    if (prefix !== '_config') {
      // api
      if (obj.api && isArray(obj.api)) {
        apis[prefix] = obj.api
      } else if (obj.api) {
        apis[obj['api']['prefix']] = obj.api.data
      }
      // vuex
      if (obj.store && obj.store.prefix) {
        stores[obj['store'].prefix] = obj.store
      } else if (obj['store']) {
        stores[prefix] = obj.store
      }
      // mock
      if (obj['mock']) {
        mocks = Object.assign({}, mocks, obj['mock'])
      }
      // router
      if (obj.router) {
        if (isArray(obj.router)) {
          routers.concat(obj.router)
        } else {
          routers.push(obj.router)
        }
      }
      // 数据表
      if (obj.table) {
        if (isArray(obj.table.schemas)) {
          tables.schemas = tables.schemas.concat(obj.table.schemas)
        }
        if (obj.table.datas) {
          tables.datas = Object.assign(tables.datas, obj.table.datas)
        }
      }
      // menus 侧边栏
      if (obj.menu) {
        if (isArray(obj.menu)) {
          menus.concat(obj.menu)
        } else {
          menus.push(obj.menu)
        }
      }
    }
  } catch (err) {
    console.info('解析出错!')
  }
})
routers = routers.sort(sortObj('_index'))
menus = menus.sort(sortObj('_index'))
export default {
  apis, stores, mocks, routers, tables, menus
}
