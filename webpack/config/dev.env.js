'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',// 注意，由于这里的值会被作为代码执行，所以必须要加上引号，否则会导致错误！
  BASE_API: '"/dajia-fe-scaffolding/api"',
  APP_ORIGIN: '""'
});
