const data = require.context('./module', true, /\.js$/)
let obj = {}
data.keys().forEach(item => {
  let prefix = item.replace(/\.\/(.*)\.js$/, '$1')
  item = data(item).default
  if (item) {
    obj[prefix] = item
  }
})
export default obj
