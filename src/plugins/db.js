/* eslint import/no-webpack-loader-syntax: off */
import * as JsStore from 'jsstore'
import {Mock} from 'utils/index'
const Worker = require('worker-loader?publicPath=/&name=jsstore.worker.js!jsstore/dist/jsstore.worker.min')
class DB {
  constructor () {
    this.connent = null
    this.config = {
      timeout: '400-800'
    }
  }
  /**
   * 初始化数据库
   * @param {String} name 数据库名字默认为db
   * @param {Array} tables 数据库的表
   * @return {Promise} true已存在这个数据库 false不存在这个数据库
   */
  async initDB (name = 'db', tables = []) {
    let connent = new JsStore.Instance(new Worker())
    let isExist = await connent.isDbExist(name)
    if (isExist) {
      connent.openDb(name)
    } else {
      connent.createDb({name,
        tables: tables
      })
    }
    this.connent = connent
    return isExist
  }
  /**
   * 插入数据到数据表
   * @param {String} table 表名称 required
   * @param {Array | Object} data 插入的数据 required
   * @return {Promise} 成功返回刚插入的数据用Array包装
   */
  async add (table, data) {
    data = data instanceof Array ? data : [data]
    if (!this.connent) {
      await this.initDB()
    }
    data = data.map(item => {
      if (!item.create_time && item.create_time !== false) {
        let date = Mock.Random.now('yyyy-MM-dd HH:mm:ss')
        item['create_time'] = date
        item['update_time'] = date
      }
      return item
    })
    return new Promise(async (resolve, reject) => {
      try {
        await this.connent.insert({
          into: table,
          values: data
        })
        this.responseData(resolve, data)
      } catch (err) {
        this.responseData(reject, err)
      }
    })
  }
  /**
   * 更新数据表的数据
   * @param {String} table 表名称 required
   * @param {Object} data 更新表的数据 required
   * @param {Object | null} where 更新表的额外条件如果不传默认使用data['id']作为更新条件
   * @return {Promise} 成功返回刚更新的数据
   */
  async update (table, data = {}, where) {
    if (!this.connent) {
      await this.initDB()
    }
    if (typeof data === 'object' && data.update_time !== false) {
      data['update_time'] = Mock.Random.now('yyyy-MM-dd HH:mm:ss')
    }
    where = where || {id: data['id']}
    return new Promise(async (resolve, reject) => {
      try {
        await this.connent.update({
          in: table,
          set: data,
          where: where
        })
        this.responseData(resolve, data)
      } catch (err) {
        this.responseData(reject, err)
      }
    })
  }
  /**
   * 删除数据表数据
   * @param {String} table 表名称 required
   * @param {Number | Array(Number,Number) | Object} data 删除数据的条件，如果传Number&Array则以id为条件 required
   * @return {Promise}
   */
  async remove (table, data) {
    if (!this.connent) await this.initDB()
    let where = {}
    if (typeof data === 'number') {
      where['id'] = data
    } else if (data instanceof Array) {
      where['id'] = {in: data}
    } else {
      where = data
    }
    return new Promise(async (resolve, reject) => {
      try {
        this.connent.remove({
          from: table,
          where: where
        })
        this.responseData(resolve, true)
      } catch (err) {
        this.responseData(reject, err)
      }
    })
  }
  /**
   * 查询数据表数据
   * @param {String} table 表名称 required
   * @param {Object | null} where 查询条件
   * @param {Object} other 查询函数比如: limit、order by、group by
   * @return {Promise} 成功返回查询出来的数据
   */
  async select (table, where = null, other = {}, timeout) {
    if (!this.connent) await this.initDB()
    return new Promise(async (resolve, reject) => {
      try {
        let res = await this.connent.select({
          from: table,
          where,
          ...other
        })
        this.responseData(resolve, res, timeout)
      } catch (err) {
        this.responseData(reject, err)
      }
    })
  }

  /**
   * 默认根据主键查找数据
   * @param {String} table 表名称 required
   * @param {Object | Number} where 查询条件 required
   * @param {Object} other 查询函数比如: limit、order by、group by
   * @return {Promise} {} 成功返回查询出来的数据
   */
  async find (table, where = null, other = {}, timeout) {
    if (!this.connent) await this.initDB()
    if (typeof where === 'number') {
      let id = where
      where = { id }
    }
    return new Promise(async (resolve, reject) => {
      try {
        let res = await this.connent.select({
          from: table,
          where,
          ...other
        })
        if (res[0]) {
          this.responseData(resolve, res[0], timeout)
        } else {
          this.responseData(reject, '没有找到相应的数据')
        }
      } catch (err) {
        this.responseData(reject, err)
      }
    })
  }
  /**
   * 自定义分页函数
   * @param {String} table 表名称 required
   * @param {Object} where 查询条件一定要有这两个参数{limit: 15, page: 1} required
   * @param {Object} other 查询函数比如: limit、order by、group by
   * @return {Promise} 成功返回{totalCount(总数据条数): 20, totalPage(总页数): 2, page(当前页码): 1, limit(每次查询多少条数据): 10, data(数据): [{},{}]}
   */
  async page (table, where = {limit: 15, page: 1}, other = {}) {
    if (!this.connent) await this.initDB()
    let limit = where.limit
    let page = where.page
    delete where.limit
    delete where.page
    let skip = (page - 1) * limit
    let baseOther = {}
    baseOther['order'] = {
      by: 'id',
      type: 'desc'
    }
    other = {...baseOther, ...other, skip, limit}
    let obj = {}
    where = this.filterWhere(where)
    return new Promise(async (resolve, reject) => {
      try {
        obj['data'] = await this.connent.select({from: table, ...other, where})
        obj['totalCount'] = await this.connent.count({from: table, where})
        obj['totalPage'] = Math.ceil(obj['totalCount'] / limit)
        obj['page'] = Number(page)
        this.responseData(resolve, obj)
      } catch (err) {
        this.responseData(reject, err)
      }
    })
  }

  /**
   * 处理删选的条件，如果为空则把这个条件删除掉
   * @param {Null | Object} where
   * @return {Null | Object} 如果只剩{}这返回Null,否则返回处理过的Object
   */
  filterWhere (where) {
    if (where && typeof where === 'object') {
      Object.keys(where).forEach(key => {
        let item = where[key]
        let val = item
        if (key === 'or') {
          let data = this.filterWhere(item)
          if (!data) {
            val = ''
          }
        } else if (typeof item === 'object') {
          val = Object.values(item)[0]
        }
        if (!val) {
          delete where[key]
        }
      })
    }
    if (JSON.stringify(where) === '{}') {
      where = null
    }
    return where
  }
  /**
   * 设置数据库的配置
   * @param {Object} config 数据库的配置
   * @return {Object} 返回合并之后的配置 {...config}
   */
  setConfig (config) {
    this.config = Object.assign({}, this.config, config)
    return this.config
  }
  /**
   * 根据config的timeout属性获取响应时间
   * @return {Number} 返回配置timeout之间的间隔时间
   */
  getTimeout () {
    let {timeout} = this.config
    if (typeof timeout === 'string') {
      let date = timeout.split('-')
      if (date.length === 1) {
        date[1] = Mock.mock({[`time|${date[0]}-${date[0] + 1000}`]: 1})['time']
      }
      return Mock.mock({[`time|${date[0]}-${date[1]}`]: 1})['time']
    } else {
      return timeout
    }
  }
  /**
   * 响应数据
   * @param {Function} callback Promise的回调函数 resolve || reject
   * @param {*} data 需要返回的值
   */
  responseData (callback, data, timeout) {
    if (!timeout && timeout !== 0) {
      timeout = this.getTimeout()
    }
    setTimeout(() => {
      callback(data)
    }, timeout)
  }
}
export default new DB()
