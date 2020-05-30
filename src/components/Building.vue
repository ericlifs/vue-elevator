<template>
  <section class="building">
    <div class="building__floor" v-for="floor in floorsArray" :key="floor">
      <button class="floor__button button--flat" type="button">
        {{floor ? floor : 'PB'}}
      </button>
    </div>
    <Elevator />
  </section>
</template>

<script>
import Elevator from './Elevator'

export default {
  name: 'Building',
  components: {
    Elevator,
  },
  props: {
    floors: Number,
  },
  computed: {
    floorsArray() {
      return Array.from(Array(this.floors).keys()).reverse()
    },
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
