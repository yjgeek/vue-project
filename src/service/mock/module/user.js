import { resSend, resSendList, Mock, parseOption } from '../util'
export default {
  '/admin/user/index?.*': {
    type: 'get',
    template: resSendList({
      'data|1-10': [{
        id: Mock.Random.id(),
        isAdmin: true,
        email: Mock.Random.email(),
        created_at: Mock.Random.date(),
        name: Mock.Random.first(),
        phone: '13800138000',
        qq: 15645623,
        status: 1,
        updated_at: Mock.Random.date(),
        userR: [{id: 1, name: '超级管理员'}],
        weixin: null
      }]
    })
  },
  '/admin/user/add': {
    type: 'post',
    template (option) {
      const {params} = parseOption(option)
      return resSend(params)
    }
  }
}
