/**
 * Created by lhb on 2020/6/17
 *
 * Description:
 * <p>
 */
import Vue from 'vue'

// let vm = new Vue({
//   el: '#app',
//   template: '<div>' + '<input v-model="message" placeholder="edit me">' + '<p>Message is: {{ message }}</p>' + '</div>',
//   data() {
//     return {message: ''}
//   }
// })


let Child = {
  template: '<div>' + '<input :value="value" @input="updateValue" placeholder="edit me">' + '</div>',
  props: ['value'],
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    }
  }
}
let vm = new Vue({
  el: '#app',
  template: '<div>' + '<child v-model="message"></child>' + '<p>Message is: {{ message }}</p>' + '</div>',
  data() {
    return {message: ''}
  },
  components: {Child}
})
