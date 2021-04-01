<template>
  <div id="app">
    <div>
      <ul>
        <li v-for="item in items" :key="item.id">{{ item.val }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'App',
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
        this.items.push({id: 1, val: 'b'})
      }
    },
    mounted() {
      setTimeout(()=> {
        this.items.reverse().push({id: 4, val: 'E'})
      },3000)
    }
  }
</script>
