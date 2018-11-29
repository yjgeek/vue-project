# vue-project

> 一个大杂烩的项目,里面的内容想到什么就写什么，比如尝试vue的一些特性, 还有一些好玩的插件等等，如果感兴趣的话，欢迎Fork！

线上地址:
[http://vue.yjgeek.com](http://vue.yjgeek.com)

账号: vue-test
密码: 123456

<small>这个项目是的架构是基于我另外一个模板搞的[vue-cli2的一个后台管理框架](https://github.com/yuanjie007/element-admin)</small>，感兴趣的话可以去耍耍，我根据这个项目的一些特殊性又重新调整了下，下面我就来说下整体的一个架构吧

```json
├─build ----------------------------------------vue-cli的配置文件
│  └─webpack.base.conf.js------------------这里我添加了路径的别名,可以看下
├─config----------------------------------------vue-cli的配置文件
├─src
│  ├─assets--------------------------------------存放静态文件(可变的)
│  ├─components-------------------------------存放公共的组件，具体组件可以去看下
│  ├─config--------------------------------------全局的一些配置
│  │  └─index.js----------------------------------配置入口文件
│  │  └─menu.js----------------------------------左侧导航栏的菜单
│  │  └─interceptors-----------------------------全局的拦截器
│  │      └─index.js-------------------------------------拦截器入口文件
│  │      └─axios.js-------------------------------------axios拦截器
│  │      └─router.js-------------------------------------vue-router拦截器
│  ├─plugins--------------------------------------------存放插件
│  │      api.js-------------------------------------封装的API插件
│  │      axios.js-----------------------------------对axios的封装
│  │      indect.js----------------------------------全局的注入文件
│  │      directive.js----------------------------------全局的自定义指令
│  │      mixin.js-----------------------------------全局的mixin,通过indect注入
│  │      router.js-----------------------------------vue-router实例化路由
│  ├─utils------------------------------------------存放一些公共的工具
│  └─views-----------------------------------------存放的页面文件
│  │  └─home-----------------------------------------一个home模块
│  │    └─config-------------存放home模块的一些配置(router, api, mock)
│  │    │    └─api.js-----------------------api接口配置
│  │    │    └─router.js--------------------路由配置
│  │    │    └─mock.js--------------------mock配置
│  │    │    └─store.js--------------------vuex配置
│  │    │    └─table.js--------------------indexeddb的数据表
│  │    └─Index.vue-------------------------模块的主页
└─static--------------------------------------------存放静态资源文件(不可变的)
└─main.js-------------------------------------------主入口文件
└─apis.js-------------------------------------------全局的api配置的入口文件
└─mocks.js-------------------------------------------全局的mock配置的入口文件
└─router.js-----------------------------------------全局的vue-router配置的入口文件
└─stores.js-------------------------------------------全局的vuex配置的入口文件
└─tables.js-------------------------------------------全局的indexeddb配置的入口文件
```

### views目录
```views```下的第一级目录就是模块名称，比如下面的home就是叫home的模块，然后模块下面有一个```config```的文件夹，专门用来存这个模块的一些配置文件,如(api,router,mock,store)
```json
└─views
    └─home
        │─config
        │    └─api.js-----------------------api接口配置(不可更改)
        │    └─router.js--------------------路由配置(不可更改)
        │    └─mock.js--------------------mock配置(不可更改)
        │    └─store.js--------------------vuex配置(不可更改)
        │    └─table.js--------------------indexeddb配置(不可更改)
        └─index.vue--------默认模块的主页，这个名称可以改
```
```config```目录下的配置文件会被```src```目录下对应的配置文件自动引入(apis, routers, mocks, stores, tables)，所以无需手动去引入这些文件,```api.js、router.js```这两个是必须的

**我这里贴下每个配置文件的代码**

api.js
```js
export default [{
  name: 'index',
  method: 'GET',
  desc: '登录',
  path: '/admin/user/index',
  mockPath: '',
  isMock: true, //这个接口是否用mock来模拟数据，不需要设为false,默认true
  params: {
  }
}]
// 调用 模块名称(比如上面的是home) + api的name,最后采用小驼峰写法，homeIndex
this.$api['homeIndex']({}).then(res => {}).catch(err => {})
```
router.js
```js
const Home = r => require.ensure([], () => r(require('../Index')), 'home')
export default {
  path: '/home',
  name: 'home',
  component: Home,
  meta: {
    // 面包屑导航，String和Object 如果是Object： text: 显示的文字, url：对应路由的name, params: 需要传的参数
    bread: ['首页', {text: '列表', url: 'home', params: {id: 1}}]
  }
}
```
mock.js
```js
import { resSend, resSendList, Mock, parseOption } from 'utils/index'
// resSend 返回接口的方法，可以返回统一格式的数据，建议全部都采用这个方法返回
// resSendList 返回列表数据的方法，可以返回带有分页、总页等等统一格式的数据，建议列表都采用这个方法返回
// Mock Mock的实例化方法
// parseOption 解析mock template的回调方法的options参数
// 以上方法详情请看代码
export default {
  // 如果这个路由是用get的话，后面一定要加?.*不然匹配不到， 其他的就是mock的配置了，就直接看文档吧
  '/admin/user/index?.*': {
    type: 'get',
    template: resSendList({
      'data|1-10': [{
        id: Mock.Random.id(),
        isAdmin: true,
        email: Mock.Random.email(),
        created_at: Mock.Random.date(),
        name: Mock.Random.first(),
        phone: '13800138000',
        qq: 15645623,
        status: 1,
        updated_at: Mock.Random.date(),
        userR: [{id: 1, name: '超级管理员'}],
        weixin: null
      }]
    })
  }
}
```
store.js
```js
export default {
  namespaced: true,
  state: { count: 0 },
  getter: { add () {} },
  mutation: { login () {} },
  action: { login () {} }
}
//调用方式通过模块方式调用 vuex模块调用文档： https://vuex.vuejs.org/zh/guide/modules.html
// 如上面的模块是home

this.$store.state.home.count
this.$store.getters['home/add']
this.$store.dispatch['home/login']
this.$store.commit['home/login']

```
table.js
```js
export default {
  tables: [
    {
      name: 'product', // 表名称
      columns: [ //列定义 具体可查看jsstore文档: http://jsstore.net/tutorial/column/
        {name: 'id', primaryKey: true, autoIncrement: true},
        {name: 'itemName', notNull: true, dataType: JsStore.DATA_TYPE.String},
        {name: 'price', notNull: true, dataType: JsStore.DATA_TYPE.Number},
        {name: 'quantity', notNull: true,dataType: JsStore.DATA_TYPE.Number}
      ]
    }
  ],
  datas: {
    product: [
      {itemName: 'apple', price: 100, quantity: 1000},
      {itemName: 'banana', price: 100, quantity: 1000}
    ]
  }
}
```
大致就是上面这些，其他的就直接看代码吧