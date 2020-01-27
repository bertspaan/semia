<template>
  <div class="intro padding">
    <div class="container shadow">
      <div class="text">
        This is a visualization and exploration of 103,273 shots from 6,969 open license videos, sorted by color. Move around and zoom to explore the visualization, or click any shot to start watching. See the <img class="icon" alt="About" src="../assets/info.svg" /> <router-link :to="{name: 'about'}">About</router-link> page for more information about this project.
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {

  }
}
</script>

<style scoped>
  .intro {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }

  .container {
    border-radius: 2px;
    width: 400px;
    max-width: 100%;
    background-color: rgb(255, 217, 0);
  }
</style>
