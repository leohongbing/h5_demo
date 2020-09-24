/**
 * Created by lhb on 2020/9/22
 *
 * Description:
 * <p>
 */
import Vue from 'vue';

let vm = new Vue({
  el: '#app',
  template: '<div id="demo">' + '<button v-on:click="show = !show">' + 'Toggle' + '</button>' + '<transition :appear="true" name="fade">' + '<p v-if="show">hello</p>' + '</transition>' + '</div>',
  data() {
    return {show: true}
  }
})
