/**
 * Created by lhb on 2020/9/24
 *
 * Description:
 * <p>
 */
import Vue from 'vue'

debugger
new Vue({
  el: '#app',
  data: {
      msg: 'msg111'
  },
  // render: h => h('div', {
  //   props: {
  //     id: 'app'
  //   },
  // }, this.msg)
  render: function (createElement) { return createElement('div', { attrs: { id: 'app' }, }, this.msg) },
})

