import { Message } from 'element-ui'
import { API_PREFIX, API_DEFAULT_CONFIG } from 'config/index'

export function requestSuccessFunc (requestObj) {
  let api = API_DEFAULT_CONFIG.mock ? API_DEFAULT_CONFIG.mockBaseURL + requestObj.url : API_PREFIX + requestObj.url
  if (requestObj.source === "resource") {
    requestObj.headers['Authorization'] = 'c91c095894f74f9aa8c200972d762708155851247724413480000000'
  } else {
    if (requestObj.isMock === false) {
      if (!/^https/.test(api)) {
        api = API_PREFIX + requestObj.url
        requestObj.withCredentials = true;
      }
    }
    requestObj.url = api
  }
  return requestObj
}
// 请求错误 比如断网
export function requestFailFunc (requestError) {
  return Promise.reject(requestError)
}

// 响应成功
export function responseSuccessFunc (responseObj) {
  let { data } = responseObj
  let code = data.code
  switch (code) {
    case 200:
      return data.data
    case 401:
      Message.error('请登录!')
      window.location.href = `${window.location.origin}/#/login`
      return Promise.reject(data)
    default:
      let status = responseObj.config._code // 特殊code需要下发到业务方,就不用弹框提示
      if (status) {
        if (!(status instanceof Array)) status = [status]
        if (status.includes(code)) return Promise.reject(data)
      }
      Message.error(data.message)
      return Promise.reject(data)
  }
}

// 响应错误
export function responseFailFunc (responseError) {
  Message.error('服务器出错，请联系管理员!')
  return Promise.reject(responseError)
}
