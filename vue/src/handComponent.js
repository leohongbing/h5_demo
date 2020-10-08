/**
 * Created by lhb on 2020/9/27
 *
 * Description:
 * <p>
 */
import Vue from 'vue'
import App from "./App";
import updateChildren from "./components/updateChildren";
debugger
// Vue.component('test', {template: '<div>test</div>'})
const test = Vue.extend({name: 'name', template: '<div>test</div>'})
Vue.options.components = {test}
Vue.component('aaa',  {
  render: function (h) {
    return h('div', [h('div', this.msg)])
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  }
})
const app = new Vue({
  el: '#app',
  data: {
    msg: 'msg1',
    key: 'k1'
  },
  components: {
    test,
    updateChildren
  },
  // render: h => h(App),
  // template: '<aaa @click.native="change" :msg="msg"/>',
  template: '<updateChildren/>',

  methods: {
    change() {
      this.msg = 'msg1111'
      this.key = 'k2'
    }
  }
})
console.log(app)
