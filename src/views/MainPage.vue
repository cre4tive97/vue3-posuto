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
const postItems = ref([
  {
    title: "test1",
    content: "test1",
    position: { x: 80, y: 80, width: 50, height: 70 },
  },
  {
    title: "test2",
    content: "test2",
    position: { x: 150, y: 250, width: 60, height: 70 },
  },
]);

interface EmitSizeType {
  width: number;
  height: number;
  index: number;
}
interface EmitPositionType {
  x: number;
  y: number;
  index: number;
}

function saveSize(emitSize: EmitSizeType) {
  postItems.value[emitSize.index].position.width = emitSize.width;
  postItems.value[emitSize.index].position.height = emitSize.height;
}

function savePosition(emitPosition: EmitPositionType) {
  postItems.value[emitPosition.index].position.x = emitPosition.x;
  postItems.value[emitPosition.index].position.y = emitPosition.y;
}
</script>
<template>
  <Spinner v-if="isLoading" />
  <PostListView
    :postItems="postItems"
    @save:size="saveSize"
    @save:position="savePosition"
  />
  <transition name="settingAnimation">
    <AppSetting v-if="settingState" />
  </transition>
</template>
