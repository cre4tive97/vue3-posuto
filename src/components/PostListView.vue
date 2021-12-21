<script lang="ts" setup>
import { toRefs } from "vue";
import PostItem from "@/components/PostItem.vue";
import { PostItemType } from "@/types/props";
import {
  EmitPositionType,
  EmitSizeType,
  EmitZIndexType,
  EmitIdType,
  EmitChangeDraggableStatusType,
} from "@/types/emits";

const props = defineProps<{
  postItems: PostItemType[];
}>();

const emits = defineEmits([
  "change:size",
  "change:position",
  "focus:z-index",
  "delete:post",
  "change:draggableStatus",
]);

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
function emitDeletePost(_id: EmitIdType) {
  emits("delete:post", _id);
}
function emitChangeDraggableStatus(
  draggableStatus: EmitChangeDraggableStatusType
) {
  emits("change:draggableStatus", draggableStatus);
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
      @delete:post="emitDeletePost"
      @change:draggableStatus="emitChangeDraggableStatus"
    />
  </div>
</template>

<style scoped>
.post__container {
  height: 100vh;
}
</style>
