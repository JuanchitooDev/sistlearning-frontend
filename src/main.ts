import { createApp } from 'vue';
import App from './App.vue';
import pinia from './stores';
import router from './router'

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');

// import { createApp } from "vue";
// import App from "./App.vue";
// import router from "./router";

// createApp(App).use(router).mount("#app");
