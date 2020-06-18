import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import map from "./map"

export default new Vuex.Store({
  modules: {
    map
  }
})
