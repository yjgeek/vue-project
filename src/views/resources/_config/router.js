const RouterView = r => require.ensure([], () => r(require('src/RouterView')), 'resources')
const ResourceIndex = r => require.ensure([], () => r(require('../Index')), 'resources')
export default {
  path: '/resource',
  meta: {
    bread: ['资源管理平台']
  },
  component: RouterView,
  children: [
    {
      path: '',
      name: 'resource',
      component: ResourceIndex,
      meta: {
        bread: ['资源列表']
      }
    }
  ]
}
