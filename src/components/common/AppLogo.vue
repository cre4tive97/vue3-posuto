<template>
  <div class="logo">
    <h1>posuto</h1>
    <h4>ポスト</h4>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppLogo",
});
</script>

<style scoped>
.logo {
  display: flex;
  align-items: flex-end;
}
h1 {
  font-weight: 100;
  letter-spacing: -2px;
  font-size: 2rem;
}
h4 {
  margin: 0;
  font-weight: 400;
  letter-spacing: -2px;
  font-size: 0.7rem;
}
</style>
