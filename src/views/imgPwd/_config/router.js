const ImgLock = r => require.ensure([], () => r(require('../Index')), 'img-lock')
export default {
  path: '/imgpwd',
  name: 'imgpwd',
  meta: {
    bread: ['图案解锁']
  },
  component: ImgLock,
}
