<template>
  <div>
    <SquareLoader color="#8BDDED" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SquareLoader from "vue-spinner/src/SquareLoader.vue";
export default Vue.extend({
  components: {
    SquareLoader,
  },
});
</script>

<style scoped>
div {
  width: 100vw;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
</style>
