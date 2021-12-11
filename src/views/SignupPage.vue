<template>
  <div class="page">
    <div class="form__container">
      <p class="form__title">Sign Up</p>
      <SignupForm />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SignupForm from "@/components/SignupForm.vue";

export default defineComponent({
  name: "SignupPage",
  components: {
    SignupForm,
  },
});
</script>

<style scoped></style>
