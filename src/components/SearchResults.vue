<template>
  <ol>
    <li v-for="item in data" :key="item.videoId">
      <router-link
        :to="{
          name: 'video',
          params: {
            videoId: item.videoId
          }
        }">
        {{ item.data.title }}
      </router-link>
      <img :src="thumbnail(item.videoId)" />
      {{ lengthString(item.data.length) }}
    </li>
  </ol>
</template>

<script>
import { lengthString } from '../functions'

export default {
  props: {
    data: Array
  },
  methods: {
    thumbnail: function (videoId) {
      const baseUrl = process.env.VUE_APP_THUMB_URL
      return `${baseUrl}/${videoId}/${videoId}_0.png`
    },
    lengthString: function (length) {
      return lengthString(length)
    }
  }
}
</script>

<style scoped>

</style>
