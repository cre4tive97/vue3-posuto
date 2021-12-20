<script lang="ts" setup>
import { ref, reactive, onUpdated, computed, toRefs } from "vue";
import { store } from "@/store";
import { useDraggable, useElementSize } from "@vueuse/core";
import PostItem from "@/components/PostItem.vue";
import { PostItemType, Props } from "@/types/props";
import { EmitPositionType, EmitSizeType } from "@/types/emits";

const props = defineProps<{
  postItems: PostItemType[];
}>();

const emits = defineEmits(["change:size", "change:position"]);

const { postItems } = toRefs(props);

function emitChangeSize(size: EmitSizeType) {
  emits("change:size", size);
}
function emitChangePosition(position: EmitPositionType) {
  emits("change:position", position);
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
    />
  </div>
</template>

<style scoped>
.post__container {
  height: 100vh;
}
</style>
