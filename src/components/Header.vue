<template>
  <header class="padding">
      <div class="heading">
        <h1>
          <router-link :to="{ name: 'main' }" class="wide-h1">
            The Sensory Moving Image Archive
          </router-link>
          <router-link :to="{ name: 'main' }" class="narrow-h1">
            SEMIA
          </router-link>
        </h1>
        <h2>
          A visualization of 103,273 <br />
          shots from <a href="https://openbeelden.nl/">Open Images</a>
        </h2>
      </div>
      <div class="buttons">
        <router-link tag="button" :to="{ name: $route.name === 'search' ? 'main' : 'search' }">
          <img alt="Search" src="../assets/search.svg" />
        </router-link>
        <router-link tag="button" :to="{ name: $route.name === 'about' ? 'main' : 'about' }">
          <img alt="About" src="../assets/info.svg" />
        </router-link>
      </div>
  </header>
</template>

<script>

export default {
}
</script>

<style scoped>
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;
  background-color: rgb(255, 217, 0);
  flex-shrink: 0;
}

.heading {
  display: flex;
}

.narrow-h1 {
  display: none;
}

header h1, header h2 {
  display: inline;
  margin: 0;
  padding: 0;
  line-height: 1em;
}

header, header a {
  color: black;
  text-decoration: none;
}

header h1 {
  font-size: 24px;
}

header h2 {
  margin-left: 1em;
  font-size: 12px;
  font-style: italic;
}

@media only screen and (max-width: 680px) {
  header {
    padding: 5px;
  }

  header h2 {
    font-size: 10px;
  }

  header h1 {
    font-size: 20px;
  }

  .wide-h1 {
    display: none;
  }

  .narrow-h1 {
    display: inline;
  }
}
</style>
