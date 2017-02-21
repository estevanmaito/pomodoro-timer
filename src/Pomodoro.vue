<template>
  <div>
    <pomodoro-timer
      class="pomodoro-timer"
      :workIcon="workIcon"
      :timer='timer'>
    </pomodoro-timer>
    <div class="pomodoro-container">
      <pomodoro-controls
        :pomoHasStarted='pomoHasStarted'
        @timerStart='startTimer'
        @timerReset='resetTimer'
        @historyShow='showHistory'>
      </pomodoro-controls>
      <transition
        name="slide-fade">
        <pomodoro-history
          v-if='historyIsVisible'
          :pomos='pomos'>
        </pomodoro-history>
      </transition>
    </div>
    <pomodoro-footer></pomodoro-footer>
    <pomodoro-sound
      :remainingTime="remainingTime">
    </pomodoro-sound>
  </div>
</template>

<script>
import PomodoroTimer from './components/pomodoro/Timer.vue'
import PomodoroControls from './components/pomodoro/Controls.vue'
import PomodoroHistory from './components/pomodoro/History.vue'
import PomodoroFooter from './components/pomodoro/Footer.vue'
import PomodoroSound from './components/pomodoro/Sound.vue'
import DB from './assets/js/db.js'

const POMODORO_25_MINUTES = 1500
const ONE_SECOND = 1000
const ONE_HOUR_IN_SECONDS = 3600
const ONE_MINUTE_IN_SECONDS = 60

export default {
  data() {
    return {
      remainingTime: 0,
      pomos: [
        { type: 'Single Pomodoro', duration: 1500, started: '' },
        { type: 'Short Break', duration: 300, started: '' },
        { type: 'Single Pomodoro', duration: 1500, started: '' },
        { type: 'Short Break', duration: 300, started: '' },
        { type: 'Single Pomodoro', duration: 1500, started: '' },
        { type: 'Short Break', duration: 300, started: '' },
        { type: 'Single Pomodoro', duration: 1500, started: '' },
        { type: 'Long Break', duration: 900, started: '' }
      ],
      historyIsVisible: false,
      pomoHasStarted: false,
      interval: '',
      workIcon: true
    }
  },
  computed: {
    timer() {
      return this.formatTime(this.remainingTime)
    }
  },
  components: {
    PomodoroTimer,
    PomodoroControls,
    PomodoroHistory,
    PomodoroFooter,
    PomodoroSound
  },
  methods: {
    startTimer() {
      this.pomoHasStarted = true
      this.nextPomo()
    },
    resetTimer() {
      clearInterval(this.interval)
      this.pomoHasStarted = false
      this.remainingTime = POMODORO_25_MINUTES
      this.pomos.forEach((pomo) => {
        pomo.started = ''
      })
    },
    showHistory() {
      this.historyIsVisible = !this.historyIsVisible
    },
    newPomo(callback) {
      clearInterval(this.interval)
      this.interval = setInterval(callback, ONE_SECOND)
    },
    clockTick(time) {
      const SELF = this
      this.remainingTime = time
      this.newPomo(() => {
        SELF.remainingTime--
      })
    },
    formatTime(seconds) {
      const MIN = Math.floor(seconds % ONE_HOUR_IN_SECONDS / ONE_MINUTE_IN_SECONDS)
      const SEC = Math.floor(seconds % ONE_HOUR_IN_SECONDS % ONE_MINUTE_IN_SECONDS)
      const TIME_FORMATED = `${(MIN < 10 ? '0' : '')}${MIN}:${(SEC < 10 ? '0' : '')}${SEC}`
      return TIME_FORMATED
    },
    nextPomo() {
      let timeStarted;

      if (!this.allPomosHaveFinished()) {
        for (var i = 0; i < this.pomos.length; i++) {
          if (!this.pomos[i].started) {
            timeStarted = new Date()
            this.pomos[i].started = timeStarted
            this.savePomodoro(i, timeStarted)
            this.clockTick(this.pomos[i].duration)
            break
          }
        }
      } else {
        clearInterval(this.interval)
      }
    },
    allPomosHaveFinished() {
      return this.pomos.every(pomo => {
        return pomo.started
      })
    },
    savePomodoro(index, time) {
      if (this.pomos[index].duration !== POMODORO_25_MINUTES) {
        DB.create('pomosHistory', time)
        this.workIcon = false
      } else {
        this.workIcon = true
      }
    }
  },
  watch: {
    remainingTime() {
      if (this.remainingTime === 0) {
        this.nextPomo()
      }
    },
    timer() {
      document.title = `${this.timer} | Pomodoro Timer`
    }
  }
}
</script>

<style>
  .pomodoro-timer {
    text-align: center;
  }

  .pomodoro-container {
    width: 80%;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all .4s ease-in-out;
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
</style>
