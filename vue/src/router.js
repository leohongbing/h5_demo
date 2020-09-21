/**
 * Created by lhb on 2020/9/10
 *
 * Description:
 * <p>
 */
import Vue from 'vue'
import router from "./components/router";

let vm = new Vue({
  el: '#app',
  components: {router},
  template: '<router/>'
})
