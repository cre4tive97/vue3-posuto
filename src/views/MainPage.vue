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
    fetchPostData();

    return {
      router,
      store,
      postItems,
      settingState,
      updateStatus,
      isLoading,
      isEditing,
      fetchPostData,
    };
  },
});
</script>
