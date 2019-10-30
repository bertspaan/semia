<template>
  <div class="modal" ref="modal"
    v-on:click="close">
    <div class="container">
      <router-link :to="{ name: 'main' }">
        Close
      </router-link>
      <slot />
    </div>
  </div>
</template>
<script>

export default {
  methods: {
    close: function (event) {
      if (event.target === this.$refs.modal) {
        this.$router.push({
          name: 'main'
        })
      }
    }
  }
}
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 600px;
  position: relative;
  z-index: 1002;
  background-color: black;
  padding: 10px;
}
</style>
