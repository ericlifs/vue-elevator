<template>
  <div id="app">
    <Building :floors="floors"></Building>
  </div>
</template>

<script>
import Building from './components/Building.vue'

export default {
  name: 'App',
  components: {
    Building
  },
  data() {
    return {
      floors: 7,
    };
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    height: 100vh;

    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      height: 100%;
    }
  }
</style>
