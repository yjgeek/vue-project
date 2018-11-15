const Log = r => require.ensure([], () => r(require('../Index')), 'log')
export default {
  path: '/log',
  name: 'log',
  component: Log,
  meta: {
    bread: ['日志中心']
  }
}
