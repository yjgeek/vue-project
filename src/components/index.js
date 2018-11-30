import SideNavigation from './sideNavigation/Index'
import IconFont from './IconFont'
import Breadcrumb from './Breadcrumb'
import Footer from './Footer'
import HeaderNavigation from './HeaderNavigation'

const components = [SideNavigation, IconFont, Breadcrumb, Footer, HeaderNavigation]
export default {
  install (Vue) {
    components.forEach(item => {
      Vue.component(item.name, item)
    })
  }
}
