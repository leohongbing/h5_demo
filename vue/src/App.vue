<template>
  <div id="app">
    <!--    <img src="./assets/logo.png">-->
    <!--    <router-view/>-->
    <!--    components-->
    <!--    <test/>-->
        <aaa @click.native="change" :msg="msg" :key="key"/>

  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        msg: 'msg1',
        key: 'k1'
      }
    },
    components: {
      aaa: {
        render: function (h) {
          return h('div', this.msg)
        },
        props: {
          msg: {
            type: String,
            required: true
          }
        }
      }
    },
    methods: {
      change() {
        this.msg = 'msg1111'
        this.key = 'k2'
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
