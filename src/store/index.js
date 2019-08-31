import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    load_status: false
  },
  mutations: {
    SET_LOAD_STATUS(state, loadStatus) {
      state.load_status = loadStatus
    }
  }
})
