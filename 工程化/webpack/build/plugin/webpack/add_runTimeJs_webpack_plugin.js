const config = require('../../../config')
const url = require('url')

class addRunTimeJsWebpackPlugin {
	apply(compiler) {
		compiler.hooks.emit.tapAsync('addRunTimeJsWebpackPlugin', (compilation, cb) => {
      let assets = Object.keys(compilation.assets)
      assets.forEach((key)=> {
        if(/\bhtml\b$/g.test(key)){
          const strArr = key.split('/')
          const name = strArr[strArr.length-1].split('.')[0]

          assets.forEach((key1)=> {
            const reg = new RegExp(`${name}/js/runtime`);
            let html

            if(process.env.NODE_ENV === 'development'){
              html = compilation.assets[key].source().replace('{{runtimeJs}}', '')
              compilation.assets[key].source = function() {
                return html
              };
              return
            }

            if(reg.test(key1)){
              let runtimeJsPath = url.resolve(config.build.assetsPublicPath,key1)
              let runtimeJs = `<script type="text/javascript" src=${runtimeJsPath}></script>`
              process.env.NODE_ENV === 'production'?
                html = compilation.assets[key].source().replace('{{runtimeJs}}', runtimeJs):
                html = compilation.assets[key].source().replace('{{runtimeJs}}', '')

              compilation.assets[key].source = function() {
                return html
              };
            }
          })
        }
      });
			cb();
		})
	}
}

module.exports = addRunTimeJsWebpackPlugin;
