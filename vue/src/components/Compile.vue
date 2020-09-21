<template>

  <div>
    <ul :class="bindCls" class="list" v-if="isShow">
      <li v-for="(item,index) in data"
          @click="clickItem(index)">{{item}}:{{index}}</li>
    </ul>
  </div>

</template>

<script>

  export default {

    name: '',

    components: {},

    directives: {},

    filters: {},

    mixins: [],

    props: {},

    data() {

      return {
        bindCls: 'class-1',
        isShow: true,
        data: [1,2,3]
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
      clickItem(index) {
        console.log(index)
      }
    }

  };

</script>

<style lang="scss">
  .class-1 {
    font-size: 16px;
  }
</style>
