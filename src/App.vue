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
      floors: 5,
    };
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    background: #1e90ff;
    position: relative;

    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      height: 100%;
    }

    .button--flat {
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      cursor: pointer;
      font: inherit;
      outline: inherit;
    }
  }
</style>
