<script lang="ts" setup>
import PostListView from "@/components/PostListView.vue";
import AppSetting from "@/components/common/AppSetting.vue";
import Spinner from "@/components/common/Spinner.vue";
import { ref } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const settingState = ref(false);
const isLoading = ref(false);
</script>
<template>
  <Spinner v-if="isLoading" />
  <PostListView />
  <transition name="settingAnimation">
    <AppSetting v-if="settingState" />
  </transition>
</template>
