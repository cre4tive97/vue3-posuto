<script lang="ts" setup>
import PostListView from "@/components/PostListView.vue";
import AppSetting from "@/components/common/AppSetting.vue";
import Spinner from "@/components/common/Spinner.vue";
import { getPostData, addPostData } from "@/api/posts";
import { reactive, ref } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import { EmitPositionType, EmitSizeType, EmitZIndexType } from "@/types/emits";
import { PostDataType } from "@/types/types";

const router = useRouter();
const store = useStore();
const settingState = ref(false);
const isLoading = ref(false);
// const postItems = ref<PostDataType[]>([
//   {
//     title: "test1",
//     contents: "test1",
//     position: { x: 80, y: 80, width: 200, height: 300, z: 1 },
//   },
//   {
//     title: "test2",
//     contents: "test2",
//     position: { x: 350, y: 250, width: 250, height: 250, z: 1 },
//   },
// ]);
const postItems = ref<PostDataType[]>([]);

function saveSize(emitSize: EmitSizeType) {
  postItems.value[emitSize.index].position.width = emitSize.width;
  postItems.value[emitSize.index].position.height = emitSize.height;
}

function savePosition(emitPosition: EmitPositionType) {
  postItems.value[emitPosition.index].position.x = emitPosition.x;
  postItems.value[emitPosition.index].position.y = emitPosition.y;
}

function setZIndex(emitZIndex: EmitZIndexType) {
  initZIndex();
  postItems.value[emitZIndex.index].position.z = emitZIndex.z;
}

function initZIndex() {
  postItems.value.forEach((item) => (item.position.z = 1));
}

// PostItems 비어있고, localStorage에 'access'가 없다면, 디폴트 포스트를 생성
async function createFirstAccessDefaultPost() {
  if (
    store.state.postEmptyStatus === true &&
    localStorage.getItem("access") === null
  ) {
    // 디폴트 포스트 생성
    await addPostData({
      title: "Hello Posuto!",
      contents: `Posuto를 사용해주셔서 감사합니다!
          우측 하단의 포스트 버튼을 누르면 새로운 포스트를 생성할 수 있습니다.
          설정 버튼을 누르면 포스트의 색상을 변경할 수 있습니다.`,
      position: { width: 500, height: 500, x: 50, y: 50, z: 1 },
      isDraggable: false,
    });
  }
}

async function fetchPostData() {
  try {
    isLoading.value = true;
    const { data } = await getPostData();
    postItems.value = data.posts;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
fetchPostData();
</script>
<template>
  <Spinner v-if="isLoading" />
  <PostListView
    :postItems="postItems"
    @change:size="saveSize"
    @change:position="savePosition"
    @focus:z-index="setZIndex"
  />
  <transition name="settingAnimation">
    <AppSetting v-if="settingState" />
  </transition>
</template>
