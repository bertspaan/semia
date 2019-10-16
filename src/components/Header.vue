<template>
  <header>
    <div class="container">
      <h1>
        <span v-for="color in colors.slice(0, 3)"
          :key="color" class="color"
          :style="{
            backgroundColor: color
          }" />
        <span class="text">SEMIA</span>
        <span v-for="color in colors.slice(3)"
          :key="color" class="color"
          :style="{
            backgroundColor: color
          }" />
      </h1>
    </div>
  </header>
</template>

<script>

export default {
  data: function () {
    return {
      colors: [
        '#dee100',
        '#00e4e1',
        '#00e500',
        '#f400e7',
        '#f20001',
        '#2b00e7'
      ]
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  position: absolute;
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  box-sizing: border-box;
  pointer-events: none;
}

.container {
  position: relative;
  background-color: black;
}

h1 {
  pointer-events: all;
  margin: 0;
  padding: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

h1 .text {
  padding: 0 10px;
}

.color {
  height: 1em;
  width: 1em;
  display: inline-block;
}
</style>
