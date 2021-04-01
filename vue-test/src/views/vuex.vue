<template>
  <div class="vuex">
    {{ $store.state.test }}
    {{ $store.getters['ma/getA'] }}

    <Button @click="change">change</Button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'vuex',

  data() {
    return {};
  },

  computed: {
    ...mapGetters(['ma/getA'])
  },

  mounted() {
    console.log(this.$store)
  },

  methods: {
    change() {
      this.$store.dispatch('ma/setA', 'b')
    }
  }
};

</script>

