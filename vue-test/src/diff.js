import Vue from 'vue'
import diff from "@/views/diff";
Vue.config.productionTip = false

let app = new Vue({
  el: '#app',
  components: {diff},
  template: `<diff/>`
})
