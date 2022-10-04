<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      text: 'text'
    }
  },
  created() {
    this.getData('string', 1111, {})
  },
  methods: {
    getData() {
      console.log(arguments)
      const args = [...arguments]
      console.log(args)
    },
  }
}
</script>
