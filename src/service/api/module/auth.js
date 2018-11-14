export default [{
  name: 'login',
  method: 'POST',
  desc: '登录',
  path: '/admin/auth/login',
  isMock: false,
  mockPath: '',
  params: {
    account: '',
    password: '',
    code: ''
  }
}, {
  name: 'verificationCode',
  method: 'GET',
  desc: '获取验证码',
  path: '/admin/auth/verificationCode',
  mockPath: '',
  isMock: false,
  params: {}
}, {
  name: 'logout',
  method: 'GET',
  desc: '退出登录',
  path: '/admin/auth/logout',
  mockPath: '',
  params: {}
}]
