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
    <button class="btn" :disabled="!isUsernameValid || !username || !password">
      Login
    </button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { ActionTypes } from "@/store/actions";
import { validateUsername } from "@/utils/validation";
import { AxiosError } from "axios";

export default Vue.extend({
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    isUsernameValid(): boolean {
      return validateUsername(this.username);
    },
  },
  methods: {
    async submitForm() {
      try {
        await this.$store.dispatch(ActionTypes.LOGIN_USER, {
          username: this.username,
          password: this.password,
        });
        this.$router.push("/main");
      } catch (error) {
        if (this.isAxiosError(error) && error.response?.status === 401) {
          alert("Username 또는 Password가 틀렸습니다!");
        }
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.username = "";
      this.password = "";
    },
    isAxiosError(error: any): error is AxiosError {
      return !!error.isAxiosError;
    },
  },
});
</script>

<style scoped></style>
