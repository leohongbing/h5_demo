import Vue from 'vue'

// 普通插槽
// let AppLayout = {
//   template: '<div class="container">' + '<header><slot name="header"></slot></header>' + '<main><slot>默认内容</slot></main>' + '<footer><slot name="footer"></slot></footer>' + '</div>'
// }
// let vm = new Vue({
//   el: '#app',
//   template: '<div>' +
//     '<app-layout>' +
//     '<h1 slot="header">{{title}}</h1>' + '<p>{{msg}}</p>' +
//     '<p slot="footer">{{desc}}</p>' + '</app-layout>' +
//     '</div>',
//   data() {
//     return {
//       title: '我是标题',
//       msg: '我是内容',
//       desc: '其它信息'
//     }
//   },
//   components: {
//     AppLayout
//   }
// })

// 作用域插槽
let Child = {
  template: '<div class="child">' +
    '<slot text="Hello " :msg="msg"></slot>' +
    '</div>',
  data() {
    return {
      msg: 'Vue'
    }
  }
}
let vm = new Vue({
  el: '#app',
  template: '<div>' +
    '<child>' +
    '<template slot-scope="props">' + '<p>Hello from parent</p>' +
    '<p>{{ props.text + props.msg}}</p>' + '</template>' +
    '</child>' +
    '</div>',
  components: {
    Child
  }
})
