import router from './router'
import table from './table'
import api from './api'
import mock from './mock'
export default {
  router,
  table,
  api,
  mock,
  menu: {
    text: '商城后台管理',
    icon: 'shop',
    path: '/shop',
    childs: [
      {
        text: '商品管理',
        icon: 'product',
        path: 'product',
        childs: [
          {text: '分类列表', icon: 'category', path: 'category'}
        ]
      }
    ]
  }
}
