import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores'
import { Home } from '@/views'
import accountRoutes from './account.routes'
import usersRoutes from './users.routes'

export const router = createRouter({
    history: createWebHistory('/sistema'),
    routes: [
        { path: '/', component: Home },
        { ...accountRoutes },
        { ...usersRoutes },
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
})

router.beforeEach(async (to) => {
    const publicPages = ['/account/login', '/account/register']
    const authRequired = !publicPages.includes(to.path)
    const authStore = useAuthStore()

    if (authRequired && !authStore.usuario) {
        authStore.returnUrl = to.fullPath
        return '/account/login'
    }
})