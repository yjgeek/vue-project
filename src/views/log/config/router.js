const Log = r => require.ensure([], () => r(require('../Index')), 'log')
export default {
  path: '/log',
  name: 'log',
  component: Log
}
