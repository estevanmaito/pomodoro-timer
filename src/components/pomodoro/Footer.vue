<template>
  <footer>
    <div class="pomodoro-footer__container">
      <span>Made by <a href="https://github.com/estevanmaito" target="_blank">@estevanmaito</a></span>
      <a href="https://github.com/estevanmaito/pomodoro-timer" target="_blank" class="icon-github"></a>
    </div>
  </footer>
</template>

<script>

</script>

<style scoped>
  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #416f7a;
    height: 60px;
    color: #d8e4e6;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pomodoro-footer__container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 80%;
    max-width: 400px;
  }

  .icon-github {
    font-size: 2rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
</style>