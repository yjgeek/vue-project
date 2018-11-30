export default class IndexedDB {
  constructor (name = 'db', version = 1) {
    this.name = name
    this.version = version
  }
  openDB (name) {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(name)
      request.onerror = function (event) {
        reject(event)
      }
      request.onsuccess = event => {
        resolve(event.target.result)
      }
    })
  }
  async getVersion () {
    let res = await this.openDB(this.name)
    return res.version
  }
  async createTable (name, change = false) {
    let res = await this.openDB(this.name)
    return new Promise((resolve, reject) => {
      if (!res.objectStoreNames.contains(name) || change) {
        res.close()
        let v = res.version
        this.version = ++v
        let request = window.indexedDB.open(this.name, this.version)
        request.onerror = function (event) {
          reject(event)
        }
        request.onupgradeneeded = (event) => {
          resolve(event.target.result)
        }
      } else {
        resolve(res)
      }
    })
  }
  add (name, data) {
    return this.handleOperatingData('add', name, data)
  }
  update (name, data) {
    return this.handleOperatingData('put', name, data)
  }
  delete (name, data) {
    return this.handleOperatingData('delete', name, data)
  }
  check (name, data) {
    return new Promise((resolve, reject) => {
      this.handleOperatingData('get', name, data).then(res => {
        let result = res.target.result
        if (result) {
          resolve(result)
        } else {
          let err = {msg: '没有找到相关记录'}
          reject(err)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
  checkAll (name, data) {
    return new Promise((resolve, reject) => {
      this.handleOperatingData('getAll', name, data).then(res => {
        let result = res.target.result
        if (result) {
          resolve(result)
        } else {
          let err = {msg: '没有找到相关记录'}
          reject(err)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
  /**
   * 对数据的增删改查
   * @param {String} type
   * @param {String} name
   * @param {Object、Number} data
   * @return Promise
   */
  handleOperatingData (type, name, data) {
    return new Promise((resolve, reject) => {
      this.getTable(name).then(db => {
        let res = db[type](data)
        res.onsuccess = event => {
          resolve(event)
        }
        res.onerror = event => {
          reject(event)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
  getTable (name) {
    return new Promise((resolve, reject) => {
      this.openDB(this.name).then(db => {
        if (db.objectStoreNames.contains(name)) {
          let res = db.transaction(name, 'readwrite').objectStore(name)
          resolve(res)
        } else {
          let err = {msg: '没有找到相应的表'}
          reject(err)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}
