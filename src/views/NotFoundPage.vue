<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
function goToMainPage() {
  router.push("/main");
}
</script>

<template>
  <div>
    <h1 style="font-size: 5rem">404😱</h1>
    <h4 style="font-size: 2rem">페이지 주소를 확인해보시겠어요?🤔</h4>
    <button class="btn" @click="goToMainPage">메인 페이지로</button>
  </div>
</template>

<style scoped>
div {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
