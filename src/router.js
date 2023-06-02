import { createRouter, createWebHistory } from "vue-router";

import LandingPage from "./pages/LandingPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: LandingPage },
    { path: "/:notFound(.*)", redirect: "/" },
  ],
});

export default router;
