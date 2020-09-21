// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'
//
// Vue.config.productionTip = false
//
// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: {App},
//   template: '<App/>'
// })

import Vue from 'vue'
import UpdateChild from "./components/UpdateChild";

debugger
let childComp = {
  template: '<div @click="changeMsg">{{ msg }}</div>',
  mixins: [
    {
      created() {
        console.log('child test123')
      }
    }
  ],
  beforeCreate() {
    console.log('child beforeCreate')
  },
  created() {
    console.log('child created')
  },
  beforeMount() {
    console.log('child beforeMount')
  },
  mounted() {
    console.log('child mounted')
    // setTimeout(()=> {
    //   this.msg = '123'
    // },1000)
  },
  data() {
    return {msg: 'Hello Vue'}
  },
  beforeUpdate() {
    console.log('child beforeUpdate')
  },
  updated() {
    console.log('child updated')
  },

  activated() {
    console.log('child activated')
  },
  beforeDestroy() {
    console.log('child beforeDestroy')
  },
  destroyed() {
    console.log('child destroyed')
  },
  methods: {
    changeMsg() {
      debugger
      this.msg = 'updateMsg'
    }
  }
}
// 全局注册
Vue.component('test', childComp)

// 普通异步组件
// Vue.component('async-example', function (resolve, reject) {
//   // 这个特殊的 require 语法告诉 webpack
//   // ⾃动将编译后的代码分割成不同的块，
//   // 这些块将通过 Ajax 请求⾃动下载。
//   require(['./components/myAsyncComponent.vue'], resolve)
// })

// Promise异步组件
// Vue.component('async-example',
// // 该 `import` 函数返回⼀个 `Promise` 对象。
//   () => import('./components/myAsyncComponent.vue'))

// 高级异步组件
import LoadingComp from "./components/LoadingComp";
import ErrorComp from "./components/ErrorComp";
const AsyncComp = () => ({
// 需要加载的组件。应当是⼀个 Promise
  component: new Promise((resolve, reject)=> {
    setTimeout(()=> {
      resolve(import('./components/myAsyncComponent.vue'))
    }, 2000)
  }),
// 加载中应当渲染的组件
  loading: LoadingComp,
// 出错时渲染的组件
  error: ErrorComp,
// 渲染加载中组件前的等待时间。默认：200ms。 delay: 200,
// 最⻓等待时间。超出此时间则渲染错误组件。默认：Infinity
  timeout: 3000
})
Vue.component('async-example', AsyncComp)
Vue.mixin({
  created() {
    console.log('parent created')
  }
})
new Vue({
  el: '#app',
  components: {
    UpdateChild
  },
  template: '<UpdateChild/>'
})
