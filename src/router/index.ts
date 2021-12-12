import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useStore } from "@/store/index";

const store = useStore();

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/signup",
    component: () => import("@/views/SignupPage.vue"),
  },
  {
    path: "/main",
    component: () => import("@/views/MainPage.vue"),
    meta: { auth: true },
  },
  {
    path: "/*",
    component: () => import("@/views/NotFoundPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    next("/login");
    return;
  }
  next();
});

export default router;
