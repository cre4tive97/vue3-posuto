<script lang="ts" setup>
import { ref, reactive, onUpdated, computed, toRefs } from "vue";
import { store } from "@/store";
import { useDraggable, useElementSize } from "@vueuse/core";
import PostItem from "@/components/PostItem.vue";
import { PostItemType, Props } from "@/types/props";
import { EmitPositionType, EmitSizeType, EmitZIndexType } from "@/types/emits";

const props = defineProps<{
  postItems: PostItemType[];
}>();

const emits = defineEmits(["change:size", "change:position", "focus:z-index"]);

const { postItems } = toRefs(props);

function emitChangeSize(size: EmitSizeType) {
  emits("change:size", size);
}
function emitChangePosition(position: EmitPositionType) {
  emits("change:position", position);
}
function emitFocusZIndex(index: EmitZIndexType) {
  emits("focus:z-index", index);
}
</script>

<template>
  <div class="post__container">
    <PostItem
      v-for="(postItem, i) in postItems"
      :key="i"
      :postItem="postItem"
      :i="i"
      @change:size="emitChangeSize"
      @change:position="emitChangePosition"
      @focus:z-index="emitFocusZIndex"
    />
  </div>
</template>

<style scoped>
.post__container {
  height: 100vh;
}
</style>
