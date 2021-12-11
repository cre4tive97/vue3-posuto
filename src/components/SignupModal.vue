<template>
  <div class="modal">
    <div class="modal__white">
      <h1 class="modal__greeting">회원 가입을 축하합니다!</h1>
      <span class="modal__text"
        ><em style="font-size: 1.25rem">{{ nickname }} </em>님, Posuto를 마음껏
        이용해보세요!😆</span
      >
      <button @click="$router.push('/login')" class="btn">Get Started</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SignupModal",
  props: {
    nickname: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
}
.modal__white {
  background: white;
  width: 400px;
  height: 200px;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}
.modal__greeting {
  margin: 1rem 0;
  font-size: 2rem;
}
.modal__text {
  font-size: 1rem;
  margin-bottom: 1rem;
}
</style>
