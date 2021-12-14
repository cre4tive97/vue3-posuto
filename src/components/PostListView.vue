<script lang="ts" setup>
import { ref, reactive, onUpdated, computed } from "vue";
import { store } from "@/store";
import { useDraggable, useElementSize } from "@vueuse/core";
import PostItem from "@/components/PostItem.vue";
</script>

<template>
  <div class="post__container">
    <PostItem />
  </div>
</template>

<style scoped>
.post__container {
  height: 100vh;
}
</style>
