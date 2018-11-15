const RouterView = r => require.ensure([], () => r(require('components/RouterView')), 'routerView')
const Index = r => require.ensure([], () => r(require('views/index/Index')), 'index')
const Login = r => require.ensure([], () => r(require('views/auth/Index')), 'login')
const data = require.context('./views/', true, /router\.js$/)
let temArray = []
data.keys().forEach(item => {
  if (item.split('/').length === 4) {
    item = data(item).default
    if (item instanceof Array) {
      temArray = [...temArray, ...item]
    } else {
      temArray.push(item)
    }
  }
})
const ROUTES = [{
  path: '/',
  component: RouterView,
  meta: {
    bread: ['首页']
  },
  children: [
    {
      path: '',
      name: 'index',
      component: Index
    },
    ...temArray
  ]
}, {
  path: '/login',
  name: 'login',
  component: Login,
  meta: { auth: false, layout: 'blank' }
}, {
  path: '**',
  redirect: '/'
}]
export default ROUTES
