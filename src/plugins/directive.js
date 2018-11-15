export default {
  // 基于我自己的权限认证逻辑，如果你要用这个，可以修改成你自己的逻辑
  auth: {
    inserted (el, binding) {
      let data = binding.value
      let bool = true
      if (typeof data === 'string') {
        data = [data]
      }
      for (let item of data.values()) {
        let val = '/api/admin/' + item
        if (window.$variable.vm.$auth.includes(val)) {
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
