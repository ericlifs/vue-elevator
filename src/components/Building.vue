<template>
  <section class="building">
    <div class="building__floor" v-for="floor in floorsArray" :key="floor">
      <button class="floor__button button--flat" v-on:click="goToFloor(floor)" type="button">
        {{floor ? floor : 'PB'}}
      </button>
    </div>
    <elevator />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Elevator from './Elevator'

const FLOORS = 5;

export default {
  name: 'building',
  components: {
    Elevator,
  },
  computed: {
    floorsArray() {
      return Array.from(Array(FLOORS).keys()).reverse()
    },
  },
  methods: {
    ...mapActions(['goToFloor'])
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
      justify-content: center;
      background-color: #5b6467;
      background-image: linear-gradient(315deg, #5b6467 0%, #8b939a 74%);

      .floor__button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #f8f9d2;
        background-image: linear-gradient(315deg, #f8f9d2 0%, #e8dbfc 74%);
      }
    }
  }
</style>
