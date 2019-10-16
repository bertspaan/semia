<template>
  <div id="component">
    <video :width="width" :height="height" controls @timeupdate="timeUpdate" ref="video">
      <source type="video/mp4" :src="initialVideoUrl" />
    </video>
    <template v-if="videoData && initialVideoUrl">
      <ol class="shots">
        <li v-for="(shot, shotId) in videoData.shots" :key="shotId"
          :style="{
            width: (shot.end - shot.start) / videoLength * width + 'px'
          }">
          <router-link :to="{ name: 'shot', params: { videoId, shotId }}">
            <div class="shot-position" :style="{
              width: percentageInShot(shot.start, shot.end, currentTime) * 100 + '%'
            }"></div>
          </router-link>
        </li>
      </ol>
      <template v-if="false && currentShot">
        <ul class="similar">
          <li v-for="(data, attribute) in currentShot.similar" :key="attribute">
            {{ attribute }}:
            <ol>
              <li v-for="([videoId, shotId]) in data" :key="videoId + shotId">
                <router-link :to="{ name: 'shot', params: { videoId, shotId }}">
                  <img :src="`${thumbUrl}/${videoId}/${videoId}_${shotId}.png`" />
                </router-link>
              </li>
            </ol>
          </li>
        </ul>
      </template>
    </template>
  </div>
</template>

<script>
import axios from 'axios'

// gaat fout bij
// http://localhost:8080/#/video/98168/shot/7

export default {
  props: {
    apiUrl: String,
    thumbUrl: String,
    videoId: Number,
    shotId: Number
  },
  data: function () {
    return {
      videoData: undefined,
      width: 512,
      height: 288,
      videoUrl: undefined,
      initialVideoUrl: undefined,
      currentTime: undefined,
      dataLoaded: false
    }
  },
  watch: {
    videoId: async function () {
      this.loadVideo()
    },
    shotId: function (shotId) {
      if (this.videoDataInvalid()) {
        this.videoData = undefined
        return
      }

      if (!this.videoData) {
        return
      }

      if (shotId >= this.videoData.shots.length) {
        this.$router.push({ name: 'shot', params: {
          videoId: this.videoId,
          shotId: this.videoData.shots.length - 1
        }})
      } else if (shotId < 0) {
        this.$router.push({ name: 'shot', params: {
          videoId: this.videoId,
          shotId: 0
        }})
      } else {
        const currentTime = this.$refs.video.currentTime
        const newShotId = this.findClosestShot(currentTime)
        if (newShotId !== shotId) {
          this.$refs.video.currentTime = this.videoData.shots[shotId].start
          this.$refs.video.play()
        }
      }
    },
    videoData: function (videoData) {
      if (!videoData) {
        this.videoUrl = undefined
        this.currentTime = 0
        this.initialVideoUrl = undefined
        this.videoLength = 0
        return
      }

      this.videoLength = videoData.shots.reduce((length, shot) => {
        return length + (shot.end - shot.start)
      }, 0)

      let currentTime = 0
      if (this.shotId && this.shotId >= 0 && this.shotId < videoData.shots.length) {
        currentTime = videoData.shots[this.shotId].start
      }

      const mp4s = videoData.medium.filter((url) => url.endsWith('.mp4'))

      this.videoUrl = mp4s[1] || mp4s[0]

      this.currentTime = currentTime
      this.initialVideoUrl = `${this.videoUrl}#t=${currentTime}`
      // this.loadVideo()

      const video = this.$refs.video
      video.load()
      video.play()
    }
  },
  computed: {
    currentShot: function () {
      if (this.videoData && this.videoData.shots[this.shotId]) {
        return this.videoData.shots[this.shotId]
      }
      return undefined
    },
    shotCount: function () {
      return this.videoData.shots.length
    }
  },
  methods: {
    loadVideo: async function () {
      if (this.videoDataInvalid()) {
        this.videoData = undefined
      }

      const video = this.$refs.video
      video.load()

      await this.getVideoData(this.videoId)
    },
    findClosestShot: function (time) {
      let shotId
      for (shotId = 0; shotId < this.videoData.shots.length; shotId++) {
        const shot = this.videoData.shots[shotId]
        if (time <= shot.end) {
          break
        }
      }
      return shotId
    },
    videoDataInvalid: function () {
      if (this.videoData && (this.videoId !== this.videoData.id)) {
        return true
      }
      return false
    },
    getVideoData: async function (videoId) {
      const url = `${this.apiUrl}/${videoId}`

      const response = await axios.get(url)
      this.videoData = response.data
      this.dataLoaded = true
    },
    timeUpdate: function () {
      const video = this.$refs.video
      if (video && video.currentTime) {
        this.currentTime = video.currentTime
      }

      if (this.currentShot) {
        const timeBeyondCurrentShot = this.currentTime > this.currentShot.end
        const hasNextShot = this.shotId < this.shotCount - 1

        if (hasNextShot && timeBeyondCurrentShot) {
          const newShotId = this.findClosestShot(this.currentTime)

          if (newShotId && newShotId !== this.shotId) {
            this.$router.push({ name: 'shot', params: {
              videoId: this.videoId,
              shotId: newShotId
            }})
          }
        }
      }
    },
    toShot: function (start) {
      this.$refs.video.currentTime = start
      this.$refs.video.play()
    },
    percentageInShot: function (start, end, currentTime) {
      if (currentTime < start) {
        return 0
      } else if (currentTime > end) {
        return 1
      } else {
        return (currentTime - start) / (end - start)
      }
    }
  },
  mounted: function () {
    this.loadVideo()
    this.getVideoData(this.videoId)
  }
}
</script>

<style scoped>
.shots {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  height: 2em;
}

.shots li {
  padding: 0;
  margin: 0;
  /* border-color: rgba(255, 196, 0,0.7); */
  /* border-width: 1px; */
  /* border-style: solid; */
  box-sizing: border-box;
}

.shots li:nth-child(odd) {
  background-color: rgba(230, 230, 230, 1);
}

.shots li:hover {
  background-color: rgb(255, 196, 0);
  /* border-width: 3px; */
}

.shot-position {
  height: 100%;
  background-color: rgba(255, 0, 100, 0.8);
}

.similar {
  display: flex;
  list-style-type: none;
}

.similar ol {
  list-style-type: none;
  padding: 0;
}
</style>
