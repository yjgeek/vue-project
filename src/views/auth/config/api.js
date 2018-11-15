export default [{
  name: 'login',
  method: 'POST',
  desc: '登录',
  path: '/admin/auth/dologin',
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
  path: '/common/public/verificationCode',
  mockPath: '',
  isMock: false,
  params: {}
}, {
  name: 'permissionList',
  method: 'GET',
  desc: '获取这个用户的全部权限',
  path: '/common/public/permissionList',
  mockPath: '',
  isMock: false,
  params: {}
}, {
  name: 'logout',
  method: 'GET',
  desc: '退出登录',
  path: '/admin/auth/logout',
  mockPath: '',
  isMock: false,
  params: {}
}]
