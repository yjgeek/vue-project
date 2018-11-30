import { isArray, isObject } from 'lodash'
/**
 * 解析带有#{}的内容
 * @param {*} value 需要解析的数据
 * @param {Object} data 替换的数据源
 */
export function analysisParams (value, data) {
  let isJson = false
  if (isArray(value) || isObject(value)) {
    isJson = true
    value = JSON.stringify(value)
  }
  if (value.includes('#{')) {
    value = value.replace(/#{(.+?)}/g, function (a, key) {
      // 判断是否是对象
      if (isObject(data)) {
        if (Reflect.has(data, key)) {
          return Reflect.get(data, key)
        }
        return ''
      }
      return data
    })
  }
  if (isJson) {
    return JSON.parse(value)
  } else {
    return value
  }
}

export const Mock = require('mockjs')
Mock.XHR.prototype.__send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function () {
  if (this.custom.xhr) { this.custom.xhr.withCredentials = this.withCredentials || false }
  this.__send.apply(this, arguments)
}

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
export const parseOption = ({ type, url, body }) => {
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
/**
 * Array根据Object的某个key进去排序
 * @param {String} key 要排序的key
 */
export const sortObj = (key) => {
  return function (obj1, obj2) {
    var val1 = obj1[key] !== undefined ? obj1[key] : 1
    var val2 = obj2[key] !== undefined ? obj2[key] : 1
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1)
      val2 = Number(val2)
    }
    if (val1 < val2) {
      return -1
    } else if (val1 > val2) {
      return 1
    } else {
      return 0
    }
  }
}
