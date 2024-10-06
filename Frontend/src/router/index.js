import { createRouter, createWebHistory } from "vue-router";
import Home from "../Views/Home.vue";
import CreatePlayer from "../Views/CreatePlayer.vue";
import SeeAllPlayer from "../Views/SeeAllPlayer.vue";
import CreateSession from "../Views/CreateSession.vue";
import SeeAllSessions from "../Views/SeeAllSessions.vue";
import SessionDetail from "../Views/SessionDetail.vue";
import Shop from "../Views/Shop.vue";
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
        path: "/session/:spielRundenId", // Routen-Parameter für die Session-ID
        name: "sessionDetail",
        component: SessionDetail,
        props: true, // Übergibt den Parameter als Prop
    },
    {
        path: '/spielerdetails/:spielerId', // Verwende einen Platzhalter für die Spieler-ID
        name: 'spielerdetails',
        component: Shop,
        props: true, // Dies ermöglicht das automatische Übergeben der Route-Parameter als Props
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
