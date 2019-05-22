import axios from './axios'
import {pick, assign, isEmpty} from 'lodash'
import {API_DEFAULT_CONFIG} from 'config/index'
import globalConfigs from 'src/globalConfigs'
class MakeApi {
  constructor (options) {
    this.api = {}
    this.apiBuilder(options)
  }
  apiBuilder ({
    sep = '|',
    config = {},
    mock = false,
    debug = false,
    mockBaseURL = ''
  }) {
    Object.keys(config).map(namespace => {
      this._apiSingleBuilder({
        namespace,
        mock,
        mockBaseURL,
        sep,
        debug,
        config: config[namespace]
      })
    })
  }
  _apiSingleBuilder ({
    namespace,
    sep = '|',
    config = {},
    mock = false,
    debug = false,
    mockBaseURL = ''
  }) {
    config.forEach(api => {
      const { name, desc, params, method, path, mockPath, isMock, source } = api
      let str = name.substring(0, 1).toUpperCase() + name.substring(1)
      let apiname = `${namespace}${str}` // 驼峰命名空间
      let url = mock ? mockPath || path : path // 控制走 mock 还是线上
      let baseURL = mock && mockBaseURL
      // 通过全局配置开启调试模式。
      debug && console.info(`调用服务层接口${apiname}，接口描述为${desc}`)
      // debug && assert(name, `${apiUrl} :接口name属性不能为空`)
      // debug && assert(apiUrl.indexOf('/') === 0, `${apiUrl} :接口路径path，首字符应为/`)

      Object.defineProperty(this.api, apiname, {
        value (outerParams = {}, outerOptions = {}) {
          // 请求参数自动截取, 请求参数不传则发送默认配置参数。
          let _code = outerParams['_code']
          if (_code) {
            outerOptions['_code'] = _code
          }
          let _data = isEmpty(outerParams) ? params : pick(assign({}, params, outerParams), Object.keys(params))
          return axios(_normoalize(assign({
            url,
            desc,
            baseURL,
            method,
            isMock,
            source
          }, outerOptions), _data))
        }
      })
    })
  }
}

function _normoalize (options, data) {
  // 这里可以做大小写转换，也可以做其他类型 RESTFUl 的兼容
  options.method = options.method ? options.method.toUpperCase() : 'GET'
  if (options.method === 'POST') {
    options.data = data
  } else if (options.method === 'GET') {
    options.params = data
  }
  return options
}
// 注入模型和全局配置，并暴露出去
export default new MakeApi({
  config: globalConfigs.apis,
  ...API_DEFAULT_CONFIG
})['api']
