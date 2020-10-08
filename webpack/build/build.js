'use strict';
require('./check-versions')();
require('shelljs/global');

process.env.NODE_ENV = 'production';
const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');
const utils = require('./utils')

const spinner = ora('building for production...');
const delRoot = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
spinner.start();

utils.delFiles(`${delRoot}/**`, `!${delRoot}/static`) // 删除dist目录 排除静态资源目录
utils.delFiles(path.join(__dirname, '../map')) // 删除map

webpack(webpackConfig, (err, stats) => {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n');

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'));
    process.exit(1);
  }

  console.log(chalk.cyan('  Build complete.\n'));
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ));
});
