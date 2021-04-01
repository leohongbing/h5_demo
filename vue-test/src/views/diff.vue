<template>
  <div>
    <a v-for="item in items" :key="item.id">{{ item.val }}</a>
    <button @click="change">change</button>
  </div>
</template>
<script>
export default {
  name: 'diff',
  data() {
    return {
      items: [
        {id: 0, val: 'A'},
        {id: 1, val: 'B'},
        {id: 2, val: 'C'},
        {id: 3, val: 'D'}
      ]
    }
  },
  methods: {
    change() {
      // this.items.reverse().push({id: 4, val: 'E'})
      // this.items = [{ id: 4, val: 'F' }]
      this.items = [
        {id: 11, val: 'F'},
        {id: 12, val: 'G'},
        {id: 1, val: 'B'},
        {id: 13, val: 'H'},
      ]
    }
  }
} </script>
