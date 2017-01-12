<template>
  <audio src="./src/assets/audio/beep.mp3"></audio>
</template>

<script>
export default {
  props: ['remainingTime'],
  watch: {
    remainingTime() {
      if (this.remainingTime === 1) {
        this.$el.play()
      }
    }
  }
}
</script>

<style>
  
</style>