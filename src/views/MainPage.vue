<script lang="ts" setup>
import PostListView from "@/components/PostListView.vue";
import AppSetting from "@/components/common/AppSetting.vue";
import Spinner from "@/components/common/Spinner.vue";
import {
  getPostData,
  addPostData,
  deletePostData,
  updatePostData,
} from "@/api/posts";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import {
  EmitChangeContents,
  EmitChangeDraggableStatusType,
  EmitChangeTitle,
  EmitIdType,
  EmitPositionType,
  EmitSizeType,
  EmitZIndexType,
} from "@/types/emits";
import { PostItemType } from "@/types/types";
import { MutationTypes } from "@/store/mutations";
import axios from "axios";

// Router & Store
const router = useRouter();
const store = useStore();

// State
const settingState = ref(false);
const isLoading = ref(false);
const postItems = ref<PostItemType[]>([]);

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

function changeTitle(emitTitleData: EmitChangeTitle) {
  postItems.value[emitTitleData.index].title = emitTitleData.title;
}

function changeContents(emitContentsData: EmitChangeContents) {
  postItems.value[emitContentsData.index].contents = emitContentsData.contents;
}

// created
fetchPostData();

// Logic

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
      포스트를 더블클릭하여 드래그/수정 모드로 전환할 수 있습니다.
      우측 하단의 포스트 버튼을 누르면 새로운 포스트를 생성할 수 있습니다.
      설정 버튼을 누르면 포스트의 색상을 변경할 수 있습니다.`,
      position: { width: 500, height: 500, x: 50, y: 50, z: 1 },
      isDraggable: false,
    });
    postItems.value.push({
      title: "Hello Posuto!",
      contents: `Posuto를 사용해주셔서 감사합니다!
      포스트를 더블클릭하여 드래그/수정 모드로 전환할 수 있습니다.
      우측 하단의 포스트 버튼을 누르면 새로운 포스트를 생성할 수 있습니다.
      설정 버튼을 누르면 포스트의 색상을 변경할 수 있습니다.`,
      position: { width: 500, height: 500, x: 50, y: 50, z: 1 },
      isDraggable: false,
    });
  }
}

// 메인페이지 최초 접속시 localStorage에 기록 남김
function setAccessRecord() {
  if (!localStorage.getItem("access")) localStorage.setItem("access", "true");
}
// PostItems 비어있으면 스토어에 체크함
function postItemsEmptyCheck() {
  if (postItems.value.length === 0)
    store.commit(MutationTypes.SET_POST_EMPTY_STATUS, true);
}

// 드래그 가능 토글
function toggleDraggableStatus(draggableStatus: EmitChangeDraggableStatusType) {
  postItems.value[draggableStatus.index].isDraggable = draggableStatus.status;
}

// 전체 포스트 조회
async function fetchPostData() {
  try {
    // 스피너 ON
    isLoading.value = true;
    // 포스트 데이터 로드
    const { data } = await getPostData();
    postItems.value = data.posts;
    postItemsEmptyCheck();
    await createFirstAccessDefaultPost();
    setAccessRecord();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401)
      router.push("/login");
  } finally {
    isLoading.value = false;
  }
}

// 포스트 생성
async function createNewPost() {
  try {
    await addPostData({
      title: "",
      contents: "",
      position: { width: 300, height: 300, x: 100, y: 100, z: 1 },
      isDraggable: false,
    });
    fetchPostData();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      alert("새로운 포스트가 이미 존재합니다.");
    } else if (axios.isAxiosError(error) && error.response?.status === 500) {
      alert(
        "서버에 문제가 있어 포스트를 생성하지 못했습니다. 잠시 후 다시 시도해주세요."
      );
    }
  }
}

// 포스트 삭제
async function deletePost(_id: EmitIdType) {
  try {
    if (_id) await deletePostData(_id);
    const newPostItems = postItems.value.filter((item) => {
      return item._id !== _id;
    });
    postItems.value = newPostItems;
    fetchPostData();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      alert("포스트를 삭제할 수 없습니다.");
    } else if (axios.isAxiosError(error) && error?.response?.status === 404) {
      alert("포스트를 찾을 수 없습니다.");
    } else if (axios.isAxiosError(error) && error?.response?.status === 500) {
      alert(
        "서버에 문제가 있어 포스트를 삭제하지 못했습니다. 잠시 후 다시 시도해주세요."
      );
    }
  }
}

// 포스트 수정
async function editPost(i: number) {
  postItems.value[i].position.z = 1;
  const postData = postItems.value[i];
  try {
    if (postData._id) await updatePostData(postData._id, postData);
    postItems.value[i].position.z = 2;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      alert("이미 같은 포스트가 존재합니다.");
    } else if (axios.isAxiosError(error) && error.response?.status === 404) {
      alert("포스트를 찾을 수 없습니다.");
    } else if (axios.isAxiosError(error) && error.response?.status === 500) {
      alert(
        "서버에 문제가 있어 포스트를 수정하지 못했습니다. 잠시 후 다시 시도해주세요."
      );
    }
  }
}
</script>
<template>
  <Spinner v-if="isLoading" />
  <PostListView
    :postItems="postItems"
    @change:size="saveSize"
    @change:position="savePosition"
    @focus:z-index="setZIndex"
    @delete:post="deletePost"
    @change:draggableStatus="toggleDraggableStatus"
    @save:post="editPost"
    @change:title="changeTitle"
    @change:contents="changeContents"
  />
  <transition name="settingAnimation">
    <AppSetting v-if="settingState" />
  </transition>
  <button class="add__btn" @click="createNewPost">
    <i class="far fa-sticky-note"></i>
  </button>
  <button class="setting__btn" @click="settingState = !settingState">
    <i class="fas fa-cog"></i>
  </button>
</template>
