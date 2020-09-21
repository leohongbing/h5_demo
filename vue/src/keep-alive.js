/**
 * Created by lhb on 2020/6/17
 *
 * Description:
 * <p>
 */
import Vue from 'vue'

let A = {template: '<div class="a">' + '<p>A Comp</p>' + '</div>', name: 'A'}
let B = {template: '<div class="b">' + '<p>B Comp</p>' + '</div>', name: 'B'}

let vm = new Vue({
  el: '#app',
  template: '<div>' + '<keep-alive>' + '<component :is="currentComp">' + '</component>' + '</keep-alive>' + '<button @click="change">switch</button>' + '</div>',
  data: {currentComp: 'A'},
  methods: {
    change() {
      this.currentComp = this.currentComp === 'A' ? 'B' : 'A'
    }
  },
  components: {A, B}
})
