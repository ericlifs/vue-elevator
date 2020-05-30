<template>
  <section class="elevator">
    <label class="elevator__current-floor">PB</label>
  </section>
</template>

<script>
export default {
  name: 'Elevator',
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