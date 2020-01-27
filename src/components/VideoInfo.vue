<template>
  <section class="video-info shadow text">
    <dl>
      <dt>Date:</dt><dd>{{ data.date }}</dd>
      <dt>Duration:</dt><dd>{{ lengthString }}</dd>
      <dt>URL:</dt><dd><a :href="data.url">{{data.url}}</a></dd>
    </dl>
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
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  z-index: 10000;
}

dl {
  display: inline-block;
  margin: 0;
}

dt {
  clear: both;
  float: left;
  width: 100px;
  padding: 0;
  margin: 0
}

dd {
  float: left;
  width: 50%;
  padding: 0;
  margin: 0
}
</style>
