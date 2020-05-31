<template>
  <section class="elevator-queue">
    <h3 class="elevator-queue__title elevator-queue__entry">Elevator Queue ({{status}})</h3>
    <label class="elevator-queue__entry" v-for="item in queue" :key="item">
      Request elevator from {{item}} floor
    </label>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ElevatorQueue',
  computed: { ...mapGetters(['status', 'queue']) }
}
</script>

<style lang="scss" scoped>
  .elevator-queue {
    height: 298px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-top: 2px solid;

    &__entry {
      width: 100%;
      padding: 6px 24px;
      text-align: start;
      text-transform: uppercase;
    }

    &__title {
      margin: 0;
      border-bottom: 2px solid;
      background-color: #d9d9d9;
      background-image: linear-gradient(315deg, #d9d9d9 0%, #f6f2f2 74%);
    }
  }
</style>