<template>
  <div id="app">
    <Header />
    <main ref="main">
      <Grid :tileUrl="config.tileUrl" :gridUrl="config.gridUrl"
        :dimensions="config.gridDimensions" />
      <transition name="modal-fade">
        <template v-if="$route.name === 'about'">
          <Modal high width>
            <About />
          </Modal>
        </template>
        <template v-else-if="$route.name === 'search'">
          <Modal high width>
            <Search :apiUrl="config.apiUrl" :thumbUrl="config.thumbUrl" />
          </Modal>
        </template>
        <template v-else-if="$route.params.videoId">
          <Modal>
            <Video
              :similarityAttribute.sync="similarityAttribute"
              :volume.sync="volume"
              :maxDimensions="maxModalDimensions"
              :playing.sync="playing"
              :apiUrl="config.apiUrl" :thumbUrl="config.thumbUrl"
              :videoId="parseInt($route.params.videoId)"
              :shotId="parseInt($route.params.shotId || 0)" />
          </Modal>
        </template>
      </transition>
    </main>
  </div>
</template>

<script>
import Header from './components/Header'
import Grid from './components/Grid'
import Modal from './components/Modal'
import Video from './components/Video'
import Search from './components/Search'
import About from './components/About'

const config = {
  tileUrl: process.env.VUE_APP_TILE_URL,
  gridUrl: process.env.VUE_APP_GRID_URL,
  gridDimensions: process.env.VUE_APP_GRID_DIMENSIONS.split('x'),
  apiUrl: process.env.VUE_APP_API_URL,
  thumbUrl: process.env.VUE_APP_THUMB_URL,
  thumbDimensions: process.env.VUE_APP_THUMB_DIMENSIONS
    .split(',')
    .map((dimension) => dimension.split('x'))
}

export default {
  name: 'app',
  components: {
    Header,
    Grid,
    Video,
    Modal,
    Search,
    About
  },
  data: function () {
    return {
      config,
      searchQuery: '',
      playing: false,
      similarityAttribute: 'colour',
      volume: 1,
      maxModalDimensions: [0, 0]
    }
  },
  methods: {
    windowResize: function () {
      const width = this.$refs.main.offsetWidth
      const height = this.$refs.main.offsetHeight
      this.maxModalDimensions = [width - 6, height - 6]
    },
    keyDown: function (event) {
      if (event.key === ' ') {
        this.playing = !this.playing
      } else if (event.key === 'Escape' && this.$route.name !== 'main') {
        this.$router.push({
          name: 'main'
        })
      }
    }
  },
  mounted: function () {
    this.windowResize()
  },
  created: function () {
    window.addEventListener('keydown', this.keyDown)
    window.addEventListener('resize', this.windowResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('keydown', this.keyDown)
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

body, button, input {
  font-size: 16px;
}

.text {
  padding: 10px;
}

.text, .text a, .text a:visited {
  color: black;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  position: relative;
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity .1s;
}

.modal-fade-enter, .modal-fade-leave-to {
  opacity: 0;
}

.ellipsis {
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.padding, section {
  padding: 5px;
}

section > *:first-child {
  margin-top: 0;
  width: calc(100% - 40px);
}

section > *:last-child {
  margin-bottom: 0;
}

.shadow {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.spacing > *:first-child,
.buttons > *:first-child {
  margin-right: 5px;
}

button {
  border: none;
  padding: 0;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

button:hover {
  background: rgba(255, 255, 255, 0.9);
}

button img {
  width: 24px;
  height: 24px;
}
</style>
