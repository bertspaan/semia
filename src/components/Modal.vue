<template>
  <div class="modal" ref="modal"
    v-on:click="close">
    <div :class="{
      container: true,
      shadow: true,
      high,
      width
    }">
      <div class="padding close">
        <router-link :to="{ name: 'main' }" tag="button" class="">
          <img alt="Close" src="../assets/x-circle.svg" />
        </router-link>
      </div>
      <slot />
    </div>
  </div>
</template>
<script>

export default {
  props: {
    high: Boolean,
    width: Boolean
  },
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
  flex-shrink: 0;
  max-height: 100%;
  border-radius: 2px;
  max-width: 100%;
  position: relative;
  z-index: 1002;
  background-color: white;
  box-sizing: border-box;
  color: black;
  overflow-y: auto;
}

.width {
  width: 800px;
}

.high {
  height: 100%;
}

.close {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 9999;
}

.high .close {
  position: sticky;
  float: right;
}

@media only screen and (max-width: 768px) {
  .modal {
    padding: 3px;
  }
}
</style>
