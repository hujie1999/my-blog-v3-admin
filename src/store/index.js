import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

// import { randomId } from '../utils/randomid'

Vue.use(Vuex)

let state = {
  AdminInfo: localStorage.getItem("AdminInfo") ? JSON.parse(localStorage.getItem("AdminInfo")) : {
      islogin: false,
      token: '',
      nickname: '',
      role: '',
      account: '',
      uniqueid: '',
  },
}
let store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
