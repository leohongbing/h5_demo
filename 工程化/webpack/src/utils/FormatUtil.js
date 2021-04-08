var moment = require('moment');

export default {
  getFilters(){
    return {
      // 金额转换 不加 符号
      formatMoney: function (value) {
        let multiple = 1;
        return (value / 100 * multiple).toFixed(2)
      },
      formatMoneyByFload: function (value) {
        let multiple = 1;
        return value.toFixed(2)
      },
      formatMoneyText: function (value) {
        return (value / 100).toFixed(2);
      },
      formatDateTime(time, format){
        if (time == '' || time == undefined) {
          return "";
        }
        let date = new Date(time);
        if (date == undefined) {
          return "";
        }
        return moment(date).format(format || "YYYY-MM-DD HH:mm:ss");
      },
      formatDayBySecond: function (value) {
        return (value/60/60/24).toFixed(0);
      },
      getUniformScaleCDNPath: function (path, width, height) {
        path = path || "";
        let command = "imageMogr2/auto-orient/thumbnail/{{w}}x{{h}}^/gravity/Center/crop/!{{w}}x{{h}}".replace(/\{\{w\}\}/g, width).replace(/\{\{h\}\}/g, height);
        if (path.indexOf("imageMogr2") != -1) {//如果图片是缩放的，则表示url中已经有的图片处理命令，不再
          if (path.indexOf("thumbnail") != -1) {
            return path;
          }else{
            command = "/auto-orient/thumbnail/{{w}}x{{h}}".replace(/\{\{w\}\}/g, width).replace(/\{\{h\}\}/g, height);
          }
        }
        return path + "?" + command;
      },
      hideTel(value){
        let start = value.slice(0, 3);
        let end = value.slice(-4);
        return start+"****"+end;
      }
    }
  }
};


