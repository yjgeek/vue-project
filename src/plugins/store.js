import Vue from 'vue'
import Vuex from 'vuex'
import globalConfigs from 'src/globalConfigs'
Vue.use(Vuex)
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
  modules: globalConfigs.stores
})
