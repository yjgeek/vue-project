import api from './api'
const Login = r => require.ensure([], () => r(require('../Index')), 'login')
export default {
  router: {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { auth: false, layout: 'blank' }
  },
  api
}
