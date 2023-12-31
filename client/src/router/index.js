import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../pages/Home.vue"),
    },
    {
      path: "/create-post",
      name: "post",
      component: () => import("../pages/CreatePost.vue"),
    },
  ],
});

export default router;
