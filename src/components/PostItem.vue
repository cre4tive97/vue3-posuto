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
  i: number;
}
const props = defineProps<Props>();
const emits = defineEmits(["change:size"]);

function setDraggable() {
  if (isDraggable.value) {
    sizeWidth.value = draggableWidth.value;
    sizeHeight.value = draggableHeight.value;
  } else {
    draggableWidth.value = sizeWidth.value;
    draggableHeight.value = sizeHeight.value;
    emits("change:size", {
      width: sizeWidth.value,
      height: sizeHeight.value,
      index: props.i,
    });
  }
  isDraggable.value = !isDraggable.value;
}
const postDraggableElement = ref<HTMLElement | null>(null);
const postSizeElement = ref<HTMLElement | null>(null);
const { width: draggableWidth, height: draggableHeight } = useElementSize(
  postDraggableElement,
  {
    width: props.postItem.width,
    height: props.postItem.height,
  }
);

const { width: sizeWidth, height: sizeHeight } =
  useElementSize(postSizeElement);

const sizeStyle = `width:${draggableWidth.value}px; height:${draggableHeight.value}px;`;

const { x, y, style, isDragging, position } = useDraggable(
  postDraggableElement,
  {
    exact: false,
    initialValue: { x: props.postItem.x, y: props.postItem.y },
    onEnd: () => {
      console.log(
        Math.floor(x.value),
        y.value,
        draggableWidth.value,
        draggableHeight.value,
        sizeWidth.value,
        sizeHeight.value
      );
    },
  }
);
</script>
<template>
  <div class="post">
    <div
      v-show="isDraggable"
      class="post__item"
      ref="postDraggableElement"
      :style="style + sizeStyle"
      style="position: fixed"
      @dblclick="setDraggable"
    >
      <div class="post__draggable">
        {{ isDraggable }}
        {{ draggableWidth }}
      </div>
    </div>
    <div
      v-show="!isDraggable"
      ref="postSizeElement"
      class="post__item"
      :style="style + sizeStyle"
      style="position: fixed; opacity: 0.7"
      @dblclick="setDraggable"
    >
      <div class="post__draggable">
        {{ isDraggable }}
        {{ sizeWidth }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.post__item {
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
