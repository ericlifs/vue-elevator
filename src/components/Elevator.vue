<template>
  <section class="elevator" ref="elevator">
    <div class="elevator__buttons" v-if="showButtons">
      <button v-for="floor in floors" :key="floor" @click="onButtonPressed(floor)" class="elevator__button button--flat">
        {{floor || 'PB'}}
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { TimelineLite } from 'gsap'
import ELEVATOR_STATUS from '../store/modules/elevator-status';

const timeline = new TimelineLite()

export default {
  name: 'elevator',
  props: {
    floors: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters(['currentFloor', 'status']),
    showButtons() {
      return this.status === ELEVATOR_STATUS.WAITING_FOR_INPUT
    }
  },
  watch: {
    currentFloor() {
      this.goToCurrentFloor();
    }
  },
  methods: {
    ...mapActions(['onTravelEnded', 'goToFloor', 'setProcessingRequest']),
    onButtonPressed(floor) {
      if (floor !== this.currentFloor) {
        this.setProcessingRequest(true)
        this.goToFloor(floor)
      }
    },
    goToCurrentFloor() {
      const { elevator } = this.$refs;

      timeline.to(elevator, {
        y: `${(this.currentFloor * -100)}px`,
        duration: 1.5,
        onComplete: this.onTravelEnded,
        onCompleteParams: [this.currentFloor],
      });
    }
  }
}
</script>

<style scoped lang="scss">
  .elevator {
    bottom: 0;
    right: -100px;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: #b8c6db;
    background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%);

    &__buttons {
      grid-template-columns: 1fr 1fr;
      position: absolute;
      display: grid;
      grid-gap: 4px;
      padding: 4px;
      bottom: 0;
      right: 0;
      left: 0;
      top: 0;
    }

    &__button {
      border-radius: 10px;
      border: 1px solid;
    }
  }
</style>