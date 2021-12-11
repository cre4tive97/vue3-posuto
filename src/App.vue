<template>
  <div id="app">
    <AppHeader />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/common/AppHeader.vue";

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
  },
});
</script>

<style>
@import "./css/reset.css";
@import "./css/style.css";
#app {
  height: 100vh;
}
</style>
