// export default {
//
//
//
//
// }

export function cloneObject(object) {
  return JSON.parse(JSON.stringify(object));
}

export function findRowIndex(dataList, newData, keyName) {
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i][keyName] === newData[keyName]) {
      return i;
    }
  }
  return -1;
}

export function findCodeName(dataList, codeName, codeValue, dataName) {
  let result = null;
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i][codeName] === codeValue) {
      result = dataList[i][dataName];
      break;
    }
  }
  return result;
}

export function replaceArrayRow(dataList, newData, keyName) {
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i][keyName] === newData[keyName]) {
      dataList[i] = newData;
      break;
    }
  }
  return dataList;
}

export function hasClass(elem, cls) {
  if ('classList' in elem && typeof elem.classList.contains === 'function') {
    return elem.classList.contains(cls);
  }
  const classes = elem.className.split(/\s+/);
  for (let i = 0; i < classes.length; i++) {
    if (classes[i] === cls) {
      return true;
    }
  }
  return false;
}

export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  }
  return function (element, event, handler) {
    if (element && event && handler) {
      element.attachEvent(`on${event}`, handler);
    }
  };
}());

export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  }
  return function (element, event, handler) {
    if (element && event) {
      element.detachEvent(`on${event}`, handler);
    }
  };
}());

function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  return map[toString.call(obj)];
}

// deepCopy
export function deepCopy(data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    // for (const i in data) {
    //   o[i] = deepCopy(data[i]);
    // }
    Object.keys(data).forEach((index) => {
      o[index] = deepCopy(data[index]);
    });
  }
  return o;
}

/**
 * 获取视口宽高
 * @param isParent 是否为iframe
 * */
export function getSViewportOffset(isParent) {
  let w = isParent ?
    window.parent :
    window;
  if (w.innerWidth) {
    return {
      w: w.innerWidth,
      h: w.innerHeight
    }
  } else {
    // 怪异模式
    if (w.document.compatMode === "BackCompat") {
      return {
        w: w.document.body.clienWidth,
        h: w.document.body.clientHeight
      }
    } else {
      return {
        w: w.document.documentElement.clientWidth,
        h: w.document.documrntElement.clientHeight
      }
    }
  }
}

/**
 @param {Object} obj DOM element like object.
 @param {String} name Style you want to get from the DOM element
 */
export function getStyle(obj, name) {
  if (obj.currentStyle) {
    return obj.currentStyle[name];
  } else if (window.getComputedStyle) {
    return window.getComputedStyle(obj, null)[name];
  }
}

/**
 * 弹窗高度自适应
 * @param el 弹窗Dom
 * */
export function autoDialogHeight(el) {
  if(!el) return
  // 弹窗body
  let body = el.querySelector('.el-dialog__body')
  // 视口高度
  let {h} = getSViewportOffset(true)

  // 可用高度
  let canUseH = 0
  // 头部高度
  let headH = el.querySelector('.el-dialog__header').offsetHeight
  // 尾部高度
  let footH = el.querySelector('.el-dialog__footer').offsetHeight
  // 弹窗marginTop
  let dialogMT = Number(el.querySelector('.el-dialog').style.marginTop.slice(0, -2))
  // 弹窗body padding
  let dialogBP = Number(getStyle(body, 'paddingTop').slice(0, -2)) + Number(getStyle(body, 'paddingBottom').slice(0, -2))
  // 弹窗body margin
  let dialogBM = Number(getStyle(body, 'marginTop').slice(0, -2)) + Number(getStyle(body, 'marginBottom').slice(0, -2))

  // 外层头部
  const wrapH = 68
  // 外层底部
  const wrapB = 70

  canUseH = h - headH - footH - dialogMT - dialogBP - dialogBM - wrapH - wrapB
  if (el) {
    body.style.maxHeight = `${canUseH}px`
    body.style.overflowY = 'scroll'
  }
};

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
