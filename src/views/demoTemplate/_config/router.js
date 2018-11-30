const User = r => require.ensure([], () => r(require('../Index')), 'user')
export default {
  path: '/user',
  name: 'user',
  component: User
}
