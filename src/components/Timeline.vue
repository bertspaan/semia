<template>
  <ol class="shots">
    <li v-for="(shot, shotId) in shots" :key="shotId"
      :title="`Shot ${shotId + 1}`"
      :style="{
        width: (shot.end - shot.start) / videoLength * 100 + '%'
      }">
      <router-link :to="{ name: 'shot', params: { videoId, shotId }}">
        <div class="shot-position" :style="{
          width: percentageInShot(shot.start, shot.end, currentTime) * 100 + '%'
        }"></div>
      </router-link>
    </li>
  </ol>
</template>

<script>

export default {
  props: {
    videoId: Number,
    shots: Array,
    currentTime: Number,
    videoLength: Number
  },
  methods: {
    percentageInShot: function (start, end, currentTime) {
      if (currentTime < start) {
        return 0
      } else if (currentTime > end) {
        return 1
      } else {
        return (currentTime - start) / (end - start)
      }
    }
  }
}
</script>

<style scoped>
</style>
