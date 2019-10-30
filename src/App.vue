<template>
  <div id="app">
    <Header />
    <Grid :tileUrl="config.tileUrl" :gridUrl="config.gridUrl"
      :dimensions="config.gridDimensions" />
    <template v-if="$route.params.videoId">
      <Modal>
        <Video
          :apiUrl="config.apiUrl" :thumbUrl="config.thumbUrl"
          :videoId="parseInt($route.params.videoId)"
          :shotId="parseInt($route.params.shotId)" />
      </Modal>
    </template>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header'
import Grid from './components/Grid'
import Modal from './components/Modal'
import Video from './components/Video'
import Footer from './components/Footer'

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
    Footer
  },
  created() {
    window.addEventListener('keydown', (event) => {
      if (event.key === ' ') {
        console.log('Pause video!')
      } else if (event.key === 'Escape' && this.$route.params.videoId) {
        this.$router.push({
          name: 'main'
        })
      }
    })
  },
  data: function() {
    return {
      config
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#app, a, a:visited {
  color: white;
}

#app {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
