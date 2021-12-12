<template>
  <div class="setting">
    <div class="color">
      <h1 class="color__title">Post Color</h1>
      <div class="color__section">
        <div
          class="color__btn"
          v-for="(color, i) in colors"
          :key="i"
          @click="selectPostColor(color.color)"
        >
          <div
            class="color__circle"
            :style="{ backgroundColor: color.color }"
          ></div>
          <p style="font-size: 0.8rem">{{ color.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ActionTypes } from "@/store/actions";
import { useStore } from "@/store";

export default defineComponent({
  name: "AppSetting",
  setup() {
    const store = useStore();
    const colors = [
      { color: "#FEC0CA", name: "Pink" },
      { color: "#2dfff1", name: "Mint" },
      { color: "#96d5ff", name: "Skyblue" },
      { color: "#f2f486", name: "Yellow" },
      { color: "#F5F5F6", name: "White" },
      { color: "#a5ffb9", name: "Green" },
      { color: "#DAC6AE", name: "Beige" },
      { color: "#ff7d3d", name: "Orange" },
    ];
    function selectPostColor(color: string) {
      localStorage.setItem("post_color", color);
      store.dispatch(ActionTypes.GET_POSTCOLOR);
    }
    return {
      colors,
      selectPostColor,
    };
  },
});
</script>

<style scoped>
.setting {
  position: fixed;
  bottom: 1rem;
  right: 4rem;
  border-radius: 1rem;
  padding: 8px;
  background-color: rgba(42, 128, 170, 0.5);
  backdrop-filter: blur(16px);
  width: 50%;
  max-width: 400px;
  min-width: 250px;
  color: #f5f5f6;
  display: flex;
  flex-direction: column;
}
h1 {
  font-size: 1.5rem;
}

.color__section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
}
.color__btn {
  display: flex;
  justify-content: center;
  padding: 4px 8px;
  width: 80px;
  background-color: rgba(42, 128, 170, 0.6);
  border-radius: 8px;
  margin-bottom: 0.4rem;
  transition: background-color 0.3s;
}
.color__btn:hover {
  cursor: pointer;
  background-color: rgba(42, 128, 170, 1);
}
.color__circle {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin-right: 8px;
}
</style>
