const apiData = require.context('./views', true, /api\.js$/)
// 线上的接口
let obj = {}
apiData.keys().forEach(item => {
  let prefix = item.replace(/\.\/(.*)\/.*\/.*\.js$/, '$1')
  item = apiData(item).default
  if (item) {
    obj[prefix] = item
  }
})

export default obj
