<script lang="ts" setup>
import { ref, reactive, onUpdated, computed } from "vue";
import { store } from "@/store";
import { useDraggable, useElementSize } from "@vueuse/core";
import PostItem from "@/components/PostItem.vue";

const postItems = ref([
  {
    title: "test1",
    content: "test1",
    position: { x: 80, y: 80, width: 50, height: 70 },
  },
  {
    title: "test2",
    content: "test2",
    position: { x: 150, y: 250, width: 60, height: 70 },
  },
]);

interface EmitSizeType {
  width: number;
  height: number;
  index: number;
}
interface EmitPositionType {
  x: number;
  y: number;
  index: number;
}

function saveSize(emitSize: EmitSizeType) {
  postItems.value[emitSize.index].position.width = emitSize.width;
  postItems.value[emitSize.index].position.height = emitSize.height;
}

function savePosition(emitPosition: EmitPositionType) {
  postItems.value[emitPosition.index].position.x = emitPosition.x;
  postItems.value[emitPosition.index].position.y = emitPosition.y;
}
</script>

<template>
  <div class="post__container">
    <PostItem
      v-for="(postItem, i) in postItems"
      :key="i"
      :postItem="postItem"
      :i="i"
      @change:size="saveSize"
      @change:position="savePosition"
    />
  </div>
</template>

<style scoped>
.post__container {
  height: 100vh;
}
</style>
