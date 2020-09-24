/**
 * Created by lhb on 2020/9/22
 *
 * Description:
 * <p>
 */
import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'

Vue.use(Vuex)

debugger

const moduleA = {
  state: () => ({
    count: 0
  }),
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {},
  getters: {}
}

const moduleB = {
  state: () => ({}),
  mutations: {},
  actions: {}
}

const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,
      // 模块内容（module assets）
      state: {account: '1'},
      // 模块内的状态已经是嵌套的了，
      // 使⽤ `namespaced` 属性不会对其产⽣影响
      getters: {
        isAdmin() {
          console.log('isAdmin')
        }
      },
      actions: {
        login() {
          console.log('login')
        }
      },
      mutations: {
        login() {
          console.log('444')
        }
      },
      // 嵌套模块
      modules: {
        myPage: {
          state: {
            account: '2'
          },
          getters: {
            profile() {
            }
          },
          actions: {
            test1() {}
          },
          mutations: {
            test2() {}
          }
        },
        // 进⼀步嵌套命名空间
        posts: {
          namespaced: true,
          state: {
            account: '3'
          },
          getters: {
            popular() {
            }
          },
          actions: {
            test() {
              console.log(123)
            }
          }
        }
      }
    }
  },
  plugins: [logger]
})

// console.log(store.state.a.count) // -> 1

new Vue({
  el: '#app',
  store
})

// store.account.commit('login')
console.log(store)
store._modulesNamespaceMap['account/posts/'].context.dispatch('test')
// console.log()
