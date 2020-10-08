'use strict';
require('./check-versions')();
const utils = require('./utils');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const config = require('../config');
process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const html_template_generator = require('./plugin/webpack/generate_html_template_list');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const addRunTimeJsWebpackPlugin = require('./plugin/webpack/add_runTimeJs_webpack_plugin');

// 支持开启某一页或者全部开启
let project_list = {};
let name = process.argv[process.argv.length-1].split('=')[1]
if(config.dev.isServerMultiplePages && !config.project_config.project[name]){
  Object.keys(config.project_config.project).forEach(function (name) {
    project_list[name] = config.project_config.project[name]
  });
}else {
  // 打开自定义页面
  config.project_config.project[name]?
    project_list[name] = config.project_config.project[name]:
    project_list[utils.getProjectName()] = config.project_config.project[utils.getProjectName()]
}

baseWebpackConfig.entry = project_list;

let plugins = [
  // UEDITOR_HOME_URL 定义指定开发环境引用ueditor相关资源的路径
  new webpack.DefinePlugin({
    'process.env': config.dev.env,
    UEDITOR_HOME_URL:JSON.stringify(`http://localhost:${config.dev.port}/${config.build.projectName}/static/ueditor/js/`), // 修复资源路径错误
    UEDITOR_INIT_URL:JSON.stringify("/file/initUeditor")
  }),
  new webpack.HotModuleReplacementPlugin(),
  // new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
  // new webpack.NoEmitOnErrorsPlugin(),
  new webpack.ProvidePlugin({
    jQuery: "jquery",
    $: "jquery"
  })
].concat(html_template_generator.generate_html_template_list(config.dev.env)).concat([new FriendlyErrorsPlugin()])
const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach(file => {
  if(/.*\.dll\.[A-Za-z0-9]{7}\.js/.test(file)) {
    plugins.push(new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll', file),
    }))
  }
  if(/.*\.manifest\.[A-Za-z0-9]{7}\.json/.test(file)) {
    plugins.push(new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll', file)
    }))
  }
})
plugins.push(
  new addRunTimeJsWebpackPlugin()
);

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-module-source-map', // 原始源代码（仅限行）
  devServer: {
    disableHostCheck: true, // 解决 nodejs项目在本地访问正常，然而部署到服务器上就提示Invalid Host header。新版的webpack-dev-server出于安全考虑，默认检查hostname，如果hostname不是配置内的，将中断访问。
    contentBase: config.build.assetsRoot,
    open: true,
    openPage: path.join(config.build.projectName, config.project_config.project[name]? name:utils.getProjectName())+'.html',
    host: config.dev.host,  // 解决不能IP访问
    port: config.dev.port,
    hot: true,
    historyApiFallback: true,
    proxy: config.dev.proxyTable
  },
  plugins,
  stats: {
    children: false
  },
});
