<script lang="ts" setup>
import { useDraggable, useElementSize, useEventListener } from "@vueuse/core";
import { ref, reactive, onMounted } from "vue";

const isDraggable = ref(true);
interface Props {
  postItem: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
const props = defineProps<Props>();
const emits = defineEmits(["change:position"]);

function setDraggable() {
  isDraggable.value = !isDraggable.value;
}
const postDraggableElement = ref<HTMLElement | null>(null);
const postSizeElement = ref<HTMLElement | null>(null);
const { width, height } = useElementSize(postDraggableElement, {
  width: props.postItem.width,
  height: props.postItem.height,
});

const { x, y, style, isDragging, position } = useDraggable(
  postDraggableElement,
  {
    exact: true,
    preventDefault: true,
    initialValue: { x: props.postItem.x, y: props.postItem.y },
    onEnd: () => {
      console.log(x.value, y.value, width.value, height.value);
      emits("change:position");
    },
  }
);
const sizeStyle = ref(`width:${width.value}px; height:${height.value}px; `);
</script>
<template>
  <div
    v-show="isDraggable"
    class="post"
    ref="postDraggableElement"
    :style="style + sizeStyle"
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
    ref="postSizeElement"
    class="post"
    :style="style + sizeStyle"
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
