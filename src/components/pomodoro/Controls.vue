<template>
  <div class="pomodoro-controls">
    <button v-if="!pomoHasStarted" @click="startTimer" class="icon-start">Start</button>
    <button v-if="pomoHasStarted" @click="resetTimer" class="icon-refresh">Reset</button>
    <button @click="showHistory" class="icon-clock">History</button>
  </div>
</template>

<script>
  export default {
    props: ['pomoHasStarted'],
    methods: {
      startTimer() {
        this.$emit('timerStart')
      },
      resetTimer() {
        this.$emit('timerReset')
      },
      showHistory() {
        this.$emit('historyShow')
      }
    }
  }
</script>

<style scoped>
  .pomodoro-controls {
    margin-bottom: 3.6rem;
  }

  button {
    box-sizing: border-box;
    outline: none;
    border: none;
    border-radius: 3px;
    background: #416f7a;
    padding: 15px 20px;
    box-shadow: inset 0 -4px 0 rgba(0, 0, 0, .2);
    color: #d8e4e6;
    cursor: pointer;
    transition: all .1s ease-in-out;
  }

  button:hover {
    background: #50818d;
  }

  button:active {
    box-shadow: inset 0 4px 4px rgba(0, 0, 0, .2);
  }

  button:last-child {
    margin-left: 1rem;
  }
</style>