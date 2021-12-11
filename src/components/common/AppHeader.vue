<template>
  <div class="header">
    <router-link to="/main"><AppLogo /></router-link>
    <div class="header__menu" v-if="isLogin">
      <div class="profile">{{ nickname }}님의 Posuto</div>
      <button @click="logout" class="link">Logout</button>
    </div>
    <div class="header__menu" v-else>
      <router-link to="/login">
        <button class="link">login</button>
      </router-link>
      <router-link to="/signup">
        <button class="link">signup</button>
      </router-link>
    </div>
  </div>
</template>

//
<script lang="ts">
// import Vue from "vue";
// import { mapState, mapGetters, mapMutations } from "vuex";
// import AppLogo from "@/components/common/AppLogo.vue";
// import { deleteCookie } from "@/utils/cookies.js";
// export default Vue.extend({
//   name: "AppHeader",
//   components: {
//     AppLogo,
//   },
//   computed: {
//     ...mapState(["nickname"]),
//     ...mapGetters(["isLogin"]),
//   },
//   methods: {
//     ...mapMutations(["clearToken", "clearNickname"]),
//     logout() {
//       this.clearToken();
//       this.clearNickname();
//       deleteCookie("posuto_user");
//       deleteCookie("posuto_auth");
//       this.$router.push("/login");
//     },
//   },
// });
//
</script>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import AppLogo from "@/components/common/AppLogo.vue";
import { deleteCookie } from "@/utils/cookies.js";
import { useRouter } from "vue-router";
import { useStore } from "@/store/index";

export default defineComponent({
  name: "AppHeader",
  components: {
    AppLogo,
  },
  setup() {
    const store = useStore(key);
    const nickname = computed(() => store.state.nickname);
    const isLogin = computed(() => store.getters.isLogin);
    const router = useRouter();

    function logout() {
      store.commit("clearToken");
      store.commit("clearNickname");
      deleteCookie("posuto_user");
      deleteCookie("posuto_auth");
      router.push("/login");
    }

    return {
      nickname,
      isLogin,
      logout,
    };
  },
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(160, 252, 255, 1) 0%,
    rgba(93, 153, 198, 1) 100%
  );
  padding: 0 12px;
  z-index: 5;
  position: sticky;
  top: 0;
}
.header__menu {
  display: flex;
}
.link {
  border: none;
  background: #88d9ea;
  padding: 4px 8px;
  margin-left: 8px;
  border-radius: 6px;
}
.profile {
  background: #88d9ea;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 4px 8px;
}
</style>
