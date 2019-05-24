import router from './router'
import table from './table'
export default {
  router,
  table,
  menu: {
    text: '列表模块',
    icon: 'list',
    path: '/list',
    childs: [
      {
        text: '商品列表',
        icon: 'list',
        path: 'good'
      },
      {
        text: '分类列表',
        icon: 'list',
        path: 'category'
      },
    ]
  }
}
