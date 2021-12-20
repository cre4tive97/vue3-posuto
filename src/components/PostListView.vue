<script lang="ts" setup>
import { ref, reactive, onUpdated, computed, toRefs } from "vue";
import { store } from "@/store";
import { useDraggable, useElementSize } from "@vueuse/core";
import PostItem from "@/components/PostItem.vue";
import { PostItemType, Props } from "@/types/props";

const props = defineProps<{
  postItems: PostItemType[];
}>();
const { postItems } = toRefs(props);

// interface EmitSizeType {
//   width: number;
//   height: number;
//   index: number;
// }
// interface EmitPositionType {
//   x: number;
//   y: number;
//   index: number;
// }

// function saveSize(emitSize: EmitSizeType) {
//   postItems.value[emitSize.index].position.width = emitSize.width;
//   postItems.value[emitSize.index].position.height = emitSize.height;
// }

// function savePosition(emitPosition: EmitPositionType) {
//   postItems.value[emitPosition.index].position.x = emitPosition.x;
//   postItems.value[emitPosition.index].position.y = emitPosition.y;
// }
</script>

<template>
  <div class="post__container">
    <PostItem
      v-for="(postItem, i) in postItems"
      :key="i"
      :postItem="postItem"
      :i="i"
      @change:size="$emit('change:size')"
      @change:position="$emit('change:position')"
    />
  </div>
</template>

<style scoped>
.post__container {
  height: 100vh;
}
</style>
