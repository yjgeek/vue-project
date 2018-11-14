export function beforeEach (to, from, next) {
  // meta 带有auth: false 就是不用验证的
  if (to.meta.auth === false) {
    next()
  } else {
    // 验证是通过localStorage的用户信息来保存的
    if (!localStorage.user) {
      next('/login')
      return false
    } else {
      next()
      return false
    }
  }
  next()
}
