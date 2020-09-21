<template>
  <div id="app" @click="changeMsg"> {{ message }} </div>
</template>

<script>

  export default {

    name: '',

    components: {},

    directives: {},

    filters: {},

    mixins: [],

    props: {
      test: {
        type: Boolean,
        default: false
      }
    },

    data() {

      return {
        message: 'Hello Vue!'
      };

    },
    computed: {},

    watch: {},

    created() {

    },

    mounted() {

    },

    updated() {

    },

    activated() {

    },

    destroyed() {

    },

    methods: {
      changeMsg() {
        this.message = 'Hello World!'
      }
    }

  };

</script>

<style lang="scss">

</style>
