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
import { PostDataType, PostItemType, Position } from "@/types/types";
import { MutationTypes } from "@/store/mutations";
import { ActionTypes } from "@/store/actions";

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
    const postItems = ref<PostItemType[]>([]);
    const settingState = ref(false);
    const updateStatus = ref(false);
    const isLoading = ref(false);
    const isEditing = ref(false);

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
      } catch (error: any) {
        // 권한 에러 뜰 경우 login페이지로 이동
        if (error?.response?.status === 401) {
          router.push("/login");
        }
      } finally {
        isLoading.value = false;
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
        } else if (error?.response?.status === 500) {
          alert(
            "서버에 문제가 있어 포스트를 생성하지 못했습니다. 잠시 후 다시 시도해주세요."
          );
          router.go(0);
        }
      }
    }
    // 포스트 삭제
    async function deletePost(postId: string) {
      try {
        await deletePostData(postId);
        fetchPostData();
      } catch (error: any) {
        if (error?.response?.status === 400) {
          alert("포스트를 삭제할 수 없습니다.");
        } else if (error?.response?.status === 404) {
          alert("포스트를 찾을 수 없습니다.");
        } else if (error?.response?.status === 500) {
          alert(
            "서버에 문제가 있어 포스트를 삭제하지 못했습니다. 잠시 후 다시 시도해주세요."
          );
          router.go(0);
        }
      }
    }
    // 수정 시작 버튼 클릭
    function startEditing(i: number) {
      postItems.value[i].isEditing = true;
      isEditing.value = true;
    }
    // 수정 완료, 데이터 저장
    async function finishEditing(
      postItem: PostItemType,
      postData: PostDataType
    ) {
      const id = postItem._id;
      try {
        // 기존 제목과 컨텐츠 변경이 없을경우
        if (postData.title === "" && postData.contents === "") {
          postData.title = postItem.title;
          postData.contents = postItem.contents;
          await updatePostData(id, postData);
          fetchPostData();
          isEditing.value = false;

          // 기존 컨텐츠만 변경되었을 경우
        } else if (postData.title === "" && postData.contents !== "") {
          postData.title = postItem.title;
          await updatePostData(id, postData);
          fetchPostData();
          isEditing.value = false;

          // 기존 제목만 변경되었을 경우
        } else if (postData.title !== "" && postData.contents === "") {
          postData.contents = postItem.contents;
          await updatePostData(id, postData);
          fetchPostData();
          isEditing.value = false;

          // 기존 제목과 컨텐츠 모두 변경되었을 경우
        } else if (postData.title !== "" && postData.contents !== "") {
          await updatePostData(id, postData);
          fetchPostData();
          isEditing.value = false;
        }
        // switch문 적용 가능?
      } catch (error: any) {
        if (error?.response?.status === 400) {
          alert("이미 같은 포스트가 존재합니다.");
        } else if (error?.response?.status === 404) {
          alert("포스트를 찾을 수 없습니다.");
        } else if (error?.response?.status === 500) {
          alert(
            "서버에 문제가 있어 포스트를 수정하지 못했습니다. 잠시 후 다시 시도해주세요."
          );
        }
      }
    }

    // 포지션 변경시 전체 포스트 위치 저장
    async function savePosition(positionArray: Position[]) {
      // custom event로 받아온 포지션 배열 내부 객체의 id Key의 value를 배열에 담음
      let positionId = positionArray.map((position) => position.id);
      // 서버에서 받아온 포스트 데이터와 custom event로 받아온 포지션 데이터를 비교해 id가 같은 배열을 리턴함.
      let changedPostItems = postItems.value.filter((item) => {
        return positionId.includes(item._id) ? item : null;
      });
      // 이중 for문 쓰기 싫은데, 이틀간 고민해도 마땅한 코드가 생각나지 않음..
      // positionArray와 changedPostItems의 객체의 id를 비교해 changedPostItems의 position 수정함.
      positionArray.forEach((positionValue) => {
        changedPostItems.forEach((item) => {
          if (item._id == positionValue.id) {
            if (Array.isArray(item.position)) item.position[0] = positionValue;
          }
        });
      });
      try {
        await changedPostItems.forEach((item) => {
          updatePostData(item._id, item);
        });
      } catch (error) {
        console.log(error);
      }
    }

    // 로컬스토리지에 post_color 없다면 기본 컬러 저장
    function setPostColor() {
      if (!localStorage.getItem("post_color"))
        localStorage.setItem("post_color", "#FEC0CA");
    }

    // 메인페이지 최초 접속시 localStorage에 기록 남김
    function setAccessRecord() {
      if (!localStorage.getItem("access"))
        localStorage.setItem("access", "true");
    }
    // PostItems 비어있으면 스토어에 체크함
    function postItemsEmptyCheck() {
      if (postItems.value.length === 0)
        store.commit(MutationTypes.SET_POST_EMPTY_STATUS, true);
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
          position: [{ width: "5", height: "5", x: "3", y: "3" }],
          isEditing: false,
        });
        // GridStack reload
        router.go(0);
      }
    }

    fetchPostData();
    setPostColor();
    store.dispatch(ActionTypes.GET_POSTCOLOR);

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
      deletePost,
      startEditing,
      finishEditing,
      savePosition,
      setPostColor,
    };
  },
});
</script>
