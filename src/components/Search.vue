<template>
  <section class="text">
    <input type="text" placeholder="Search…" ref="query"
      @focus="search(query)" v-model="query"  />

    <div v-if="query.length === 0">
      Type a search query to search videos from <a href="https://openbeelden.nl/">Open Beelden</a>.
    </div>

    <div v-else-if="query.length < minQueryLength">
      The search query has to be at least {{ minQueryLength }} characters long.
    </div>

    <div v-else-if="!loading && searchResults.length === 0">
      No videos found.
    </div>
    <ol v-else-if="!loading">
      <li v-for="item in searchResults" :key="item.videoId">
        <div class="result">
          <ShotTile :videoId="item.videoId" :thumbUrl="thumbUrl" />
          <div class="result-text">
            <router-link
              :to="{
                name: 'video',
                params: {
                  videoId: item.videoId
                }
              }">{{ item.data.title.trim() }}</router-link>
            <span class="video-length">{{ lengthString(item.data.length) }}</span>
          </div>
        </div>
      </li>
    </ol>
    <Loading v-else />
  </section>
</template>

<script>
import Loading from './Loading'
import ShotTile from './ShotTile'

import { lengthString } from '../functions'

import axios from 'axios'
// const CancelToken = axios.CancelToken
import { throttle } from 'lodash'

export default {
  components: {
    Loading,
    ShotTile
  },
  props: {
    apiUrl: String,
    thumbUrl: String
  },
  data: function () {
    return {
      query: this.$route.query.query || '',
      searchResults: [],
      loading: false,
      minQueryLength: 2,
      cancel: undefined
    }
  },
  mounted: function () {
    this.$refs.query.focus()
  },
  watch: {
    query: function (query) {
      this.throttledSearch(query)
    }
  },
  methods: {
    throttledSearch: throttle(function (query) {
      this.search(query)
    }, 500),
    search: async function (query) {
      if (query.length < this.minQueryLength) {
        return
      }

      if (query && query.length > 0 && this.$route.query.query !== query) {
        this.$router.push({
          name: 'search',
          query: {
            query
          }
        })
      }

      this.loading = true
      const url = `${this.$props.apiUrl}/search?q=${query}`

      try {
        if (this.cancel) {
          this.cancel.cancel()
        }

        this.cancel = axios.CancelToken.source()

        const response = await axios.get(url, {
          cancelToken: this.cancel.token
        })
        const results = response.data

        this.searchResults = results
        this.loading = false
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(err)
          this.loading = false
        }
      }
    },
    lengthString: function (length) {
      return lengthString(length)
    }
  }
}
</script>

<style scoped>
input {
  margin-bottom: 10px;
}

ol {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.result {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.result a {
  color: black;
}

.result-text {
  margin-left: 10px;
}

.video-length {
  margin-left: 0.2em;
}
</style>
