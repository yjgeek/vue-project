const Dashboard = r => require.ensure([], () => r(require('../Index')), 'dashboard')
const DashboardList = r => require.ensure([], () => r(require('../list/Index')), 'dashboard')
const DashboardWebsite = r => require.ensure([], () => r(require('../website/Index')), 'dashboard')
export default {
  path: '/dashboard',
  component: Dashboard,
  meta: {
    bread: ['仪表盘管理']
  },
  children: [
    {
      path: '',
      name: 'dashboard',
      component: DashboardList,
      meta: {
        bread: ['双11巅峰对决']
      }
    },
    {
      path: 'list',
      name: 'dashboardList',
      component: DashboardList,
      meta: {
        bread: ['双11巅峰对决']
      }
    },
    {
      path: 'website',
      name: 'dashboardWebsite',
      component: DashboardWebsite,
      meta: {
        bread: ['站点统计']
      }
    }
  ]
}
