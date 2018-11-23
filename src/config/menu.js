export default [{
  text: '首页',
  icon: 'home',
  path: '/'
}, {
  text: 'Dashboard',
  icon: 'dashboard',
  path: '/dashboard',
  childs: [
    { text: '决战双11数据统计', icon: 'list', path: 'list' },
    { text: '站点信息数据统计', icon: 'list', path: 'website' }
  ]
}, {
  text: '开发日志',
  icon: 'log',
  path: '/log'
}]
