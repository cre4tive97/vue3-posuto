<script lang="ts" setup>
import { ref, reactive, onUpdated, computed } from "vue";
import { store } from "@/store";
import { useDraggable, useElementSize } from "@vueuse/core";
import PostItem from "@/components/PostItem.vue";

const postItems = ref([
  {
    x: 80,
    y: 80,
    width: 50,
    height: 70,
  },
  {
    x: 150,
    y: 250,
    width: 60,
    height: 70,
  },
]);
</script>

<template>
  <div class="post__container">
    <PostItem
      v-for="(postItem, i) in postItems"
      :key="i"
      :postItem="postItem"
    />
  </div>
</template>

<style scoped>
.post__container {
  height: 100vh;
}
</style>
