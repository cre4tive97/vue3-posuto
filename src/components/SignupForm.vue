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
import { registerUser } from "@/api/auth";
import SignupModal from "@/components/SignupModal.vue";
import { SignupSuccess } from "@/types/types";
import { validateUsername } from "@/utils/validation";
import { AxiosError } from "axios";
import Vue from "vue";

export default Vue.extend({
  name: "SignUpForm",
  components: {
    SignupModal,
  },
  data() {
    return {
      //form data
      username: "",
      password: "",
      nickname: "",
      // modal
      registerdNickname: "",
      signupSuccess: false,
    };
  },
  computed: {
    isUsernameValid(): boolean {
      return validateUsername(this.username);
    },
  },
  methods: {
    // 폼 제출할시 폼 데이터를 서버로 post 요청후, 모달창을 보여줌
    async submitForm(): Promise<void> {
      try {
        const { data } = await registerUser({
          username: this.username,
          password: this.password,
          nickname: this.nickname,
        });
        this.showSignupModal(data);
      } catch (error) {
        if (this.isAxiosError(error) && error.response?.status === 409) {
          alert("이미 사용중인 Username 입니다!");
        }
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.username = "";
      this.password = "";
      this.nickname = "";
    },
    showSignupModal(data: SignupSuccess) {
      this.registerdNickname = data.nickname;
      this.signupSuccess = true;
    },
    isAxiosError(error: any): error is AxiosError {
      return !!error.isAxiosError;
    },
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
