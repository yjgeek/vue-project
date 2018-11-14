var Mock = require('mockjs')
const mockData = require.context('./views', true, /mock\.js$/)
// Mock模拟数据
mockData.keys().forEach(item => {
  if (item.split('/').length === 4) {
    item = mockData(item).default
    Object.keys(item).forEach(key => {
      const { type, template } = item[key]
      key = '^' + key
      Mock.mock(new RegExp(key), type, template)
    })
  }
})
