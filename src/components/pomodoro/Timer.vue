<template>
  <div>
    <div class="pomodoro-icon"><span :class="activeIcon"></span></div>
    <div class="timer">{{ timer }}</div>
  </div>
</template>

<script>
  export default {
    props: ['timer', 'workIcon'],
    computed: {
      activeIcon() {
        return this.workIcon ? 'icon-work' : 'icon-rest'
      }
    }
  }
</script>

<style scoped>
  .pomodoro-icon {
    font-size: 2rem;
    color: #d8e4e6;
    padding-top: 2rem;
  }

  @media screen and (min-width: 600px) {
    .pomodoro-icon {
      margin-bottom: -20px;
    }
  }

  @media screen and (min-width: 780px) {
    .pomodoro-icon {
      font-size: 4rem;
    }
  }

  .timer {
    font-family: Ultra, sans-serif;
    font-size: 20vw;
    color: #e5e541;
  }
  @media screen and (min-width: 500px) {
    .timer {
      font-size: 15vw;
    }
  }
</style>