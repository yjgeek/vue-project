import { resSend, resSendList, Mock, parseOption } from 'utils/index'
let resources = [];
const floders = ['博客', '足迹', '生活', '随笔'];
for (let i = 0; i < 10; i++) {
  resources.push({
    "type": 1,
    "name": floders[i] || '新建文件夹'+i,
    "parent_id": 0,
    "id": i+1,
  })
}
export default {
  '/resourceExpansion/index?.*': {
    type: 'get',
    template: resSend([
      { "cover": "small_url", "name": "png", },
      { "cover": "small_url", "name": "jpeg", },
      { "cover": "small_url", "name": "jpg", },
      { "cover": "middle_url", "name": "mp4", },
      { "cover": "middle_url", "name": "gif", }
    ])
  },
  '/resource/index?.*': {
    type: 'get',
    template: resSend({
      resources,
      pathList: [
        {
          "name": "根目录",
          "id": 0
        }
      ]
    })
  },
  '/resource/add?.*': {
    type: 'post',
    template: function (options, b,c) {
      const { params} = parseOption(options)
      if (params.data) {
        const data = params.data;
        if (data.type === 1) {
          resources = [{
            "type": data.name,
            "name": data.name || '新建文件夹' + i,
            "parent_id": 0,
            "id": i + 1,
          }, ...resources]
        }
      }
      params.push({
        "type": 1,
        "name": floders[i] || '新建文件夹' + i,
        "parent_id": 0,
        "id": i + 1,
      })
      return resSend({
        resources,
        pathList: [
          {
            "name": "根目录",
            "id": 0
          }
        ]
      })
    }
  },
}
