var Mock = require('mockjs')
const data = require.context('./module', true, /\.js$/)
data.keys().forEach(item => {
  item = data(item).default
  Object.keys(item).forEach(key => {
    const {type, template} = item[key]
    key = '^' + key
    Mock.mock(new RegExp(key), type, template)
  })
})
