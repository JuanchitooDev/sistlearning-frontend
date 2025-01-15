import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')

// https://jasonwatmore.com/post/2022/07/25/vue-3-pinia-user-registration-and-login-example-tutorial
// https://github.com/cornflourblue/vue-3-pinia-registration-login-example
