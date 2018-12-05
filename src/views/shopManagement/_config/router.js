const shopManagement = r => require.ensure([], () => r(require('../Index')), 'shop')
const RouterView = r => require.ensure([], () => r(require('src/RouterView')), 'shop')
const GoodIndex = r => require.ensure([], () => r(require('../product/Index')), 'shop')
const GoodAddEditView = r => require.ensure([], () => r(require('../product/AddEditView')), 'shop')
const CategoryIndex = r => require.ensure([], () => r(require('../product/category/Index')), 'shop')
const CategoryAddEditView = r => require.ensure([], () => r(require('../product/category/children/AddEditView')), 'shop')
const MarketingIndex = r => require.ensure([], () => r(require('../marketing/Index')), 'shop')

// 营销方案管理
const marketing = {
  path: 'marketing',
  name: 'shopMarketing',
  component: MarketingIndex,
  meta: {
    bread: ['营销方案管理']
  }
}
// 商品管理
const product = {
  path: 'product',
  name: 'shopProduct',
  component: RouterView,
  meta: {
    bread: ['商品管理']
  },
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
export default {
  path: '/shop',
  name: 'shop',
  meta: {
    bread: ['商城后台管理']
  },
  component: shopManagement,
  children: [
    ...product,
    ...marketing
  ]
}
