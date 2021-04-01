import Vuex from 'vuex'
import Vue from 'vue'
import vuex from "@/views/vuex";

debugger
Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  state: {
    test: 'x'
  },
  mutations: {
    setTest(state, data) {
      state.test = data
    }
  },
  actions: {
    setTest({ commit }, data) {
      commit('setTest', data)
    }
  },
  getters: {
    getTest: (state) => state.test
  },

  modules: {
    ma: {
      namespaced: true,
      state: {
        a: 'a'
      },
      mutations: {
        setA(state, data) {
          state.a = data
        }
      },
      actions: {
        setA({ commit }, data) {
          commit('setA', data)
        }
      },
      getters: {
        getA: (state) => state.a
      }
    }
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(vuex)
})
