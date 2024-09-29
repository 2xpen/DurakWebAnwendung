import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Importiere den Router
const app = createApp(App);
app.use(router); // Verwende den Router in der App
app.mount("#app");
