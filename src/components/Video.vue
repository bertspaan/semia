<template>
  <div v-if="videoData"
    ref="video-container"
    class="video-container">
    <video @timeupdate="videoTimeUpdate"
      @loadeddata="videoLoadedData"
      :style="{
        width: width || `${Math.min(maxDimensions[0], preferedWidth)}px`,
        height
      }"
      ref="video" @click="$emit('update:playing', !playing)">
      <source type="video/mp4" :src="initialVideoUrl" />
    </video>

    <div class="overlay controls-bottom padding">
      <div class="space-between margin-bottom">
        <div>
          <template v-if="currentShot">
            <SimilarShots :videoId="videoId" :shotId="shotId" class="no-overlay"
              :similarityAttribute="similarityAttribute"
              @update:similarityAttribute="$emit('update:similarityAttribute', $event)"
              :thumbUrl="thumbUrl" :shots="currentShot.similar" />
          </template>
        </div>
        <div class="buttons">
          <template v-if="this.volume">
            <button @click="toggleVolume" title="Turn volume off">
              <img src="../assets/volume.svg" />
            </button>
          </template>
          <template v-else>
            <button @click="toggleVolume" title="Turn volume on">
              <img src="../assets/volume-x.svg" />
            </button>
          </template>
          <button @click="fullScreen" title="Watch video in full screen">
            <img src="../assets/maximize.svg" />
          </button>
        </div>
      </div>
      <Timeline :shots="videoData.shots" :videoId="videoId" class="no-overlay"
        :videoLength="videoLength" :currentTime="currentTime" />
    </div>

    <div class="overlay controls-top padding">
      <div class="heading spacing">
        <button @click="showInfo = !showInfo" title="Show video metadata">
          <img src="../assets/info.svg" />
        </button>
        <h3 class="ellipsis" :title="videoData.title">{{ videoData.title }}</h3>
      </div>
      <VideoInfo v-if="showInfo && videoData"
        :data="videoData" class="no-overlay" />
    </div>

    <div class="overlay controls-centered padding play">
      <transition name="play-fade">
        <button title="Play video" v-if="!playing" @click="$emit('update:playing', true)">
          <img src="../assets/play-circle.svg" />
        </button>
      </transition>
    </div>
  </div>
  <div v-else class="padding centered">
    <Loading />
  </div>
</template>

<script>
import axios from 'axios'

import VideoInfo from './VideoInfo'
import Timeline from './Timeline'
import SimilarShots from './SimilarShots'
import Loading from './Loading'

export default {
  components: {
    VideoInfo,
    Timeline,
    SimilarShots,
    Loading
  },
  props: {
    apiUrl: String,
    thumbUrl: String,
    videoId: Number,
    shotId: Number,
    playing: Boolean,
    volume: Number,
    similarityAttribute: String,
    maxDimensions: Array
  },
  data: function () {
    return {
      videoLoaded: false,
      videoData: undefined,
      showInfo: false,
      videoUrl: undefined,
      initialVideoUrl: undefined,
      currentTime: undefined,
      videoLength: undefined,
      videoDimensions: undefined,
      preferedWidth: 800,
      width: undefined,
      height: undefined
    }
  },
  watch: {
    playing: function () {
      this.setPlaying(this.playing)
    },
    videoId: async function () {
      this.videoLoaded = false
      this.width = undefined
      this.height = undefined

      this.loadVideo()
    },
    maxDimensions: function () {
      this.setDimensions()
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
        const video = this.$refs.video
        const currentTime = video.currentTime
        const newShotId = this.findClosestShot(currentTime)
        if (newShotId !== shotId) {
          video.currentTime = this.videoData.shots[shotId].start
          if (this.playing) {
            video.play()
          }
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
      if (this.shotId !== undefined && this.shotId >= 0 && this.shotId < videoData.shots.length) {
        currentTime = videoData.shots[this.shotId].start
      }

      // A video from Open Beelden can be available in multiple formats
      // In this app, we only use MP4s
      const mp4s = videoData.medium.filter((url) => url.endsWith('.mp4'))

      // All videos have at least one MP4 video, but some can have more
      // I don't remember why choosing [1] over [0] is better, to be honest...
      this.videoUrl = mp4s[1] || mp4s[0]

      this.currentTime = currentTime
      this.initialVideoUrl = `${this.videoUrl}#t=${currentTime}`
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
    setDimensions: function () {
      if (this.videoLoaded) {
        const videoAspect = this.aspectRatio(this.videoDimensions)
        const modalAspect = this.aspectRatio(this.maxDimensions)

        let dimensions
        if (modalAspect > videoAspect) {
          dimensions = [
            this.videoDimensions[0] * this.maxDimensions[1] / this.videoDimensions[1],
            this.maxDimensions[1]
          ]
        } else {
          dimensions = [
            this.maxDimensions[0],
            this.videoDimensions[1] * this.maxDimensions[0] / this.videoDimensions[0]
          ]
        }

        const preferedHeight = 1 / this.aspectRatio(dimensions) * this.preferedWidth
        if (dimensions[0] < this.preferedWidth) {
          this.width = `${dimensions[0]}px`
          } else if (dimensions[1] < preferedHeight) {
          this.height = `${dimensions[1]}px`
        } else {
          this.width = `${this.preferedWidth}px`
        }
      }
    },
    aspectRatio: function (dimensions) {
      return dimensions[0] / dimensions[1]
    },
    videoLoadedData: function () {
      const video = this.$refs.video

      if (video) {
        this.videoLoaded = true
        this.videoDimensions = [
          video.videoWidth,
          video.videoHeight
        ]

        this.setDimensions()
      }

      this.setPlaying(this.playing)
      this.setVolume(this.volume)
    },
    setVolume: function (volume) {
      const video = this.$refs.video
      if (video) {
        video.volume = volume
        this.$emit('update:volume', volume)
      }
    },
    toggleVolume: function () {
      const video = this.$refs.video
      if (video) {
        if (video.volume > 0) {
          this.setVolume(0)
        } else {
          this.setVolume(1)
        }
      }
    },
    fullScreen: function () {
      const video = this.$refs.video
      if (video) {
        if (video.requestFullscreen) {
          video.requestFullscreen()
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen()
        } else if (video.mozRequestFullScreen) {
          video.mozRequestFullScreen()
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen()
        }
      }
    },
    loadVideo: async function () {
      if (this.videoDataInvalid()) {
        this.videoData = undefined
      }

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
      const url = `${this.apiUrl}/videos/${videoId}`

      const response = await axios.get(url)
      this.videoData = response.data
    },
    setPlaying: function (playing) {
      const video = this.$refs.video
      if (video) {
        if (playing) {
          video.play()
        } else {
          video.pause()
        }
      }
    },
    videoTimeUpdate: function () {
      const video = this.$refs.video
      if (video && video.currentTime !== undefined) {
        this.currentTime = video.currentTime
      }

      if (this.currentShot) {
        const timeBeyondCurrentShot = this.currentTime > this.currentShot.end
        const hasNextShot = this.shotId < this.shotCount - 1

        if (hasNextShot && timeBeyondCurrentShot) {
          const newShotId = this.findClosestShot(this.currentTime)

          if (newShotId !== undefined && newShotId !== this.shotId) {
            this.$router.push({ name: 'shot', params: {
              videoId: this.videoId,
              shotId: newShotId
            }})
          }
        }
      }
    },
    toShot: function (start) {
      const video = this.$refs.video

      video.currentTime = start
      if (!this.paused) {
        video.play()
      }
    }
  },
  mounted: function () {
    this.loadVideo()
  },
  beforeDestroy: function () {
    const video = this.$refs.video
    if (video) {
      const container = this.$refs['video-container']
      container.style.display = 'none'
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  }
}
</script>

<style scoped>
.video-container {
  display: flex;
}

.heading {
  max-width: calc(100% - 40px);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
}

.overlay {
  pointer-events: none;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}

.overlay button,
.no-overlay {
  pointer-events: all;
}

h3 {
  margin: 0;
  color: white;
  text-shadow:
    0.07em 0 black,
    0 0.07em black,
    -0.07em 0 black,
    0 -0.07em black;
}

.centered {
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls-centered {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play button {
  transform: scale(3);
  z-index: 9999;
}

.play-fade-enter-active, .play-fade-leave-active {
  transition: opacity .1s;
}
.play-fade-enter, .play-fade-leave-to {
  opacity: 0;
}

.controls-top {
  width: 100%;
  position: absolute;
  top: 0;
}

.space-between {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.margin-bottom {
  margin-bottom: 5px;
}

video {
  width: 100%;
  max-height: 100%;
  border-radius: 2px;
}

.controls-bottom {
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>
