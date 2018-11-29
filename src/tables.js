const data = require.context('./views', true, /table\.js$/)
let tables = []
// Mock模拟数据
data.keys().forEach(item => {
  if (item.split('/').length === 4) {
    item = data(item).default
    tables.push(item)
  }
})
let obj = {tables: [], datas: {}}
tables.forEach(item => {
  if (item.tables && item.tables instanceof Array) {
    obj.tables = obj.tables.concat(item.tables)
  }
  if (item.datas) {
    obj.datas = Object.assign(obj.datas, item.datas)
  }
})
export default obj
