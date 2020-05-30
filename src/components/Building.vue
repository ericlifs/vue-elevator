<template>
  <section class="building">
    <div class="building__floor" v-for="floor in floorsArray" :key="floor">
      <button class="floor__button button--flat" v-on:click="queueRequest(floor)" type="button">
        {{floor ? floor : 'PB'}}
      </button>
    </div>
    <Elevator />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Elevator from './Elevator'

const FLOORS = 5;

export default {
  name: 'Building',
  components: {
    Elevator,
  },
  computed: {
    floorsArray() {
      return Array.from(Array(FLOORS).keys()).reverse()
    },
  },
  methods: {
    ...mapActions(['queueRequest'])
  }
}
</script>

<style scoped lang="scss">
  .building {
    position: relative;
    display: inline-block;

    &__floor {
      width: 400px;
      height: 100px;
      display: flex;
      align-items: center;
      background: #a4b0be;
      justify-content: center;

      .floor__button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid white;
        background: gold;
      }
    }
  }
</style>
