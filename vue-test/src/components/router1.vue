<template>
  <div id=""><h1>Hello App!</h1>
    <p>
      <!-- 使⽤ router-link 组件来导航. -->
      <!-- 通过传⼊ `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成⼀个 `<a>` 标签 -->
      <router-link to="/foo">Go to Foo</router-link>
      <router-link to="/bar">Go to Bar</router-link>
    </p>
    <!-- 路由出⼝ -->
    <!-- 路由匹配到的组件将渲染在这⾥ -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>

  export default {
    name: 'router1',

    components: {},

    directives: {},

    filters: {},

    mixins: [],

    props: {},

    data() {
      return {};
    },

    computed: {},

    watch: {},

    created() {
    },

    mounted() {
      console.log('mounted', this.$router, this.$route)
    },

    updated() {
    },

    activated() {
    },

    destroyed() {
    },

    methods: {},
  };

</script>

<style lang="scss">

</style>
