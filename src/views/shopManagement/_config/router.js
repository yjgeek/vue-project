const shopManagement = r => require.ensure([], () => r(require('../Index')), 'shop')
const RouterView = r => require.ensure([], () => r(require('src/RouterView')), 'shop')
const CategoryIndex = r => require.ensure([], () => r(require('../product/category/Index')), 'shop')
export default {
  path: '/shop',
  name: 'shop',
  meta: {
    bread: ['商城后台管理']
  },
  component: shopManagement,
  children: [
    {
      path: 'product',
      name: 'shopProduct',
      component: RouterView,
      meta: {
        bread: ['商品管理']
      },
      children: [
        {
          path: 'category',
          name: 'category',
          component: CategoryIndex,
          meta: {
            bread: ['分类列表']
          }
        }
      ]
    }
  ]
}
