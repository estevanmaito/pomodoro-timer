<template>
  <div>
    <table class="pomodoro-history">
      <tr>
        <th>Type</th>
        <th>Length</th>
        <th>Started</th>
      </tr>
      <tr v-for="pomo in formatedPomos">
        <td>{{ pomo.type }}</td>
        <td>{{ pomo.duration }}</td>
        <td>{{ pomo.started}}</td>
      </tr>
    </table>
    <p>Pomos today: {{ totalPomosToday }}</p>
    <p>Pomos history: {{ totalPomosCount }}</p>
  </div>
</template>

<script>
  import DB from '../../assets/js/db.js'

  const ONE_MINUTE_IN_SECONDS = 60

  export default {
    props: ['pomos'],
    data() {
      return {
        totalPomosToday: this.getTotalPomosCount(),
        totalPomosCount: this.getTodayPomosCount()
      }
    },
    computed: {
      formatedPomos() {
        return this.pomos.map(pomo => {
          const DURATION_IN_MINUTES = pomo.duration / ONE_MINUTE_IN_SECONDS
          const DURATION = DURATION_IN_MINUTES < 10 ? `0${DURATION_IN_MINUTES}:00` : `${DURATION_IN_MINUTES}:00`

          const STARTED = this.formatDate(pomo.started)

          return {
            type: pomo.type,
            duration: DURATION,
            started: STARTED
          }
        })
      }
    },
    methods: {
      formatDate(date) {
        const DATE_FORMAT = {
          hour: '2-digit',
          minute: '2-digit'
        }

        if (Object.prototype.toString.call(date) === '[object Date]') {
          return new Date(date).toLocaleTimeString('pt-BR', DATE_FORMAT)
        }
        return '';
      },
      getTotalPomosCount() {
        return DB.read('pomosHistory').length || 0
      },
      getTodayPomosCount() {
        return DB.read('pomosHistory').filter((date) => {
          return new Date(date).getDate() === new Date().getDate()
        }).length || 0
      }
    },
    beforeUpdate() {
      this.totalPomosCount = this.getTotalPomosCount()
      this.totalPomosToday = this.getTodayPomosCount()
    }
  }
</script>

<style scoped>
  div {
    color: #345962;
  }

  .pomodoro-history {
    text-align: left;
    margin: 0 auto;
    border-collapse: collapse;
  }

  .pomodoro-history td,
  .pomodoro-history th {
    padding: 2px 16px;
  }
</style>