const RouterView = r => require.ensure([], () => r(require('../Index')), 'shop')
const GoodIndex = r => require.ensure([], () => r(require('../product/Index')), 'shop')
const GoodAddEditView = r => require.ensure([], () => r(require('../product/AddEditView')), 'shop')
const CategoryIndex = r => require.ensure([], () => r(require('../product/category/Index')), 'shop')
const CategoryAddEditView = r => require.ensure([], () => r(require('../product/category/children/AddEditView')), 'shop')
export default {
  path: '/list',
  name: 'list',
  meta: {
    bread: ['商城后台管理']
  },
  component: RouterView,
  children: [
    {
      path: 'category',
      name: 'shopCategory',
      component: CategoryIndex,
      meta: {
        bread: ['分类列表']
      },
      children: [
        {
          path: 'add',
          name: 'shopCategoryAdd',
          component: CategoryAddEditView,
          meta: {
            bread: ['分类添加']
          }
        }, {
          path: 'edit',
          name: 'shopCategoryEdit',
          component: CategoryAddEditView,
          meta: {
            bread: ['分类更改']
          }
        }
      ]
    },
    {
      path: 'good',
      name: 'shopGood',
      component: GoodIndex,
      meta: {
        bread: ['商品列表']
      }
    },
    {
      path: 'goodAdd',
      name: 'shopGoodAdd',
      component: GoodAddEditView,
      meta: {
        bread: [{ text: '商品列表', url: 'shopGood' }, '商品添加']
      }
    },
    {
      path: 'goodEdit',
      name: 'shopGoodEdit',
      component: GoodAddEditView,
      meta: {
        bread: [{ text: '商品列表', url: 'shopGood' }, '商品更改']
      }
    }
  ]
}
