<template>
  <div class="container">
    <div ref="openseadragon" class="openseadragon"></div>
  </div>
</template>

<script>

import OpenSeadragon from 'openseadragon'
import axios from 'axios'

const gestureSettings = {
  clickToZoom: false
}

const openSeadragonOptions = {
  showZoomControl: false,
  showFullPageControl: false,
  showHomeControl: false,
  visibilityRatio: .9,
  gestureSettingsTouch: gestureSettings,
  gestureSettingsPen: gestureSettings,
  gestureSettingsMouse: gestureSettings
}

export default {
  props: {
    tileUrl: String,
    gridUrl: String,
    dimensions: Array
  },
  data: function () {
    return {
      grid: undefined
    }
  },
  methods: {
    fetchGrid: async function () {
      const response = await axios.get(this.gridUrl)
      this.grid = response.data
    },
    move: function () {
      this.$emit('move')
    },
    click: function (event) {
      this.$emit('click')

      if (!this.grid || !event.quick) {
        return
      }

      const viewportPoint = this.viewer.viewport.pointFromPixel(event.position)
      const imagePoint = this.viewer.viewport.viewportToImageCoordinates(viewportPoint.x, viewportPoint.y)

      const x = Math.floor(imagePoint.x / this.dimensions[0])
      const y = Math.floor(imagePoint.y / this.dimensions[1])

      try {
        const shot = this.grid[x][y]
        const [videoId, shotId] = shot.split('_')

        this.$router.push({ name: 'shot', params: {
          videoId,
          shotId
        }})
      } catch (err) {
        // User probably clicked outside of grid!
      }
    }
  },
  mounted: function () {
    this.fetchGrid()

    const viewer = OpenSeadragon({
      ...openSeadragonOptions,
      element: this.$refs.openseadragon,
      tileSources: this.tileUrl
    })

    viewer.addHandler('canvas-click', this.click)

    viewer.addHandler('canvas-drag', this.move)
    viewer.addHandler('canvas-scroll', this.move)
    viewer.addHandler('canvas-pinch', this.move)

    this.viewer = viewer
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.openseadragon {
  width: 100%;
  height: 100%;
}
</style>
