import Vue from 'vue'
Vue.config.productionTip = false

let app = new Vue({
  el: '#app',
  data: {
    data: ['A', 'B', 'C'],
    bindCls: 'testCls',
    isShow: true
  },
  template: `<ul :class="bindCls" class="list" v-if="isShow">
  <li v-for="(item,index) in data" @click="clickItem(index)">{{item}}:{{index}}</li>
  </ul>`
})
