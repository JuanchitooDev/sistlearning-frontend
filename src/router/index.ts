import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from "@/views/Dashboard/Dashboard.vue"

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            title: 'Dashboard'
        }
    }
]

export const router = createRouter({
    history: createWebHistory('/sistema'),
    routes
})

// router.beforeEach((to, from, next) => {
//     document.title = `Vue.js ${to.meta.title} | TailAdmin - Vue.js Tailwind CSS Dashboard Template`
//     next()
// })

// // import { useAuthStore } from '@/stores'
// import { Home } from '@/views'
// // import accountRoutes from './account.routes'
// import userRoutes from './user.routes'
// import tipoEventoRoutes from './tipoevento.routes'

// export const router = createRouter({
//     history: createWebHistory('/sistema'),
//     routes: [
//         { path: '/', component: Home },
//         // { ...accountRoutes },
//         { ...userRoutes },
//         { ...tipoEventoRoutes },
//         { path: '/:pathMatch(.*)*', redirect: '/' }
//     ]
// })

// // router.beforeEach(async (to) => {
// //     const publicPages = ['/account/login', '/account/register']
// //     const authRequired = !publicPages.includes(to.path)
// //     const authStore = useAuthStore()

// //     if (authRequired && !authStore.usuario) {
// //         authStore.returnUrl = to.fullPath
// //         return '/account/login'
// //     }
// // })