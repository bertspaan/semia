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
.shots {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  height: 12px;
  background-color: rgba(255, 217, 0, 0.2);
  border-radius: 3px;
}

.shots li {
  padding: 0;
  margin: 0;
  border-color: rgba(0, 0, 0, 0.8);
  border-width: 1px;
  border-left-style: solid;
  box-sizing: border-box;
}

.shots li:last-child {
  border-right-style: solid;
}

.shots li:hover {
  background-color: rgba(255, 255, 255, 0.4);
}

.shot-position {
  height: 100%;
  background-color: rgb(255, 217, 0);
}
</style>
