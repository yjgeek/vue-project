import router from './router'
import api from './api'
export default {
  router,
  api,
  menu: {
    text: '资源管理',
    icon: 'resource',
    path: '/resource',
    childs: [
      {
        text: '资源列表',
        icon: 'list',
        path: ''
      }
    ]
  }
}
