module.exports = {
  configureWebpack: {
    entry: {
      // app: './src/diff.js'
      // app: './src/compile.js'
      // app: './src/event.js'
      // app: './src/v-model.js'
      // app: './src/slot.js'
      // app: './src/keep-alive.js'
      // app: './src/transition.js'
      // app: './src/vueRouter.js'
      app: './src/vuex.js'

    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  }
}
