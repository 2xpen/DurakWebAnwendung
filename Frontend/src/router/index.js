import { createRouter, createWebHistory } from "vue-router";
import Home from "../Views/Home.vue";
import CreatePlayer from "../Views/CreatePlayer.vue";
const routes = [
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
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
