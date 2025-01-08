import { createApp } from 'vue';
import pinia from './stores';

import App from './App.vue';
import router from './router';
import './assets/tailwind.css';

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');

// https://jasonwatmore.com/post/2022/07/25/vue-3-pinia-user-registration-and-login-example-tutorial
// https://github.com/cornflourblue/vue-3-pinia-registration-login-example
