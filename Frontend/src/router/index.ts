import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../Views/Home.vue";
import CreatePlayer from "../Views/CreatePlayer.vue";
import SeeAllPlayer from "../Views/SeeAllPlayer.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/createPlayer",
    name: "CreatePlayer",
    component: CreatePlayer,
  },
  {
    path: "/seeAllPlayer",
    name: "SeeAllPlayer", // Hier sollte der Name "SeeAllPlayer" verwendet werden
    component: SeeAllPlayer,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
