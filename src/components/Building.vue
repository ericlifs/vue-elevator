<template>
  <section class="building">
    <div class="building__floor" v-for="floor in floorsArray" v-bind:key="floor">
      {{floor ? floor : 'PB'}}
    </div>
  </section>
</template>

<script>
export default {
  name: 'Building',
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
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    &__floor {
      height: 100%;
      display: flex;
      align-items: center;
      background: #a4b0be;
      justify-content: center;
      border-top: 1px solid black;
      border-bottom: 1px solid black;
    }
  }
</style>
