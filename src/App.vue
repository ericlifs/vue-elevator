<template>
  <div id="app">
    <building></building>
    <elevator-queue></elevator-queue>
  </div>
</template>

<script>
import Building from './components/Building.vue'
import ElevatorQueue from './components/ElevatorQueue.vue'

export default {
  name: 'App',
  components: {
    Building,
    ElevatorQueue
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

    * {
      box-sizing: border-box;
    }

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
