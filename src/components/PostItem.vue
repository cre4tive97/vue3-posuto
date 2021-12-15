<script lang="ts" setup>
import { useDraggable, useElementSize, useEventListener } from "@vueuse/core";
import { ref, reactive, onMounted } from "vue";

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
const postElement = ref<HTMLElement | null>(null);
const postSize = ref<HTMLElement | null>(null);
const { width, height } = useElementSize(postSize, {
  width: postElement.value?.offsetWidth - 24,
  height: postElement.value?.offsetHeight - 24,
});

const { x, y, style, isDragging, position } = useDraggable(postElement, {
  exact: true,
  preventDefault: true,
  initialValue: { x: 100, y: 100 },
  onEnd: (position) =>
    console.log(
      style.value,
      Math.floor(position.x),
      Math.floor(position.y),
      width.value,
      height.value
    ),
});
const positionStyle = reactive({
  width: `${width.value}px`,
  height: `${height.value}px`,
  left: `${x.value}px`,
  top: `${y.value}px`,
});
</script>
<template>
  <div
    v-show="isDraggable"
    class="post"
    ref="postElement"
    :style="style"
    style="position: fixed"
    @dblclick="setDraggable"
  >
    <div class="post__draggable">
      {{ isDraggable }}
      {{ width }}
    </div>
  </div>
  <div
    v-show="!isDraggable"
    ref="postSize"
    class="post"
    :style="style"
    style="position: fixed; opacity: 0.7"
    @dblclick="setDraggable"
  >
    <div class="post__draggable">
      {{ isDraggable }}
      {{ width }}
    </div>
  </div>
</template>
<style scoped>
.post {
  background-color: pink;
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
.post__header h1 {
  font-size: 1.25rem;
  font-weight: 400;
}
.post__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.post__btnGroup {
  display: flex;
}
.post__btnGroup i {
  margin-left: 6px;
}
.post__btnGroup i:hover {
  cursor: pointer;
}
.post__input {
  font-size: 1.2rem;
  font-weight: 400;
  width: 100%;
}
.post__content {
  white-space: pre-line;
}
.post__textarea:active,
.post__textarea:focus,
.post__input:focus,
.post__input:active {
  outline: none;
  cursor: text;
}

.hidden {
  display: none;
}
.post__form {
  height: 80%;
}
.post__textarea {
  height: 100%;
  font-size: 1rem;
  font-weight: 400;
  font-family: "Roboto";
  overflow: visible;
  width: 100%;
}
</style>
