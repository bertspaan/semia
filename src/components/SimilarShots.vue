<template>
  <div class="similar">
    <button @click="nextAttribute">
      <img v-if="similarityAttribute === 'colour'" alt="Similar shots by colour" src="../assets/colour.svg" />
      <img v-else-if="similarityAttribute === 'shape'" alt="Similar shots by shape" src="../assets/shape.svg" />
      <img v-else-if="similarityAttribute === 'movement'" alt="Similar shots by movement" src="../assets/movement.svg" />
      <img v-else-if="similarityAttribute === 'clutter'" alt="Similar shots by clutter" src="../assets/clutter.svg" />
    </button>
    <ol>
      <li v-for="([videoId, shotId]) in shots[similarityAttribute]" :key="`${videoId}_${shotId}`">
        <ShotTile :videoId="videoId" :shotId="shotId" :thumbUrl="thumbUrl" />
      </li>
    </ol>
  </div>
</template>

<script>
import ShotTile from './ShotTile'

export default {
  props: {
    shots: Object,
    videoId: Number,
    shotId: Number,
    thumbUrl: String,
    similarityAttribute: String
  },
  components: {
    ShotTile
  },
  methods: {
    nextAttribute: function () {
      const currentIndex = this.attributes.indexOf(this.similarityAttribute)
      const nextIndex = (currentIndex + 1) % this.attributes.length
      const newAttribute = this.attributes[nextIndex]

      this.$emit('update:similarityAttribute', newAttribute)
    }
  },
  computed: {
    attributes: function () {
      return Object.keys(this.shots)
    }
  }
}
</script>

<style scoped>
.similar,
.similar ol {
  display: flex;
  flex-direction: row;
}

.similar ol {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.similar ol li {
  margin-left: 5px;
}

</style>
