import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Importiere den Router
createApp(App)
    .use(router) // Router verwenden
    .mount("#app");
