<template>
  <header>
    <div class="container">
      <h1>
        <span class="text">SEMIA</span>
      </h1>
      <input type="text" v-model="query">
      <template v-if="searchResults.length && !$route.params.videoId">
        <SearchResults :data="searchResults" />
      </template>
    </div>
  </header>
</template>

<script>
import axios from 'axios'
import { throttle } from 'lodash'

import SearchResults from './SearchResults'

export default {
  components: {
    SearchResults
  },
  data: function () {
    return {
      query: '',
      searchResults: []
    }
  },
  methods: {
    throttledSearch: throttle(async function (query) {
      if (query.length <= 2) {
        this.searchResults = []
        return
      }

      const url = `https://semia-api.glitch.me/search?q=${query}`
      const response = await axios.get(url)
      const results = response.data

      this.searchResults = results
    }, 500)
  },
  watch: {
    query: function (query) {
      this.throttledSearch(query)
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  position: absolute;
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  box-sizing: border-box;
  /* pointer-events: none; */
}

.container {
  position: relative;
  background-color: black;
}

h1 {
  pointer-events: all;
  margin: 0;
  padding: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

h1 .text {
  padding: 0 10px;
}

.color {
  height: 1em;
  width: 1em;
  display: inline-block;
}
</style>
