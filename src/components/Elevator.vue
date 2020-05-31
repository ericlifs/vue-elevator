<template>
  <section class="elevator" ref="elevator">
    <label>{{status}}</label>
    <label class="elevator__current-floor">{{currentFloor}}</label>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { TimelineLite } from 'gsap'

const timeline = new TimelineLite()

export default {
  name: 'elevator',
  computed: { ...mapGetters(['currentFloor', 'status']) },
  watch: {
    currentFloor() {
      this.goToCurrentFloor();
    }
  },
  methods: {
    ...mapActions(['onTravelEnded']),
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

    &__current-floor {
      font-weight: 700;
    }
  }
</style>