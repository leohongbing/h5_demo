import Vue from 'vue'
import ErrorComp from "@/components/ErrorComp";
import LoadingComp from "@/components/LoadingComp";

// import App from './App.vue'
// import router from './router'
// import store from './store'

Vue.config.productionTip = false

// new Vue({
//   // components: {App},
//   // router,
//   // store,
//   el: '#app',
//   render: h => h(App)
// })

// new Vue({
//   el: '#app',
//   data: {
//     message: 'hello'
//   },
//   render(h, context) {
//     return h('div',
//       {id: 'app'},
//       [h('span', {}, this.message)]
//     )
//   },
//   template: `<!--<div id="app"><div>{{ message }}</div></div>-->`
// })

let childComp = {
  template: '<div @click="changeMsg">{{msg}} {{ compTest }}</div>',
  created() {
    console.log('child created')
  },
  computed: {
    compTest() {
      return this.msg + '111'
    }
  },
  watch: {
    msg: {
      handler: function (val, oldVal) {
        console.log(val, oldVal)
      },
      immediate: true
    }
  },
  mounted() {
    console.log('child mounted')
  }, data() {
    return {
      msg: 'Hello Vue'
    }
  },
  methods: {
    changeMsg() {
      this.msg = 'set msg'
    }
  }
}

Vue.component('test', {
  render: h => h('div', {}, '全局组件注册')
})

Vue.mixin({
  created() {
    console.log('parent created')
  }
})

// 异步组件
const AsyncComp = (resolve, reject) => ({
// 需要加载的组件。应当是⼀个 Promise
//   component: import('./components/myAsyncComponent.vue'),
  component: new Promise((resolve1, reject1) => {
    setTimeout(() => {
      resolve1(import('./components/myAsyncComponent.vue'));
    }, 1000)
  }),

// 加载中应当渲染的组件
  loading: LoadingComp,
// 出错时渲染的组件
  error: ErrorComp,
// 渲染加载中组件前的等待时间。默认：200ms。
  delay: 0,
// 最⻓等待时间。超出此时间则渲染错误组件。默认：Infinity
  timeout: 3000
})
Vue.component('async-example', AsyncComp)

let app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    changeMsg() {
      this.message = 'Hello World!' }
  },
  render: h => h(childComp)
  // template: `<div id="app" @click="changeMsg">
  // {{ message }}
  // </div>`
})
