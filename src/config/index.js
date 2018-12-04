import globalConfigs from 'src/globalConfigs'
// 网站标题
export const TITLE = '后台管理系统'

let apiPrefix = 'http://127.0.0.1:3001/api'
let isAuth = false
let mock = true
if (process.env.NODE_ENV === 'production') { // 生产环境
  apiPrefix = 'http://39.107.98.143:4001/api'
  isAuth = true
}
export const API_PREFIX = apiPrefix

// axios 默认的配置
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 6000,
  maxContentLength: 2000,
  headers: {},
  withCredentials: true
}

// 默认的表单布局
export const defaultFormLayout = { md: { span: 22 }, lg: { span: 10 } }

// API 默认配置
export const API_DEFAULT_CONFIG = {
  mockBaseURL: '',
  mock,
  debug: false,
  sep: '/'
}

// 侧边栏导航菜单配置
export const SIDE_NAV_MENU = globalConfigs.menus

// 是否开启权限认证
export const AUTH_DEBUG = isAuth
