/**
 * Created by lhb on 2020/9/7
 *
 * Description: worker运行脚本
 * <p>
 */
var onmessage = function (e) {
  // console.log(e.data)
  // var res = e.data * 2
  postMessage(111)
}
setInterval(onmessage, 1000)
