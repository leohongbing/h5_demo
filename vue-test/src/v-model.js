import Vue from 'vue'

/**
 * input元素
 * addProp value
 * addHandle input
 * */

// let vm = new Vue({
//   el: '#app',
//   template: '<div>'
//     + '<input v-model="message" placeholder="edit me">' + '<p>Message is: {{ message }}</p>' +
//     '</div>',
//   data() {
//     return {
//       message: ''
//     } }
// })

// 组件
let Child = {
  template: '<div>'
    + '<input :value="msg" @input="updateValue" placeholder="edit me">' +
    '</div>',
  props: ['msg'],
  model: {
    prop: 'msg',
    event: 'change'
  },
  methods: {
    updateValue(e) {
      this.$emit('change', e.target.value)
    }
  }
}
let vm = new Vue({
  el: '#app',
  template: '<div>' +
    '<child v-model="message"></child>' + '<p>Message is: {{ message }}</p>' + '</div>',
  data() {
    return {
      message: ''
    }
  },
  components: {
    Child
  }
})
