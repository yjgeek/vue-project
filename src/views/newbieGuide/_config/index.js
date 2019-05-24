const Index = r => require.ensure([], () => r(require('../Index')), 'newbieGuide')
export default {
  router: {
    path: '/newbieGuide',
    name: 'newbieGuide',
    component: Index,
    meta: {
      bread: ['新手指引']
    }
  },
  menu: {
    text: '新手指引',
    icon: 'question',
    path: '/newbieGuide'
  }
}
