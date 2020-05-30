import Vuex from 'vuex'
import Vue from 'vue'
import elevator from './modules/elevator'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    elevator
  }
})