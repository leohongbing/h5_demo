/*
* 转换数据
* */
import {formatDate} from '../../../utils/ToolsUtils';
import {LEVEL_OPTIONS, ROSTER_TYPE_OPTIONS, ACCESS_OPTIONS, STATE_OPTIONS} from '../business/consts';

function levelFormatter(val){
  let name;
  LEVEL_OPTIONS.filter(type => {
    if(type.value === val){
      name = type.label;
    }
  });
  return name || val;
}
function rosterTypeFormatter(val){
  let name;
  ROSTER_TYPE_OPTIONS.filter(type => {
    if(type.value === val){
      name = type.label;
    }
  });
  return name || val;
}
function accessFormatter(val){
  let name;
  ACCESS_OPTIONS.filter(type => {
    if(type.value === val){
      name = type.label;
    }
  });
  return name || val;
}
function stateFormatter(val){
  let name;
  STATE_OPTIONS.filter(type => {
    if(type.value === val){
      name = type.label;
    }
  });
  return name || val;
}

// 数据转换：改造成更直观地字段，更方便使用的数据
export function findPageDataTransform(val){
  val.rosterType= rosterTypeFormatter(val.rosterType);
  val.level= levelFormatter(val.level);
  val.access= accessFormatter(val.access);
  val.state= stateFormatter(val.state);
  val.createTime=formatDate(new Date(val.createTime), "yyyy-MM-dd hh:mm");
  val.updateTime=formatDate(new Date(val.updateTime), "yyyy-MM-dd hh:mm");
  return val;
}
