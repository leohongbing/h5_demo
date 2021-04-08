"use strict";

let name = 'dajia-fe-scaffolding';
let debugWebServiceName = 'dajia-fe-scaffolding';
let publishWebServiceName = 'dajia-fe-scaffolding';
let debugWebServiceResourcePath = '../../' + debugWebServiceName + '/target/ROOT/WEB-INF/classes/';
// let publishWebServiceResourcePath = '../../' + publishWebServiceName + '/src/main/resources/';
let publishWebServiceResourcePath =  publishWebServiceName;

module.exports = {
  name: name, // 项目名：multi
  static_root: name,//静态资源路径(线上的assets,html,js文件夹所在路径)
  debugWebServiceResourcePath: debugWebServiceResourcePath, // 调试目录
  publishWebServiceResourcePath: publishWebServiceResourcePath, // 发布目录
  cdnAddr: 'https://cdns1.dajiashequ.com/',
  cdn_ak: 'ycnbFvHAeJHQnmbQ4RwqemHxigXnb94ZpeTqMVjZ',
  cdn_sk: '8rX_F0z5TbY5d5SBOtuwr91lzS_nL-sUraxX0_ck',
  cdn_bucket: 'dajia-resources',
  project: {
    // 项目列表
    // 组织格式 ： 项目名 => 以项目根目录为基准的index.vue路径
    // 其在webpack中的对应格式为：[name](生成的js名) => [main.js所在路径]
    ueditor: './src/view/ueditor', // 示例项目，支持ueditor
    pc: './src/view/pc', // 示例项目，pc端
    mobile: './src/view/mobile', // 示例项目，移动项目
  },
  entry: { //用于配置e2e测试入口
    mobile: '/' + name + "/mobile/mobile.html",
    ueditor: '/' + name + "/ueditor/ueditor.html",
    pc: '/' + name + "/pc/pc.html",
  }
};
