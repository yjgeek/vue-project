export default [{
  name: 'platformTransactionLumpSum',
  method: 'GET',
  desc: '双11各大平台交易总额',
  path: '/dashboard/list/platformTransactionLumpSum',
  mockPath: '',
  params: {
  }
}, {
  name: 'platform24HourCount',
  method: 'GET',
  desc: '各大平台24小时每个小时的成交额',
  path: '/dashboard/list/platform24HourCount',
  mockPath: '',
  params: {
  }
}, {
  name: 'platformProductTop10',
  method: 'GET',
  desc: '全网平台销售前10的商品',
  path: '/dashboard/list/platformProductTop10',
  mockPath: '',
  params: {
  }
}, {
  name: 'platformRanking',
  method: 'GET',
  desc: '全网平台各种排行',
  path: '/dashboard/list/platformRanking',
  mockPath: '',
  params: {
  }
}, {
  name: 'realTimeTraffic',
  method: 'GET',
  desc: 'type===1?今日实时流量 昨日流量 预计今日流量:昨天这个时候流量 每日平均访问量 历史访问峰值',
  path: '/dashboard/website/realTimeTraffic',
  mockPath: '',
  params: {
    type: 1
  }
}, {
  name: 'trend',
  method: 'GET',
  desc: '访问趋势，和昨天对比',
  path: '/dashboard/website/trend',
  mockPath: '',
  params: {
    type: 'PV数'
  }
}, {
  name: 'keyword',
  method: 'GET',
  desc: '检索关键字 做成一个词云',
  path: '/dashboard/website/keyword',
  mockPath: '',
  params: {}
}, {
  name: 'sourceWebsite',
  method: 'GET',
  desc: '来源站点',
  path: '/dashboard/website/sourceWebsite',
  mockPath: '',
  params: {}
}, {
  name: 'sourcePage',
  method: 'GET',
  desc: '来源页面',
  path: '/dashboard/website/sourcePage',
  mockPath: '',
  params: {}
}, {
  name: 'pageTop10',
  method: 'GET',
  desc: '受欢迎的页面Top10',
  path: '/dashboard/website/pageTop10',
  mockPath: '',
  params: {}
}, {
  name: 'userInfo',
  method: 'GET',
  desc: '新老访客',
  path: '/dashboard/website/userInfo',
  mockPath: '',
  params: {}
}]
