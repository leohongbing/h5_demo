/**
 * Created by lhb on 2020/9/29
 *
 * Description:
 * <p>
 */
import Vue from 'vue';

debugger
var app = new Vue({
  el: '#app',
  props: {
    prop1: {
      type: Boolean,
      default: false
    }
  },
  data: {message: 'Hello Vue!', arr: [1,2,3],a: {b: 1}},
  template: '<div @click="changeMsg"> {{ message }} </div>',
  methods: {
    changeMsg() {
      this.message = 'Hello World!'
      this.a.b = 2
    }
  },
  computed: {
    c1: function () {
      return this.message + '123'
    }
  },
  // watch: {
  //   message: {
  //     handler: function (val, oldValue) {
  //       console.log(val, oldValue)
  //     }
  //   },
  //   a: {
  //     handler: function () {
  //       console.log(123)
  //     },
  //     deep: true
  //   }
  // }
})
