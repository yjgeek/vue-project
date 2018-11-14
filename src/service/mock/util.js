export const Mock = require('mockjs')
Mock.setup({
  timeout: '200-1000'
})

/**
 * 正常响应数据
 * @param {*} data
 * @param {*} code
 * @param {*} message
 * @return {
 *  code: 200,
 *  data: null,
 *  message: 'success'
 * }
 */
export const resSend = (data = null, code = 200, message = 'success') => {
  data = Mock.mock(data)
  return {
    code,
    data,
    message
  }
}

/**
 * 响应列表数据(包含分页那些)
 * @param {Array} data
 * @return {
 *  current_page: 1,
 *  from:  1,
 *  last_page: 2,
 *  per_page: 15,
 *  to: 3,
 *  total: 15,
 *  data: [{}]
 * }
 */
export const resSendList = (data) => {
  data = Mock.mock(data)
  return resSend({
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 15,
    to: 3,
    total: 15,
    ...data
  })
}
/**
 * 解析option的参数
 * @param {
 *  type: 'get',
 *  url: '/admin/user/index?id=1',
 *  body: null | Array | Object | String | Number
 * } option
 * @return {
 *  url: '/admin/user/index',
 *  params: {id: 1},
 *  type: 'get',
 *  body: null
 * }
 */
export const parseOption = ({type, url, body}) => {
  type = Mock.Random.lower(type)
  let obj = { type, params: {}, url }
  if (type === 'get') {
    let arr = url.split('?')
    obj['url'] = arr[0]
    if (arr[1]) {
      let params = arr[1].split('&')
      params.forEach(item => {
        item = item.split('=')
        obj['params'][item[0]] = item[1]
      })
    }
  } else if (type === 'post' && body) {
    try {
      body = JSON.parse(body)
    } catch (e) {

    }
    obj['params'] = body
  }
  return obj
}
