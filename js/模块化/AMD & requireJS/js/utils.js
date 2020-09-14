/**
 * Created by lhb on 2020/9/11
 *
 * Description:
 * <p>
 */
define(['./config'], function(config) {
  return {
    request() {
      console.log(config.api);
    }
  };
});
