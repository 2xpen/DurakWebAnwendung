import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import CreatePlayer from "../views/CreatePlayer.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/create-player",
    name: "CreatePlayer",
    component: CreatePlayer,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
