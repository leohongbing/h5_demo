/**
 * Created by lhb on 2020/9/22
 *
 * Description:
 * <p>
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import router1 from './components/router1'

Vue.use(VueRouter) // 执行插件install方法
// 1. 定义（路由）组件。
// 可以从其他⽂件 import 进来
const Foo = {
  template: '<div>foo</div>',
  beforeRouteEnter(...args) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    console.log('foo beforeRouteEnter', args)
    args[2]()
  },
  beforeRouteUpdate(...args) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    console.log('foo beforeRouteUpdate', args)
    args[2]()
  },
  beforeRouteLeave(...args) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log('foo beforeRouteLeave', args)
    args[2]()
  }
}
const Bar = {
  template: '<div>bar</div>'
}
// 2. 定义路由 // 每个路由应该映射⼀个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是⼀个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  {
    path: '/foo', component: Foo, beforeEnter: (...args) => {
      console.log('router beforeEnter', args)
      args[2]()
    }
  },
  {path: '/bar', component: Bar}
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes
})

router.beforeEach((...args) => {
  console.log('beforeEach', args);
  args[2]()
})

router.afterEach((...args) => {
  console.log('afterEach', args);
  args[2] && args[2]()
})

router.beforeResolve((...args) => {
  console.log('beforeResolve', args);
  args[2] && args[2]()
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注⼊路由，
// 从⽽让整个应⽤都有路由功能
const app = new Vue({
  router, // 传入VueRouter实例
  components: {router1},
  template: '<router1/>',
  beforeRouteUpdate(...args) {
    console.log(args)
  },
  beforeRouteLeave(...args) {
    console.log(args)
  },
  beforeRouteEnter(...args) {
    console.log(args)
  },
}).$mount('#app')
