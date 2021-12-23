<script lang="ts" setup>
import { useDraggable, useElementSize } from "@vueuse/core";
import { ref, toRefs } from "vue";
import { PostItemType } from "@/types/props";

// Props
const props = defineProps<{
  postItem: PostItemType;
  i: number;
}>();
const { postItem, i } = toRefs(props);
// Emits
const emits = defineEmits([
  "change:size",
  "change:position",
  "focus:z-index",
  "delete:post",
  "change:draggableStatus",
  "save:post",
  "change:title",
  "change:contents",
]);

// State
const title = ref(postItem.value.title);
const contents = ref(postItem.value.contents);

// title state와 title input value 일치화
function matchTitle(e: Event) {
  const target = e.target as HTMLInputElement;
  title.value = target.value;
}
// contents state와 contents textarea value 일치화
function matchContents(e: Event) {
  const target = e.target as HTMLTextAreaElement;
  contents.value = target.value;
}

function emitDeletePost() {
  emits("delete:post", postItem.value._id);
}

// 현재 title이 props로 받은 title과 다르다면 emit
function emitChangeTitle() {
  const titleData = {
    title: title.value,
    index: i.value,
  };
  if (title.value !== postItem.value.title) {
    emits("change:title", titleData);
  }
}

// 현재 contents가 props로 받은 contents와 다르다면 emit
function emitChangeContents() {
  const contentsData = {
    contents: contents.value,
    index: i.value,
  };
  if (contents.value !== postItem.value.contents) {
    emits("change:contents", contentsData);
  }
}

// 드래그 불가능 && width 또는 height가 props로 받은 width 또는 height와 다르다면 emit
function emitChangeSize() {
  const sizeData = {
    width: sizeWidth.value,
    height: sizeHeight.value,
    index: i.value,
  };
  if (
    !postItem.value.isDraggable &&
    (sizeWidth.value !== postItem.value.position.width ||
      sizeHeight.value !== postItem.value.position.height)
  ) {
    emits("change:size", sizeData);
  }
}

// 드래그 상태 토글
function emitChangeDraggableStatus() {
  const draggableStatus = {
    status: !postItem.value.isDraggable,
    index: i.value,
  };
  emits("change:draggableStatus", draggableStatus);
}

// 드래그 가능한 상태라면 포스트 저장 emit
function emitSavePost() {
  if (postItem.value.isDraggable) emits("save:post", i.value);
}

// Draggable 토글
function setDraggable() {
  emitChangeTitle();
  emitChangeContents();
  emitChangeSize();
  emitChangeDraggableStatus();
  emitSavePost();
}

// useDraggable / useElementSize
const postDraggableElement = ref<HTMLElement | null>(null);
const postSizeElement = ref<HTMLElement | null>(null);
const { width: sizeWidth, height: sizeHeight } =
  useElementSize(postSizeElement);

const { x, y, style } = useDraggable(postDraggableElement, {
  exact: false,
  initialValue: {
    x: postItem.value.position.x,
    y: postItem.value.position.y,
  },
  // 클릭한 엘레먼트의 z-index를 최상위로 올림
  onStart: () => {
    if (postItem.value.position.z === 1) {
      emits("focus:z-index", {
        z: 2,
        index: i.value,
      });
    }
  },
  // 드래그 종료시 position 값을 emit
  onEnd: () => {
    if (
      x.value !== postItem.value.position.x ||
      y.value !== postItem.value.position.y
    ) {
      // x 또는 y가 props로 받은 x 또는 y와 다르다면 emit
      emits("change:position", {
        x: x.value,
        y: y.value,
        index: i.value,
      });
      // props 변경 후 emit
      emits("save:post", i.value);
    }
    if (postItem.value.position.z === 2) {
      emits("focus:z-index", {
        z: 1,
        index: i.value,
      });
    }
  },
});
const btnGroupDraggable = ref<HTMLDivElement>();
const btnGroupSizable = ref<HTMLDivElement>();
// 포스트 위에 마우스 올릴 시 버튼을 보여줌
function onMouseOver(el: HTMLDivElement | undefined) {
  if (el) el.classList.remove("hidden");
}
// 포스트 위에서 마우스가 사라지면 버튼을 사라지게 함
function onMouseLeave(el: HTMLDivElement | undefined) {
  if (el) el.classList.add("hidden");
}
</script>
<template>
  <div class="post">
    <div
      @mouseover="onMouseOver(btnGroupDraggable)"
      @mouseleave="onMouseLeave(btnGroupDraggable)"
      v-show="postItem.isDraggable"
      class="post__item draggable"
      ref="postDraggableElement"
      :style="
        style +
        `width:${postItem.position.width}px; height:${postItem.position.height}px; z-index:${postItem.position.z}`
      "
      style="position: fixed"
      @dblclick="setDraggable"
    >
      <div class="post__draggable">
        <div class="post__header">
          <h1>
            {{ title }}
          </h1>
          <div ref="btnGroupDraggable" class="post__btnGroup hidden">
            <i class="far fa-trash-alt" @click="emitDeletePost"></i>
          </div>
        </div>
        <hr />
        <div class="post__content">
          {{ contents }}
        </div>
      </div>
    </div>
    <div
      @mouseover="onMouseOver(btnGroupSizable)"
      @mouseleave="onMouseLeave(btnGroupSizable)"
      v-show="!postItem.isDraggable"
      ref="postSizeElement"
      class="post__item resizable"
      :style="
        style +
        `width:${postItem.position.width}px; height:${postItem.position.height}px; z-index:${postItem.position.z}`
      "
      style="position: fixed; opacity: 0.7"
      @dblclick="setDraggable"
    >
      <div class="post__draggable">
        <div class="post__header">
          <form @submit.prevent class="post__form">
            <input
              class="post__input"
              type="text"
              placeholder="제목을 입력하세요"
              :value="title"
              @input="matchTitle($event)"
            />
          </form>
          <div ref="btnGroupSizable" class="post__btnGroup hidden">
            <i
              class="far fa-trash-alt"
              @click="$emit('delete:post', postItem._id)"
            ></i>
          </div>
        </div>
        <hr />
        <div class="content">
          <form @submit.prevent class="post__form">
            <textarea
              class="post__textarea"
              style="height: 100%"
              :value="contents"
              placeholder="내용을 입력하세요"
              @input="matchContents($event)"
            ></textarea>
          </form>
        </div>
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
}
.post__draggable {
  height: 100%;
}
.resizable {
  resize: both;
}
.draggable {
  cursor: move;
  overflow-wrap: break-word;
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
.content {
  height: 75%;
  font-weight: 400;
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
