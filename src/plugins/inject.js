import api from './api'
import * as config from 'config/index'
import mixin from './mixin'
import directive from './directive'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
import 'src/mocks'
export default {
  install: (Vue) => {
    document.title = config.TITLE
    Vue.prototype.$config = config
    Vue.prototype.$auth = localStorage.auth ? JSON.parse(localStorage.auth) : []
    Vue.prototype.$api = api

    // 注册一个图片放大插件 https://www.npmjs.com/package/vue-directive-image-previewer
    // # 使用方法
    // < img v-image-preview />
    // or
    // < img v-image-preview="图片路径" />
    // or
    // < img v-image-preview="{src: '图片路径'}" src = "some-pic-url" />
    Vue.use(VueDirectiveImagePreviewer, {
      zIndex: 99999999
    })

    // 3. 注入组件
    Vue.mixin(mixin)
    // 注册一个全局自定义指令 `v-auth`
    Object.keys(directive).forEach(key => {
      Vue.directive(key, directive[key])
    })
  }
}
