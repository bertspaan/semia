<template>
  <router-link :to="{ name: 'shot', params: { videoId, shotId }}">
    <img
      :title="`Video ${videoId}, shot ${shotId + 1}`"
      class="shadow" :src="`${thumbUrl}/${videoId}/${videoId}_${shotId}.png`" />
  </router-link>
</template>

<script>


export default {
  props: {
    thumbUrl: String,
    videoId: Number,
    shotId: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
img {
  object-fit: cover;
  display: inline-block;
  width: 32px;
  height: 32px;
}

</style>
