/**
 * Created by lhb on 2020/9/11
 *
 * Description:
 * <p>
 */
// main.js
// require(['./utils'], function(utils) {
//   utils.request();
// });


// CMD
define(function(require) {
  // 依赖可以就近书写
  var utils = require('./utils');
  utils.request();
});
