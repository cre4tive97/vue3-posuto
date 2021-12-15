<script lang="ts" setup>
import { useDraggable, useElementSize } from "@vueuse/core";
import { ref, reactive } from "vue";

interface ElType {
  x: number[];
  y: number[];
}
const obj = reactive<ElType>({
  x: [],
  y: [],
});

const el = ref<HTMLElement | null>(null);

// `style` will be a helper computed for `left: ?px; top: ?px;`
// const { x, y } = el.value?.forEach((item) => {
//   useDraggable(item, {
//     initialValue: { x: 40, y: 40 },
//     pointerTypes: ["touch"],
//   });
// });
const { x, y, style, isDragging, position } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
  onEnd: (position, (position) => alert(position.x)),
});
</script>
<template>
  <div class="post" ref="el" :style="style" style="position: fixed">
    {{ isDragging }}
    {{ Math.floor(position.x) }}
    {{ Math.floor(position.y) }}
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
