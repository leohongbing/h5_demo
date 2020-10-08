/*
* 1. 打包第三方库,避免重复打包，提升构建速度
* 2. 将static文件抽出打包避免重复打包
* */
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../config');
const utils = require('./utils')

utils.delFiles('dll/**') // 删除老文件

module.exports = {
	mode: 'production',
	entry: config.build.dllEntry,
	output: {
		filename: '[name].dll.[hash:7].js',
		path: path.resolve(__dirname, '../dll'),
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({
			name: '[name]',
			path: path.resolve(__dirname, '../dll/[name].manifest.[hash:7].json'),
		}),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.join(config.build.assetsRoot, config.build.projectName, 'static'),
        ignore: ['.*'],
        force: true, //强制覆盖之前目录文件
      }
    ]),
  ],
  performance: {
    hints: false
  }
};
