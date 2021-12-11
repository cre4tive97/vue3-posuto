<template>
  <div>
    <h1 style="font-size: 5rem">404😱</h1>
    <h4 style="font-size: 2rem">페이지 주소를 확인해보시겠어요?🤔</h4>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFoundPage",
});
</script>

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
