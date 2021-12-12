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
import { defineComponent, computed, ref } from "vue";
import { ActionTypes } from "@/store/actions";
import { validateUsername } from "@/utils/validation";
import { useStore } from "@/store/index";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginForm",

  setup() {
    // store, router
    const store = useStore();
    const router = useRouter();

    // data
    const username = ref("");
    const password = ref("");

    // computed
    const isUsernameValid = computed(() => validateUsername(username.value));

    // methods
    // 폼 제출
    async function submitForm() {
      try {
        await store.dispatch(ActionTypes.LOGIN_USER, {
          username: username.value,
          password: password.value,
        });
        router.push("/main");
      } catch (error: any) {
        if (error.response.status === 401) {
          alert("Username 또는 Password가 틀렸습니다!");
        }
      } finally {
        initForm();
      }
    }

    function initForm() {
      username.value = "";
      password.value = "";
    }

    return {
      isUsernameValid,
      submitForm,
      username,
      password,
    };
  },
});
</script>
