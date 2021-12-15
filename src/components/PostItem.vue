<script lang="ts" setup>
import { useDraggable, useElementSize, useEventListener } from "@vueuse/core";
import { ref, reactive } from "vue";

const isDraggable = ref(true);

function setDraggable() {
  isDraggable.value = !isDraggable.value;
}

interface ElType {
  x: number[];
  y: number[];
}
const obj = reactive<ElType>({
  x: [],
  y: [],
});

const post = ref<HTMLElement | null>(null);
const { x, y, style, isDragging, position } = useDraggable(post, {
  exact: true,
  preventDefault: true,
  initialValue: { x: 100, y: 100 },
  onEnd: (position) =>
    console.log(
      style.value,
      Math.floor(position.x),
      Math.floor(position.y),
      Math.floor(width.value),
      Math.floor(height.value)
    ),
});
const { width, height } = useElementSize(post);
</script>
<template>
  <div
    v-if="isDraggable"
    class="post"
    ref="post"
    :style="style"
    style="position: fixed"
    @dblclick="setDraggable"
  >
    <div class="post__draggable">
      {{ isDragging }}
      {{ isDraggable }}
      {{ Math.floor(position.x) }}
      {{ Math.floor(position.y) }}
    </div>
  </div>
  <div
    v-else
    class="post"
    :style="style"
    style="position: fixed"
    @dblclick="setDraggable"
  >
    <div class="post__draggable">
      {{ isDragging }}
      {{ isDraggable }}
      {{ Math.floor(position.x) }}
      {{ Math.floor(position.y) }}
    </div>
  </div>
</template>
<style scoped>
.post {
  box-sizing: content-box;
  width: 200px;
  height: 300px;
  border-top-right-radius: 1rem;
  padding: 12px;
  -webkit-box-shadow: 0px 9px 24px 3px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 9px 24px 3px rgba(0, 0, 0, 0.15);
  overflow: auto;
  overflow-wrap: break-word;
  transition: background-color 0.5s;
  resize: both;
}
</style>
