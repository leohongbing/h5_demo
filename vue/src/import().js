/**
 * Created by lhb on 2020/9/12
 *
 * Description:
 * <p>
 */
import Vue from 'vue'
const url = './assets/logo.png'
import(url+ '')
  .then((...args) => {
    console.log(args)
  })

new Vue({
  el: '#app',
  components: {},
  template: ''
})
