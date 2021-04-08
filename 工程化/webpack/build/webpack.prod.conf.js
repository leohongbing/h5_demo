'use strict';
process.env.NODE_ENV = 'production';
const path = require('path');
const url = require('url');
const utils = require('./utils');
const fs = require('fs');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const html_template_generator = require('./plugin/webpack/generate_html_template_list');
const map_json_generator = require('./plugin/webpack/generate_map_json');
const QiniuPlugin = require('qiniu-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const addRunTimeJsWebpackPlugin = require('./plugin/webpack/add_runTimeJs_webpack_plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin'); // 打包成zip文件


const env = process.env.NODE_ENV === 'debug' ? require('../config/debug.env') : require('../config/prod.env');


let plugins = [
  // http://vuejs.github.io/vue-loader/en/workflow/production.html
  // UEDITOR_HOME_URL 定义指定生产环境引用ueditor相关资源的路径
  new webpack.DefinePlugin({
    'process.env': env,
    UEDITOR_HOME_URL:JSON.stringify("https://cdns1.dajiashequ.com/static/ueditor/js/"),
    // UEDITOR_HOME_URL:JSON.stringify("https://cdns1.dajiashequ.com/" + config.build.projectName + "/static/ueditor/js/"),
    UEDITOR_INIT_URL:JSON.stringify("/file/initUeditor")
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  // extract css into its own file
  new ExtractTextPlugin({
    filename: utils.assetsPath('[name]/css/[name].[hash].css'),
    // set the following option to `true` if you want to extract CSS from
    // codesplit chunks into this main css file as well.
    // This will result in *all* of your app's CSS being loaded upfront.
    allChunks: false,
  }),
  // Compress extracted CSS. We are using this plugin so that possible
  // duplicated CSS from different components can be deduped.
  new OptimizeCSSPlugin({
    cssProcessorOptions: config.build.productionSourceMap
      ? { safe: true, map: { inline: false } }
      : { safe: true }
  }),
  new webpack.ProvidePlugin({
    jQuery: "jquery",
    $: "jquery"
  }),
  new QiniuPlugin({
    ACCESS_KEY: config.build.CDN_AK,
    SECRET_KEY: config.build.CDN_SK,
    bucket: config.build.CDN_BUCKET,
    path: '',
    //   /**
    //    *  You can specify certain file to upload
    //    */
    //   //include: [],
  }),
  // zip
  new FileManagerPlugin({
    onEnd: {
      // delete: ['./dist/control-operate.zip'],
      delete: [config.build.zip, config.build.zipAll],
      archive: [
        {source: path.join(__dirname, '../dist/', 'html'), destination: config.build.zip},
        {source: path.join(__dirname, '../dist/', config.project_config.name), destination: config.build.zipAll},
      ]
    }
  })
].concat(html_template_generator.generate_html_template_list(env)).concat([
  map_json_generator.generate_map_json({
    // output file path, relative to process.cwd()
    output: './map/' + config.project_config.name + '/map' + '.json',
    assetsPath: config.build.assetsPublicPath, // 文件前缀地址
    static_root: config.project_config.static_root, // 静态资源根路径
  })
])

const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach(file => {
  if(/.*\.dll\.[A-Za-z0-9]{7}\.js/.test(file)) {
    plugins.push(new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll', file),
      outputPath: path.join(config.build.projectName, 'dll'),
      // publicPath: url.resolve(config.build.assetsPublicPath,config.build.projectName,'dll')
      publicPath: config.build.assetsPublicPath + config.build.projectName + '/dll'
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
)

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  optimization: {
    runtimeChunk: {
      name: entrypoint => {
        return `${entrypoint.name}/js/runtime`
      },
    },
    occurrenceOrder: true,
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('[name].[contenthash].js'),
    chunkFilename: utils.assetsPath('[name]/js/[name].[contenthash].js'),
    // filename: utils.assetsPath(path.join(utils.getProjectName(),'js/[name].[contenthash].js')), // contenthash避免服务器资源内容没变也重复加载，直接走浏览器缓存数据更快
    // chunkFilename: utils.assetsPath(path.join(utils.getProjectName(),'js/[name].[contenthash].js'))
  },
  plugins,
  performance: {
    hints: false
  }
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;
