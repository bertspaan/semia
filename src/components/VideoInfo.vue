<template>
  <div>
    <h2>{{ data.title }}</h2>
    <p>{{ data.description }}</p>
    <div><a :href="data.url">Open on Open Beelden</a></div>
    <div class="numbers">
      <span>{{ data.date }}</span>
      <span>{{ lengthString }}</span>
    </div>
    <p>{{ data.abstract }}</p>

  </div>
</template>

<script>

import { lengthString } from '../functions'

export default {
  props: {
    data: Object
  },
  computed: {
    lengthString: function () {
      return lengthString(this.data.length)
    }
  }
}
</script>

<style scoped>
.numbers {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
