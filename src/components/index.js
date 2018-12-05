import SideNavigation from './sideNavigation/Index'
import IconFont from './IconFont'
import Breadcrumb from './Breadcrumb'
import Footer from './Footer'
import HeaderNavigation from './HeaderNavigation'
import Upload from './Upload'

const components = [SideNavigation, IconFont, Breadcrumb, Footer, HeaderNavigation, Upload]
export default {
  install (Vue) {
    components.forEach(item => {
      Vue.component(item.name, item)
    })
  }
}
