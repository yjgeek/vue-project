const data = require.context('./', true, /\.vue$/)
let obj = {}
data.keys().forEach(item => {
  item = data(item).default
  let prefix = item.name
  if (item) {
    obj[prefix] = item
  }
})
export default obj
