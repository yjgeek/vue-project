export default {
  prefix: 'shop',
  data: [
    {
      name: 'resourceIndex',
      method: 'GET',
      desc: '资源列表',
      path: 'http://127.0.0.1:4000/api/resource/index',
      isMock: false,
      mockPath: '',
      params: {
        limit: 30,
        page: '',
        keyword: '',
        parent_id: 0
      }
    },
    {
      name: 'resourceAdd',
      method: 'POST',
      desc: '添加资源',
      path: 'http://127.0.0.1:4000/api/resource/add',
      isMock: false,
      mockPath: '',
      params: {
        parent_id: 0,
        data: []
      }
    },
    {
      name: 'resourceUpdate',
      method: 'POST',
      desc: '更改资源',
      path: 'http://127.0.0.1:4000/api/resource/update',
      isMock: false,
      mockPath: '',
      params: {
        id: null,
        name: '',
        type: 1,
        group_id: null
      }
    },
    {
      name: 'resourceDelete',
      method: 'POST',
      desc: '删除资源',
      path: 'http://127.0.0.1:4000/api/resource/delete',
      isMock: false,
      mockPath: '',
      params: {
        leave_paths: null,
      }
    },
    {
      name: 'resourceChangeDirection',
      method: 'GET',
      desc: '旋转图片',
      path: 'http://127.0.0.1:4000/api/resource/changeDirection',
      isMock: false,
      mockPath: '',
      params: {
        id: null,
        angle: 0
      }
    },
    {
      name: 'resourceExpandIndex',
      method: 'GET',
      desc: '资源扩展列表',
      path: 'http://127.0.0.1:4000/api/resourceExpansion/index',
      isMock: false,
      mockPath: '',
      params: {
      }
    },
  ]
}
