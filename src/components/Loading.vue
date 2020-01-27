<template>
  <div class="loading">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div>Loading data from server.</div>
    <div v-if="long">This can take <del>a few</del> many seconds.</div>
    <div v-else>This can take a few seconds.</div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      longLoading: 4000,
      long: false,
      timeout: undefined
    }
  },
  mounted: function () {
    this.timeout = window.setTimeout(() => {
      this.long = true
    }, this.longLoading)
  },
  beforeDestroy: function () {
    clearTimeout(this.timeout)
  }
}
</script>

<style scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 3px solid black;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: black transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
