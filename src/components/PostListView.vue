<template>
  <section class="grid-stack">
    <div
      v-for="(postItem, i) in postItems"
      :ref="
        (el) => {
          if (el) item[i] = el;
        }
      "
      :key="i"
      class="grid-stack-item ui-draggable ui-resizable ui-resizable-autohide"
      @mouseover="onMouseOver(i)"
      @mouseleave="onMouseLeave(i)"
      :gs-w="`${postItem.position[0].width}`"
      :gs-h="`${postItem.position[0].height}`"
      :gs-x="`${postItem.position[0].x}`"
      :gs-y="`${postItem.position[0].y}`"
      gs-min-w="3"
      gs-min-h="5"
      :id="postItem._id"
    >
      <div
        class="grid-stack-item-content"
        :style="{ backgroundColor: $store.state.postColor }"
      >
        <div class="post__header">
          <form @submit.prevent v-if="postItem.isEditing" class="post__form">
            <input
              class="post__input"
              type="text"
              placeholder="제목을 입력하세요"
              :value="postItem.title"
              @input="matchTitle"
            />
          </form>
          <h1 v-else ref="title">{{ postItem.title }}</h1>
          <div
            :ref="
              (el) => {
                if (el) btnGroup[i] = el;
              }
            "
            class="post__btnGroup hidden"
          >
            <i
              v-if="postItem.isEditing"
              @click="emitFinishEditing(i, postItem)"
              class="fas fa-edit"
            ></i>
            <i v-else @click="emitStartEditing(i)" class="far fa-edit"></i>
            <i
              class="far fa-trash-alt"
              @click="$emit('deletePost', postItem._id)"
            ></i>
          </div>
        </div>
        <hr />
        <div class="content">
          <form @submit.prevent v-if="postItem.isEditing" class="post__form">
            <textarea
              class="post__textarea"
              style="height: 100%"
              :value="postItem.contents"
              placeholder="내용을 입력하세요"
              @input="matchContents"
            ></textarea>
          </form>
          <span v-else class="post__content"> {{ postItem.contents }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onUpdated, toRefs, PropType } from "vue";
import { Position, PostDataType, PostItemType } from "@/types/types";
import "gridstack/dist/gridstack.min.css";
import { GridStack, GridStackNode } from "gridstack";
import "gridstack/dist/h5/gridstack-dd-native";

export default defineComponent({
  name: "PostListView",
  props: {
    postItems: {
      type: Array as PropType<PostDataType[]>,
      required: true,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const grid = ref<GridStack>();
    const currentEditingTitle = ref("");
    const currentEditingContents = ref("");
    let { isEditing } = toRefs(props);

    onUpdated(() => setGrid());

    const btnGroup = ref<HTMLDivElement[]>([]);
    // 포스트 위에 마우스 올릴 시 버튼을 보여줌
    function onMouseOver(i: number) {
      if (btnGroup.value) btnGroup.value[i].classList.remove("hidden");
    }

    // 포스트 위에서 마우스가 사라지면 버튼을 사라지게 함
    function onMouseLeave(i: number) {
      if (btnGroup.value) btnGroup.value[i].classList.add("hidden");
    }
    // 최상위 div에 onmouseover에 isShowbtn 이벤트 걸고
    // 버튼그룹 :class 스타일 바인딩 하면 더 효율적일듯?

    // 수정버튼 활성화
    function emitEditPost() {
      emit("editPost");
    }
    // 현재 수정중 포스트 타이틀과 currentEditingTitle의 값을 일치화
    function matchTitle(e: any) {
      currentEditingTitle.value = e.target.value;
    }
    // 현재 수정중 포스트 컨텐츠과 currentEditingContents의 값을 일치화
    function matchContents(e: any) {
      currentEditingContents.value = e.target.value;
    }
    // 만약 현재 수정중인 포스트가 없다면, 수정 버튼을 활성화하고 MainPage.vue로 emit
    function emitStartEditing(i: number) {
      if (isEditing.value !== true) {
        emit("startEditing", i);
      } else {
        alert("이미 수정중인 게시물이 있습니다.");
      }
    }
    const item = ref<HTMLDivElement[]>([]);
    function emitFinishEditing(i: number, postItem: PostItemType) {
      if (item.value) {
        const postData: PostDataType = {
          title: currentEditingTitle.value,
          contents: currentEditingContents.value,
          position: {
            width: item.value[i].getAttribute("gs-w") as string,
            height: item.value[i].getAttribute("gs-h") as string,
            x: item.value[i].getAttribute("gs-x") as string,
            y: item.value[i].getAttribute("gs-y") as string,
          },
          isEditing: false,
        };
        emit("finishEditing", postItem, postData);
        initCurrentEditingPost();
      }
    }
    // CurrentEditing 타이틀/컨텐츠 초기화
    function initCurrentEditingPost() {
      currentEditingTitle.value = "";
      currentEditingContents.value = "";
    }

    // GridStack 세팅.
    function setGrid() {
      //Grid init
      grid.value = GridStack.init({
        float: true,
        cellHeight: "50px",
        minRow: 13,
        resizable: {
          handles: "e,se,s,w",
        },
        alwaysShowResizeHandle:
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          ),
      });
      grid.value.on("change", (event, items) => {
        // 수정버튼 클릭시 Form에 내용 작성할 경우 또한 'change'로 감지됨.
        // 모든 수정버튼이 비활성화 되었을 때에만 custom event 보냄.
        if (isEditing.value === false || isEditing.value === undefined) {
          emit(
            "save:position",
            setCurrentPositionValue(items as GridStackNode[])
          );
        }
      });
      if (isEditing.value === true) {
        // 수정버튼 활성화시 포스트 이동/리사이즈 비활성화
        grid.value.enableMove(false);
        grid.value.enableResize(false);
      } else {
        // 수정버튼 비활성화시 포스트 이동/리사이즈 활성화
        grid.value.enableMove(true);
        grid.value.enableResize(true);
      }
      // 드래그 시작시 커서 변경
      grid.value.on("dragstart", () => {
        document.body.style.cursor = "grabbing";
      });
      // 드래그 종료시 커서 변경
      grid.value.on("dragstop", () => {
        document.body.style.cursor = "auto";
      });
    }

    function setCurrentPositionValue(items: GridStackNode[]) {
      let position = [] as Position[];
      items.forEach((item) => {
        position.push({
          width: item.w?.toString(),
          height: item.h?.toString(),
          x: item.x?.toString(),
          y: item.y?.toString(),
          id: item.el?.id,
        });
      });
      return position;
    }

    return {
      grid,
      currentEditingTitle,
      currentEditingContents,
      btnGroup,
      onMouseOver,
      onMouseLeave,
      emitEditPost,
      matchTitle,
      matchContents,
      emitStartEditing,
      item,
      emitFinishEditing,
      initCurrentEditingPost,
      setGrid,
      setCurrentPositionValue,
    };
  },
});
</script>

<style scoped>
.grid-stack {
  background-color: #f5f5f6;
}
.post__header h1 {
  font-size: 1.25rem;
  font-weight: 400;
}
.grid-stack-item-content span {
  font-size: 1rem;
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

.grid-stack-item-content {
  border-top-right-radius: 1rem;
  padding: 12px;
  -webkit-box-shadow: 0px 9px 24px 3px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 9px 24px 3px rgba(0, 0, 0, 0.15);
  overflow: auto;
  overflow-wrap: break-word;
  transition: background-color 0.5s;
}
.grid-stack-item-content:hover {
  cursor: grab;
}
.grid-stack-item-removing {
  opacity: 0.5;
}
.content {
  height: 75%;
  font-weight: 400;
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
