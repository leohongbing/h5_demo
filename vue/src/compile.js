/**
 * Created by lhb on 2020/6/6
 *
 * Description:
 * <p>
 */
import Vue from 'vue';

new Vue({
  el: '#app',
  data: {
    bindCls: 'class-1',
    isShow: true,
    data: [1,2,3]
  },
  template: '<ul :class="bindCls" class="list" v-if="isShow"> <li v-for="(item,index) in data" @click="clickItem(index)">{{item}}:{{index}}</li> </ul>'
})
