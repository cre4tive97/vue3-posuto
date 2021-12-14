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

const el = ref<HTMLElement[] | null>(null);

// `style` will be a helper computed for `left: ?px; top: ?px;`
// const { x, y } = el.value?.forEach((item) => {
//   useDraggable(item, {
//     initialValue: { x: 40, y: 40 },
//     pointerTypes: ["touch"],
//   });
// });
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
});
</script>
<template>
  <div ref="el" :style="style" style="position: fixed">asdfadf</div>
</template>
