export default {
  prefix: 'resources',
  data: [
    {
      name: 'index',
      method: 'GET',
      desc: '资源列表',
      source: 'resource',
      path: 'https://resource.yjgeek.com/api/resource/index',
      source: 'resource',
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
      name: 'add',
      method: 'POST',
      desc: '添加资源',
      source: 'resource',
      path: 'https://resource.yjgeek.com/api/resource/add',
      source: 'resource',
      isMock: false,
      mockPath: '',
      params: {
        parent_id: 0,
        data: []
      }
    },
    {
      name: 'update',
      method: 'POST',
      desc: '更改资源',
      source: 'resource',
      path: 'https://resource.yjgeek.com/api/resource/update',
      source: 'resource',
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
      name: 'delete',
      method: 'POST',
      desc: '删除资源',
      source: 'resource',
      path: 'https://resource.yjgeek.com/api/resource/delete',
      source: 'resource',
      isMock: false,
      mockPath: '',
      params: {
        leave_paths: null,
      }
    },
    {
      name: 'expandIndex',
      method: 'GET',
      desc: '资源扩展列表',
      source: 'resource',
      path: 'https://resource.yjgeek.com/api/resourceExpansion/index',
      source: 'resource',
      isMock: false,
      mockPath: '',
      params: {
      }
    },
  ]
}
