import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const data = require.context('./views/', true, /store\.js$/)
let temArray = {}
data.keys().forEach(item => {
  const arr = item.split('/')
  if (arr.length === 4) {
    item = data(item).default
    temArray[arr[1]] = item
  }
})
export default new Vuex.Store({
  state: {
    windowSize: 0
  },
  getters: {
  },
  mutations: {
    updateWindowSize (state, data) {
      state.windowSize = data
    }
  },
  modules: {
    ...temArray
  }
})
