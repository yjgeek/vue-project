export default [{
  name: 'developmentOtherIndex',
  method: 'GET',
  desc: '获取开发日志',
  path: '/admin/log/developmentOtherIndex',
  mockPath: '',
  isMock: false,
  params: {
    page: 1,
    limit: 20,
    sort: 'desc'
  }
}, {
  name: 'developmentOtherAdd',
  method: 'POST',
  desc: '添加开发日志',
  path: '/admin/log/developmentOtherAdd',
  mockPath: '',
  isMock: false,
  params: {
    title: '',
    description: '',
    content: ''
  }
}, {
  name: 'developmentOtherUpdate',
  method: 'POST',
  desc: '更新开发日志',
  path: '/admin/log/developmentOtherUpdate',
  mockPath: '',
  isMock: false,
  params: {
    id: null,
    title: '',
    description: '',
    content: ''
  }
}]
