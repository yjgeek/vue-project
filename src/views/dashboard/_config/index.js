import api from './api'
import mock from './mock'
import router from './router'
export default {
  api,
  mock,
  router,
  menu: {
    text: 'Dashboard',
    icon: 'dashboard',
    path: '/dashboard',
    childs: [
      { text: '决战双11数据统计', icon: 'list', path: 'list' },
      { text: '站点信息数据统计', icon: 'list', path: 'website' }
    ]
  }
}
