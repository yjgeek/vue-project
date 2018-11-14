import { AUTH_DEBUG } from 'config/index'
export default {
  // api验证指令
  auth: {
    bind (el, binding, vnode) {
      if (!AUTH_DEBUG) return false
      let data = binding.value
      let bool = true
      if (typeof data === 'string') {
        data = [data]
      }
      for (let item of data.values()) {
        let val = '/api/admin/' + item
        if (global.vm.$auth.includes(val)) {
          bool = false
          break
        }
      }
      if (bool) {
        el.remove()
      }
    }
  }
}
