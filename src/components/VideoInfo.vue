<template>
  <section class="video-info shadow text">
    <ul class="header">
      <li>Date: {{ data.date }}</li>
      <li>Duration: {{ lengthString }}</li>
      <li>URL: <a :href="data.url">{{data.url}}</a></li>
    </ul>
    <h3>{{ data.title }}</h3>
    <p>{{ data.description }}</p>
    <p>{{ data.abstract }}</p>
  </section>
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
.video-info {
  flex-shrink: 1;
  overflow-y: auto;
  background-color: white;
  border-radius: 2px;
}

.header {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
