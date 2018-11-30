import Vue from 'vue'
import App from './App'
import store from './plugins/store'
import inject from './plugins/inject'
import router from './plugins/router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

Vue.use(ElementUI)
Vue.use(inject)

Vue.config.productionTip = false
window.$variable = {}
window.$variable.vbus = new Vue()
window.$variable.vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
