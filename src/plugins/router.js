import Vue from 'vue'
import Router from 'vue-router'
import globalConfigs from 'src/globalConfigs'
import { beforeEach } from 'config/interceptors'
const RouterView = r => require.ensure([], () => r(require('src/RouterView')), 'routerView')
Vue.use(Router)
let routerInstance = new Router({
  routes: [{
    path: '/',
    component: RouterView,
    meta: {
      bread: ['首页']
    },
    children: [
      ...globalConfigs.routers
    ]
  }, {
    path: '**',
    redirect: '/'
  }]
})
routerInstance.beforeEach(beforeEach)
export default routerInstance
