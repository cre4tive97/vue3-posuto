<script lang="ts" setup>
import PostListView from "@/components/PostListView.vue";
import AppSetting from "@/components/common/AppSetting.vue";
import Spinner from "@/components/common/Spinner.vue";
import { ref } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import { EmitZIndexType } from "@/types/emits";

const router = useRouter();
const store = useStore();
const settingState = ref(false);
const isLoading = ref(false);
const postItems = ref([
  {
    title: "test1",
    contents: "test1",
    position: { x: 80, y: 80, width: 200, height: 300, z: 1 },
  },
  {
    title: "test2",
    contents: "test2",
    position: { x: 350, y: 250, width: 250, height: 250, z: 1 },
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

function setZIndex(emitZIndex: EmitZIndexType) {
  initZIndex();
  postItems.value[emitZIndex.index].position.z = emitZIndex.z;
}

function initZIndex() {
  postItems.value.forEach((item) => (item.position.z = 1));
}
</script>
<template>
  <Spinner v-if="isLoading" />
  <PostListView
    :postItems="postItems"
    @change:size="saveSize"
    @change:position="savePosition"
    @focus:z-index="setZIndex"
  />
  <transition name="settingAnimation">
    <AppSetting v-if="settingState" />
  </transition>
</template>
