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
          {text: '商品列表', icon: 'list', path: 'good'},
          {text: '分类列表', icon: 'category', path: 'category'}
        ]
      },
      {
        text: '商品营销管理',
        icon: 'marketing',
        path: 'marketing'
      }
    ]
  }
}
