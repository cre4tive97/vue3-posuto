<template>
  <form class="form" @submit.prevent="submitForm">
    <div class="form-box">
      <label for="username">Username</label>
      <input
        class="input"
        id="username"
        type="text"
        v-model="username"
        autocomplete="username"
      />
      <p
        style="color: red; position: relative"
        v-if="!isUsernameValid && username !== ''"
      >
        이메일을 입력해주세요.
      </p>
    </div>
    <div class="form-box">
      <label for="password">Password</label>
      <input
        class="input"
        id="password"
        type="password"
        v-model="password"
        autocomplete="current-password"
      />
    </div>
    <div class="form-box">
      <label for="nickname">Nickname</label>
      <input
        class="input"
        id="nickname"
        type="text"
        v-model="nickname"
        autocomplete="nickname"
      />
    </div>
    <button
      class="btn"
      :disabled="!isUsernameValid || !username || !password || !nickname"
    >
      Sign up
    </button>
    <transition name="modalAnimation">
      <SignupModal v-if="signupSuccess" :nickname="registerdNickname" />
    </transition>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import SignupModal from "@/components/SignupModal.vue";
import { SignupSuccess } from "@/types/types";
import { validateUsername } from "@/utils/validation";
import { registerUser } from "@/api/auth";

export default defineComponent({
  name: "SignupForm",
  components: {
    SignupModal,
  },
  setup() {
    //form data
    const username = ref("");
    const password = ref("");
    const nickname = ref("");
    // modal
    const registerdNickname = ref("");
    const signupSuccess = ref(false);
    // computed
    const isUsernameValid = computed(() => validateUsername(username.value));
    // methods
    // 폼 제출할시 폼 데이터를 서버로 post 요청후, 모달창을 보여줌
    async function submitForm() {
      try {
        const { data } = await registerUser({
          username: username.value,
          password: password.value,
          nickname: nickname.value,
        });
        showSignupModal(data);
      } catch (error: any) {
        if (error.response?.status === 409) {
          alert("이미 사용중인 Username 입니다!");
        }
      }
    }
    function initForm() {
      username.value = "";
      password.value = "";
      nickname.value = "";
    }
    function showSignupModal(data: SignupSuccess) {
      registerdNickname.value = data.nickname;
      signupSuccess.value = true;
    }

    return {
      username,
      password,
      nickname,
      registerdNickname,
      signupSuccess,
      isUsernameValid,
      submitForm,
      initForm,
      showSignupModal,
    };
  },
});
</script>

<style scoped>
.modalAnimation-enter {
  opacity: 0;
}
.modalAnimation-enter-active {
  transition: opacity 0.5s;
}
</style>
