/* eslint import/no-webpack-loader-syntax: off */
import * as JsStore from 'jsstore'
const Worker = require('worker-loader?publicPath=/&name=jsstore.worker.js!jsstore/dist/jsstore.worker.min')
class DB {
  constructor () {
    this.connent = null
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
    this.connent.insert({
      into: table,
      values: data
    })
    return data
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
    where = where || {id: data['id']}
    this.connent.update({
      in: table,
      set: data,
      where: where
    })
    return data
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
    this.connent.remove({
      from: table,
      where: where
    })
    return true
  }
  /**
   * 查询数据表数据
   * @param {String} table 表名称 required
   * @param {Object | null} where 查询条件
   * @param {Object} other 查询函数比如: limit、order by、group by
   * @return {Promise} 成功返回查询出来的数据
   */
  async select (table, where = null, other = {}) {
    if (!this.connent) await this.initDB()
    let res = await this.connent.select({
      from: table,
      where,
      ...other
    })
    return res
  }

  /**
   * 默认根据主键查找数据
   * @param {String} table 表名称 required
   * @param {Object | Number} where 查询条件
   * @param {Object} other 查询函数比如: limit、order by、group by
   * @return {Promise} {} 成功返回查询出来的数据
   */
  async find (table, where = null, other = {}) {
    if (!this.connent) await this.initDB()
    if (typeof where === 'number') {
      let id = where
      where = { id }
    }
    let res = await this.connent.select({
      from: table,
      where,
      ...other
    })
    if (res[0]) {
      return res[0]
    }
    return {}
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
    obj['data'] = await this.connent.select({from: table, ...other, where})
    obj['totalCount'] = await this.connent.count({from: table, where})
    obj['totalPage'] = Math.ceil(obj['totalCount'] / limit)
    obj['page'] = Number(page)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(obj)
      }, 1000)
    })
  }

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
}
export default new DB()
