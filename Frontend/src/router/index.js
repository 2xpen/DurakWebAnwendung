import { createRouter, createWebHistory } from "vue-router";
import Home from "../Views/Home.vue";
import CreatePlayer from "../Views/player/CreatePlayer.vue";
import SeeAllPlayer from "../Views/player/SeeAllPlayer.vue";
import CreateSession from "../Views/sessions/CreateSession.vue";
import SeeAllSessions from "../Views/sessions/SeeAllSessions.vue";
import SessionDetail from "../Views/sessions/SessionDetail.vue";
import PlayerDetails from "@/Views/player/PlayerDetails.vue";
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
    {
        path: "/seeAllPlayer",
        name: "SeeAllPlayer", // Hier sollte der Name "SeeAllPlayer" verwendet werden
        component: SeeAllPlayer,
    },
    {
        path: "/createSession",
        name: "CreateSession",
        component: CreateSession,
    },
    {
        path: "/seeAllSessions",
        name: "SeeAllSessions",
        component: SeeAllSessions,
    },
    {
        path: "/session/:spielRundenId",
        name: "sessionDetail",
        component: SessionDetail,
        props: true,
    },
    {
        path: '/spielerdetails/:spielerId',
        name: 'spielerdetails',
        component: PlayerDetails,
        props: true,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
