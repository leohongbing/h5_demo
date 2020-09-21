/**
 * Created by lhb on 2020/6/3
 *
 * Description:
 * <p>
 */
import Vue from 'vue'

var app = new Vue({
  el: '#app',
  props: {
    test: {
      type: [Boolean],
      default: false
    },

  },
  data: {
    message: 'Hello Vue!',
    number: 2,
    t1: 't1',
    firstName: 'Foo',
    lastName: 'Bar'
  },
  methods: {
    changeMsg() {
      // this.message = 'Hello World!'
      // this.t1 = 't2'
      // this.number = 3
      this.firstName = 'leo'
    },

  },
  watch: {
    t1: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
  },
  computed: {
    // c1: function () {
    //   return this.number * 2
    // },
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  },
  mounted() {
  },
  template: '<div @click="changeMsg">{{ fullName }}</div>'
})
