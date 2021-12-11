<template>
  <div class="main">
    <Spinner v-if="isLoading" />
    <PostListView
      :postItems="postItems"
      :isEditing="isEditing"
      @deletePost="deletePost"
      @startEditing="startEditing"
      @finishEditing="finishEditing"
      @save:position="savePosition"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AppSetting from "@/components/common/AppSetting.vue";
import PostListView from "@/components/PostListView.vue";
import Spinner from "@/components/common/Spinner.vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store/index";
import {
  getPostData,
  addPostData,
  deletePostData,
  updatePostData,
} from "@/api/posts";

export default defineComponent({
  name: "MainPage",
  components: {
    PostListView,
    AppSetting,
    Spinner,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const postItems = ref([]);
    const settingState = ref(false);
    const updateStatus = ref(false);
    const isLoading = ref(false);
    const isEditing = ref(undefined);

    // 포스트 조회
    fetchPostData();

    // 전체 포스트 조회
    async function fetchPostData() {
      try {
        // 스피너 On
        isLoading.value = true;
        // 포스트 데이터 불러오기
        const { data } = await getPostData();
        postItems.value = data.posts;
        postItemsEmptyCheck();
        await createFirstAccessDefaultPost();
        setAccessRecord();
        isLoading.value = false;
      } catch (error: any) {
        // 권한 에러 뜰 경우 login페이지로 이동
        if (error.response.status === 401) {
          router.push("/login");
        }
      }
    }

    // 포스트 생성
    async function createNewPost() {
      try {
        // 디폴트 포스트를 생성
        await addPostData({
          title: "",
          contents: "",
          position: [{ width: "3", height: "3", x: "0", y: "0" }],
          isEditing: true,
        });
        // Refresh (gridStack reload)
        await fetchPostData();
        router.go(0);
      } catch (error: any) {
        if (error.response.status === 400) {
          alert("새로운 포스트가 이미 존재합니다.");
        } else if (error.response.status === 500) {
          alert(
            "서버에 문제가 있어 포스트를 생성하지 못했습니다. 잠시 후 다시 시도해주세요."
          );
          router.go(0);
        }
      }
    }

    return {
      router,
      store,
      postItems,
      settingState,
      updateStatus,
      isLoading,
      isEditing,
      fetchPostData,
      createNewPost,
    };
  },
});
</script>
