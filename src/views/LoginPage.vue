<template>
  <div class="page">
    <div class="form__container">
      <p class="form__title">Login</p>
      <LoginForm />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LoginForm from "@/components/LoginForm.vue";
export default Vue.extend({
  components: {
    LoginForm,
  },
});
</script>

<style scoped></style>
