const Index = r => require.ensure([], () => r(require('../Index')), 'index')
export default {
  router: {
    path: '',
    name: 'index',
    component: Index,
    _index: 0
  },
  menu: {
    text: '首页',
    icon: 'home',
    path: '/',
    _index: 0
  }
}
