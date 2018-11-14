import {resSend, Mock, parseOption} from '../util'
let currentCode = ''
export default {
  '/admin/auth/login?.*': {
    type: 'post',
    template (option) {
      const {params} = parseOption(option)
      const {account, code, password} = params
      if (Mock.Random.lower(code) !== Mock.Random.lower(currentCode)) {
        return resSend(null, 422, '验证码错误')
      }
      if (account === 'admin' && password === '123456') {
        return resSend({
          isAdmin: true,
          email: Mock.Random.email(),
          created_at: Mock.Random.date(),
          name: 'admin',
          phone: '13800138000',
          qq: 15645623,
          status: 1,
          updated_at: Mock.Random.date(),
          userR: [{id: 1, name: '超级管理员'}],
          weixin: null
        })
      }
      return resSend(null, 422, '用户名为admin, 密码: 123456')
    }
  },
  '/admin/auth/verificationCode?.*': {
    type: 'get',
    template (option) {
      currentCode = Mock.Random.first()
      return resSend(Mock.Random.image('100x40', Mock.Random.color(), currentCode))
    }
  },
  '/admin/auth/permissionList?.*': {
    type: 'get',
    template (option) {
      return resSend(['/api/admin/auth/permissionList'])
    }
  },
  '/admin/auth/logout?.*': {
    type: 'get',
    template (option) {
      return resSend()
    }
  }
}
