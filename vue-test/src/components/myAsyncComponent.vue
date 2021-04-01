<template>

  <div>{{ msg }}</div>

</template>

<script>

  export default {

    name: 'myAsyncComponent',

    components: {},

    directives: {},

    filters: {},

    mixins: [],

    props: {},

    data() {

      return {
        msg: 'my-async-component1'
      };

    },

    computed: {},

    watch: {},

    created() {
      this.$on('hook:mounted', () => {console.log('hook: mounted')})
    },

    mounted() {
      console.log('myAsyncComponent mounted')
    },

    updated() {

    },

    activated() {

    },

    destroyed() {

    },

    methods: {}

  };

</script>

<style lang="scss">

</style>
