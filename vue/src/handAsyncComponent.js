/**
 * Created by lhb on 2020/9/24
 *
 * Description:
 * <p>
 */
import Vue from 'vue'
// import myAsyncComponent from './components/myAsyncComponent';
import LoadingComp from "./components/LoadingComp";
import ErrorComp from "./components/ErrorComp";
debugger
// Vue.component('myAsyncComponent', function (resolve, reject) {
//   setTimeout(() => {
//     require(['./components/myAsyncComponent'], resolve)
//   }, 1000)
// })

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

new Vue({
  el: '#app',
  template: '<async-example/>'
})
